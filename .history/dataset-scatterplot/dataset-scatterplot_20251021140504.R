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
#     },
#     {
#       id: 'au-museum-001',
#       name: 'Australian Museum Collections',
#       species: 15000,
#       occurrences: 850000,
#       publishedInCountry: true,
#       organization: 'Australian Museum',
#       description: 'Natural history collections spanning 200+ years',
#       publishingCountry: 'Australia',
#       license: 'CC BY-NC-SA 4.0'
#     },
#     {
#       id: 'au-ebird-001',
#       name: 'eBird Australia',
#       species: 1200,
#       occurrences: 45000000,
#       publishedInCountry: false,
#       organization: 'Cornell Lab of Ornithology',
#       description: 'Citizen science bird observations from Australia',
#       publishingCountry: 'United States',
#       datasetUrl: 'https://ebird.org/',
#       license: 'CC BY-NC 4.0'
#     },
#     {
#       id: 'au-gbif-001',
#       name: 'iNaturalist Research Grade Observations',
#       species: 35000,
#       occurrences: 8500000,
#       publishedInCountry: false,
#       organization: 'iNaturalist',
#       description: 'Citizen science observations verified by the community',
#       publishingCountry: 'United States',
#       datasetUrl: 'https://www.inaturalist.org/',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-marine-001',
#       name: 'Australian Marine Biodiversity Database',
#       species: 12000,
#       occurrences: 450000,
#       publishedInCountry: true,
#       organization: 'Museums Victoria',
#       description: 'Marine species records from Australian waters',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-forestry-001',
#       name: 'Australian Forest Fauna Database',
#       species: 8500,
#       occurrences: 180000,
#       publishedInCountry: true,
#       organization: 'Department of Agriculture, Water and Environment',
#       description: 'Wildlife monitoring in Australian forests',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-reef-001',
#       name: 'Great Barrier Reef Biodiversity Survey',
#       species: 5800,
#       occurrences: 95000,
#       publishedInCountry: true,
#       organization: 'Australian Institute of Marine Science',
#       description: 'Comprehensive reef biodiversity monitoring',
#       publishingCountry: 'Australia',
#       license: 'CC BY-NC 4.0'
#     },
#     {
#       id: 'au-insect-001',
#       name: 'Australian National Insect Collection',
#       species: 45000,
#       occurrences: 2200000,
#       publishedInCountry: true,
#       organization: 'CSIRO Entomology',
#       description: 'Extensive insect specimens and records',
#       publishingCountry: 'Australia',
#       license: 'CC BY-NC 4.0'
#     },
#     {
#       id: 'au-wetland-001',
#       name: 'Australian Wetland Bird Survey',
#       species: 280,
#       occurrences: 850000,
#       publishedInCountry: true,
#       organization: 'BirdLife Australia',
#       description: 'Long-term waterbird monitoring across Australia',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-gbif-002',
#       name: 'OBIS Australia - Marine Biodiversity',
#       species: 18000,
#       occurrences: 1200000,
#       publishedInCountry: false,
#       organization: 'Ocean Biogeographic Information System',
#       description: 'Marine species occurrence data from Australian waters',
#       publishingCountry: 'Belgium',
#       datasetUrl: 'https://obis.org/',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-bush-001',
#       name: 'Bush Blitz Species Discovery Program',
#       species: 12000,
#       occurrences: 75000,
#       publishedInCountry: true,
#       organization: 'Australian Biological Resources Study',
#       description: 'New species discoveries and taxonomic records',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-seedbank-001',
#       name: 'Australian Seed Bank Partnership',
#       species: 6500,
#       occurrences: 45000,
#       publishedInCountry: true,
#       organization: 'Royal Botanic Gardens',
#       description: 'Native plant seed collection and conservation records',
#       publishingCountry: 'Australia',
#       license: 'CC BY-NC 4.0'
#     },
#     {
#       id: 'au-parks-001',
#       name: 'Australian National Parks Biodiversity Survey',
#       species: 22000,
#       occurrences: 350000,
#       publishedInCountry: true,
#       organization: 'Parks Australia',
#       description: 'Biodiversity monitoring across national parks',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-citizen-001',
#       name: 'Wildlife Atlas - Citizen Science',
#       species: 8900,
#       occurrences: 2800000,
#       publishedInCountry: true,
#       organization: 'Wildlife Conservation Society Australia',
#       description: 'Community-contributed wildlife observations',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-uni-001',
#       name: 'Australian University Biodiversity Collections',
#       species: 15500,
#       occurrences: 680000,
#       publishedInCountry: true,
#       organization: 'Australian University Consortium',
#       description: 'Research collections from major universities',
#       publishingCountry: 'Australia',
#       license: 'CC BY-NC 4.0'
#     },
#     {
#       id: 'au-gbif-003',
#       name: 'CITES Trade Database - Australian Species',
#       species: 2200,
#       occurrences: 15000,
#       publishedInCountry: false,
#       organization: 'UNEP World Conservation Monitoring Centre',
#       description: 'International trade records for Australian species',
#       publishingCountry: 'United Kingdom',
#       license: 'Open Government License'
#     },
#     {
#       id: 'au-herbarium-001',
#       name: 'State Herbarium Collections Network',
#       species: 32000,
#       occurrences: 1800000,
#       publishedInCountry: true,
#       organization: 'Council of Heads of Australian Herbaria',
#       description: 'Digitized herbarium specimens from state collections',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-coastal-001',
#       name: 'Australian Coastal and Marine Biodiversity',
#       species: 9800,
#       occurrences: 425000,
#       publishedInCountry: true,
#       organization: 'Integrated Marine Observing System',
#       description: 'Coastal and marine ecosystem monitoring',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-moths-001',
#       name: 'Australian Moth and Butterfly Database',
#       species: 14500,
#       occurrences: 950000,
#       publishedInCountry: true,
#       organization: 'Lepidopterists Society of Australia',
#       description: 'Comprehensive lepidoptera records and observations',
#       publishingCountry: 'Australia',
#       license: 'CC BY-NC 4.0'
#     },
#     {
#       id: 'au-threatened-001',
#       name: 'Threatened Species Recovery Database',
#       species: 1800,
#       occurrences: 85000,
#       publishedInCountry: true,
#       organization: 'Department of Climate Change, Energy, Environment and Water',
#       description: 'Monitoring data for threatened and endangered species',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-fossil-001',
#       name: 'Australian Fossil and Geological Collections',
#       species: 8500,
#       occurrences: 120000,
#       publishedInCountry: true,
#       organization: 'Geoscience Australia',
#       description: 'Paleobiological specimens and geological records',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-alpine-001',
#       name: 'Australian Alpine Biodiversity Survey',
#       species: 3200,
#       occurrences: 65000,
#       publishedInCountry: true,
#       organization: 'Australian Alps Liaison Committee',
#       description: 'High-altitude ecosystem monitoring and species records',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-molecular-001',
#       name: 'Australian Barcode of Life Database',
#       species: 25000,
#       occurrences: 75000,
#       publishedInCountry: true,
#       organization: 'Australian Centre for DNA Barcoding',
#       description: 'Genetic barcoding data for Australian species identification',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     },
#     {
#       id: 'au-invasive-001',
#       name: 'Australian Invasive Species Database',
#       species: 4500,
#       occurrences: 380000,
#       publishedInCountry: true,
#       organization: 'Centre for Invasive Species Solutions',
#       description: 'Tracking and monitoring of invasive species across Australia',
#       publishingCountry: 'Australia',
#       license: 'CC BY 4.0'
#     }
#   ]
# };

cc <- "AU"

rgbif::dataset_search(country = cc, limit=0)$meta$count
rgbif::occ_count(country = cc, facet="datasetKey",facetLimit=100)

