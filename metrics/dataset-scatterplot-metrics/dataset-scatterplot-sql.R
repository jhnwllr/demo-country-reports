library(rgbif)
library(dplyr)
library(httr)

# Configuration
API_BASE_URL <- "http://localhost:8081/api/dataset-scatter"

# Countries to export (can be filtered from the full dataset)
countries_to_export <- c("AU", "CO", "DK", "BW")

# SQL query to get dataset statistics for ALL countries
# Groups by countrycode and datasetKey, counts unique species and total occurrences
sql_query <- "
  SELECT 
    countrycode,
    datasetkey,
    COUNT(DISTINCT specieskey) as species,
    COUNT(*) as occurrences
  FROM occurrence 
  WHERE countrycode IS NOT NULL
    AND specieskey IS NOT NULL
  GROUP BY countrycode, datasetkey
  ORDER BY countrycode, occurrences DESC
"

# Request SQL download from GBIF
# Note: This creates a download request that may take time to process
print("Requesting SQL download from GBIF for ALL countries...")
print("This will retrieve dataset statistics grouped by country...")

# Check for existing download files
existing_downloads <- list.files(pattern = "^[0-9]+-[0-9]+\\.zip$", full.names = TRUE)

if (length(existing_downloads) > 0) {
  # Use the most recent download file
  download_file <- existing_downloads[length(existing_downloads)]
  download_key <- sub("\\.zip$", "", basename(download_file))
  print(paste("Found existing download file:", basename(download_file)))
  print(paste("Using download key:", download_key))
  all_dataset_stats <- rgbif::occ_download_get(download_key) |>
    rgbif::occ_download_import()
} else {
  # Request new download
  download_key <- rgbif::occ_download_sql(sql_query)
  print(paste("Download key:", download_key))
  
  # Wait for download to complete
  print("Waiting for download to complete...")
  rgbif::occ_download_wait(download_key)
  
  # Get the download
  print("Downloading results...")
  all_dataset_stats <- rgbif::occ_download_get(download_key) |>
    rgbif::occ_download_import()
}

print(paste("Total rows retrieved:", nrow(all_dataset_stats)))

# Get unique countries in the dataset
unique_countries <- all_dataset_stats %>% 
  distinct(countrycode) %>% 
  pull(countrycode)

print(paste("Countries found in data:", length(unique_countries)))
print(paste("Sample countries:", paste(head(unique_countries, 10), collapse = ", ")))

# Create output directory for JSON files
output_dir <- "json-output"
if (!dir.exists(output_dir)) {
  dir.create(output_dir)
  print(paste("Created output directory:", output_dir))
}

# Initialize results list
all_results <- list()

# Process each country we want to export
for(cc in countries_to_export) {
  print(paste("\nProcessing country:", cc))
  
  # Filter data for this country and get top 100 by occurrences
  country_data <- all_dataset_stats %>%
    filter(countrycode == cc) %>%
    arrange(desc(occurrences)) %>%
    head(100)
  
  print(paste("Found", nrow(country_data), "datasets for", cc))
  
  # Get dataset metadata (names and publishing country)
  print("Fetching dataset metadata...")
  dataset_stats <- country_data %>%
    rowwise() %>%
    mutate(
      dataset_info = list(tryCatch(
        rgbif::dataset_get(datasetkey),
        error = function(e) {
          data.frame(title = "Unknown", publishingOrganizationKey = NA_character_, stringsAsFactors = FALSE)
        }
      )),
      name = ifelse(!is.null(dataset_info$title) && length(dataset_info$title) > 0, 
                    dataset_info$title, "Unknown"),
      publishingOrgKey = ifelse(!is.null(dataset_info$publishingOrganizationKey) && 
                                length(dataset_info$publishingOrganizationKey) > 0,
                                dataset_info$publishingOrganizationKey, NA_character_),
      # Get the organization's country if we have the key
      publishingCountry = ifelse(!is.na(publishingOrgKey),
        tryCatch({
          org <- rgbif::organizations(uuid = publishingOrgKey)$data
          ifelse(!is.null(org$country), org$country, NA_character_)
        }, error = function(e) NA_character_),
        NA_character_
      ),
      publishedInCountry = !is.na(publishingCountry) && publishingCountry == cc
    ) %>%
    ungroup() %>%
    select(datasetkey, name, species, occurrences, publishedInCountry, countrycode)
  
  # Get country name
  countryName <- rgbif::enumeration_country() %>% 
    filter(iso2 == cc) %>% 
    pull(title)
  
  # Get total datasets count for this country
  print("Getting total dataset count...")
  totalDatasets <- rgbif::occ_count(country = cc, facet="datasetKey", facetLimit=100000) %>% nrow()
  
  # Store results
  all_results[[cc]] <- list(
    countryCode = cc,
    countryName = countryName,
    totalDatasets = totalDatasets,
    lastModified = as.character(Sys.Date()),
    dataSource = "GBIF",
    notes = paste0("Biodiversity datasets from ", countryName, " institutions and GBIF network"),
    datasets = dataset_stats
  )
  
  # Export to JSON for easy import to backend
  jsonlite::write_json(all_results[[cc]], 
                       path = file.path(output_dir, paste0("dataset-scatterplot-", cc, ".json")),
                       pretty = TRUE,
                       auto_unbox = TRUE)
  
  print(paste("✓ Completed", cc, "- Exported", nrow(dataset_stats), "datasets"))
  
  # Import to backend database via API
  print("Importing to backend database...")
  
  # Prepare data for API
  api_data <- all_results[[cc]]
  
  # Transform datasets to match API format
  api_data$datasets <- lapply(1:nrow(dataset_stats), function(i) {
    list(
      id = dataset_stats$datasetkey[i],
      name = dataset_stats$name[i],
      species = dataset_stats$species[i],
      occurrences = dataset_stats$occurrences[i],
      publishedInCountry = dataset_stats$publishedInCountry[i]
    )
  })
  
  # Check if dataset exists and get its ID
  check_url <- paste0(API_BASE_URL, "/country/", cc)
  existing <- tryCatch(
    {
      response <- httr::GET(check_url)
      if (httr::status_code(response) == 200) {
        httr::content(response, as = "parsed")
      } else {
        NULL
      }
    },
    error = function(e) NULL
  )
  
  if (!is.null(existing)) {
    # Delete the existing dataset first
    print(paste("Deleting existing dataset for", cc, "with ID", existing$id))
    delete_url <- paste0(API_BASE_URL, "/", existing$id)
    httr::DELETE(delete_url)
    Sys.sleep(0.5)  # Give it a moment
  }
  
  # Create new dataset
  print(paste("Creating new dataset for", cc))
  response <- httr::POST(
    API_BASE_URL,
    body = api_data,
    encode = "json",
    httr::content_type_json()
  )
  
  if (httr::status_code(response) %in% c(200, 201)) {
    print(paste("✓ Successfully imported to backend database"))
  } else {
    error_msg <- httr::content(response, as = "text", encoding = "UTF-8")
    print(paste("✗ Failed to import to backend. Status:", httr::status_code(response)))
    print(paste("Error:", error_msg))
    warning(paste("Failed to import to backend:", error_msg))
  }
}

# Save all results as JSON
jsonlite::write_json(all_results, 
                     path = file.path(output_dir, "dataset-scatterplot-all.json"),
                     pretty = TRUE,
                     auto_unbox = TRUE)
print("All downloads complete!")
print(paste("Results saved to", output_dir, "folder"))
print("Files: dataset-scatterplot-*.json")
print("All data has been imported to the backend database!")
