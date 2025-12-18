library(rgbif)
library(dplyr)
library(stringr)
library(purrr)

# import { DatasetScatterData } from './types';

# export const australiaDatasetData: DatasetScatterData = {
#   countryCode: 'AU',
#   countryName: 'Australia',
#   totalDatasets: 25,
#   lastModified: '2025-10-21',
#   dataSource: 'Atlas of Living Australia (ALA) and GBIF Australia',
#   notes: 'Major biodiversity datasets from Australian institutions and international collaborations',
#   datasets: [
#     {
#       id: 'au-ala-001',
#       name: 'Atlas of Living Australia - Occurrence Records',
#       species: 125000,
#       occurrences: 89500000,
#       publishedInCountry: true,
#       organization: 'Atlas of Living Australia',
#       description: 'Comprehensive occurrence records from museums, herbaria, and citizen science',
#       publishingCountry: 'Australia',
#       datasetUrl: 'https://www.ala.org.au/',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-csiro-001',
#       name: 'Australian National Herbarium Specimens',
#       species: 28000,
#       occurrences: 1200000,
#       publishedInCountry: true,
#       organization: 'CSIRO',
#       description: 'Vouchered plant specimens from across Australia',
#       publishingCountry: 'Australia',
#       license: 'CC BY-NC 4.0'
#     }
#   ]
# };

cc <- "AU"

dd <- rgbif::occ_count(country = cc, facet="datasetKey",facetLimit=100000)

pp <- rgbif::dataset_export(publishingCountry = cc) |> 
select(datasetKey) |> 
mutate(publishedInCountry = "true")

countryCode <- cc 
countryName <- rgbif::enumeration_country() |> filter(iso2 == cc)  |> pull(title)
totalDatasets <- nrow(dd) 

ddd <- dd |> 
head(50) |> 
rename(occurrences = count) |>
mutate(species = datasetKey |> purrr::map_dbl(~ rgbif::occ_count(country=cc,datasetKey = .x,facet="speciesKey",facetLimit=100000) |> nrow())) |>
mutate(name = datasetKey |> purrr::map_chr(~rgbif::dataset_get(.x)$title)) |>
merge(pp, by="datasetKey",all.x=TRUE) |>
mutate(ifelse(publishedInCountry == "true", "true", "false"))
glimpse()

# Generate TypeScript file content
ts_content <- paste0(
  "import { DatasetScatterData } from './types';\n\n",
  "export const ", tolower(countryName), "DatasetData: DatasetScatterData = {\n",
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





