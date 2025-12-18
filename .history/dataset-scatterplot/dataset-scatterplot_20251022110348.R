library(rgbif)
library(dplyr)
library(stringr)
library(purrr)

for(cc in c("AU", "CO", "DK", "BW")) {
print(cc)
# cc <- "AU"

dd <- rgbif::occ_count(country = cc, facet="datasetKey",facetLimit=100000)

pp <- rgbif::dataset_export(publishingCountry = cc) |> 
select(datasetKey) |> 
mutate(publishedInCountry = "true")

countryCode <- cc 
countryName <- rgbif::enumeration_country() |> filter(iso2 == cc)  |> pull(title)
totalDatasets <- nrow(dd) 

ddd <- dd |> 
head(10) |> 
rename(occurrences = count) |>
mutate(species = datasetKey |> purrr::map_dbl(~ rgbif::occ_count(country=cc,datasetKey = .x,facet="speciesKey",facetLimit=100000) |> nrow())) |>
mutate(name = datasetKey |> purrr::map_chr(~rgbif::dataset_get(.x)$title)) |>
merge(pp, by="datasetKey",all.x=TRUE) |>
mutate(publishedInCountry = ifelse(is.na(publishedInCountry), "false", "true")) |>
glimpse()

# Generate TypeScript file content
export_name <- case_when(
  countryName == "Australia" ~ "australia",
  countryName == "Colombia" ~ "colombia", 
  countryName == "Denmark" ~ "denmark",
  countryName == "Botswana" ~ "botswana",
  TRUE ~ tolower(gsub("[^A-Za-z]", "", countryName))
)

ts_content <- paste0(
  "import { DatasetScatterData } from './types';\n\n",
  "export const ", export_name, "DatasetData: DatasetScatterData = {\n",
  "  countryCode: '", countryCode, "',\n",
  "  countryName: '", countryName, "',\n",
  "  totalDatasets: ", totalDatasets, ",\n",
  "  lastModified: '", Sys.Date(), "',\n",
  "  dataSource: 'GBIF',\n",
  "  notes: 'Biodiversity datasets from ", countryName, " institutions and GBIF network',\n",
  "  datasets: [\n"
)

# Add each dataset
for(i in seq_len(nrow(ddd))) {
  dataset <- ddd[i, ]
  ts_content <- paste0(ts_content,
    "    {\n",
    "      id: '", dataset$datasetKey, "',\n",
    "      name: '", gsub("'", "\\\\'", dataset$name), "',\n",
    "      species: ", dataset$species, ",\n",
    "      occurrences: ", dataset$occurrences, ",\n",
    "      publishedInCountry: ", tolower(dataset$publishedInCountry), ",\n",
    "    }"
  )
  
  if(i < nrow(ddd)) {
    ts_content <- paste0(ts_content, ",")
  }
  ts_content <- paste0(ts_content, "\n")
}

ts_content <- paste0(ts_content, "  ]\n};\n")

# Write to file
output_file <- paste0("country-reports-demo-ui/data/dataset-scatterplot/",cc, ".ts")
writeLines(ts_content, output_file)
}




