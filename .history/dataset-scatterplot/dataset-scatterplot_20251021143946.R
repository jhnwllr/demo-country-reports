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
pp <- dataset_search(publishingCountry = cc, country = cc)

countryCode <- cc 
countryName <- rgbif::enumeration_country() |> filter(iso2 == cc)  |> pull(title)
totalDatasets <- nrow(dd) 

dd |> 
head(10) |> 
rename(occurrences = count) |>
mutate(species = datasetKey |> purrr::map_dbl(~ rgbif::occ_count(country=cc,datasetKey = .x,facet="speciesKey",facetLimit=100000) |> nrow()))
mutate()

#       id: 'au-ala-001',
#       name: 'Atlas of Living Australia - Occurrence Records',
#       species: 125000,
#       occurrences: 89500000,
#       publishedInCountry: true,





