import { DatasetScatterData } from './types';

export const botswanaDatasetData: DatasetScatterData = {
  countryCode: 'BW',
  countryName: 'Botswana',
  totalDatasets: 18,
  lastModified: '2025-10-21',
  dataSource: 'Botswana National Museum and international collaborations',
  notes: 'Biodiversity datasets from Kalahari, Okavango Delta, and national parks',
  datasets: [
    {
      id: 'bw-okavango-001',
      name: 'Okavango Delta Biodiversity Survey',
      species: 8500,
      occurrences: 125000,
      publishedInCountry: true,
      organization: 'Okavango Research Institute',
      description: 'Comprehensive biodiversity monitoring of the Okavango Delta ecosystem',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-museum-001',
      name: 'Botswana National Museum Collections',
      species: 5200,
      occurrences: 85000,
      publishedInCountry: true,
      organization: 'Botswana National Museum',
      description: 'Natural history collections representing Botswana biodiversity',
      publishingCountry: 'Botswana',
      license: 'CC BY-NC 4.0'
    },
    {
      id: 'bw-kalahari-001',
      name: 'Kalahari Research Centre Database',
      species: 3800,
      occurrences: 45000,
      publishedInCountry: true,
      organization: 'University of Botswana',
      description: 'Long-term ecological research in the Kalahari Desert',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-ebird-001',
      name: 'eBird Botswana',
      species: 580,
      occurrences: 450000,
      publishedInCountry: false,
      organization: 'Cornell Lab of Ornithology',
      description: 'Bird observations from across Botswana',
      publishingCountry: 'United States',
      datasetUrl: 'https://ebird.org/',
      license: 'CC BY-NC 4.0'
    },
    {
      id: 'bw-inaturalist-001',
      name: 'iNaturalist Botswana Observations',
      species: 2400,
      occurrences: 18000,
      publishedInCountry: false,
      organization: 'iNaturalist',
      description: 'Citizen science observations from Botswana',
      publishingCountry: 'United States',
      datasetUrl: 'https://www.inaturalist.org/',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-chobe-001',
      name: 'Chobe National Park Wildlife Survey',
      species: 1200,
      occurrences: 35000,
      publishedInCountry: true,
      organization: 'Department of Wildlife and National Parks',
      description: 'Wildlife monitoring and census data from Chobe National Park',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-plants-001',
      name: 'Flora of Botswana Database',
      species: 2800,
      occurrences: 65000,
      publishedInCountry: true,
      organization: 'University of Botswana Herbarium',
      description: 'Comprehensive plant species records and herbarium specimens',
      publishingCountry: 'Botswana',
      license: 'CC BY-NC 4.0'
    },
    {
      id: 'bw-carnivore-001',
      name: 'Botswana Predator Conservation Database',
      species: 85,
      occurrences: 8500,
      publishedInCountry: true,
      organization: 'Botswana Predator Conservation',
      description: 'Carnivore tracking and conservation monitoring data',
      publishingCountry: 'Botswana',
      license: 'CC BY-NC 4.0'
    },
    {
      id: 'bw-wetland-001',
      name: 'Botswana Wetland Bird Survey',
      species: 320,
      occurrences: 85000,
      publishedInCountry: true,
      organization: 'BirdLife Botswana',
      description: 'Waterbird monitoring across wetland systems',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-savanna-001',
      name: 'Savanna Ecosystem Monitoring Program',
      species: 4200,
      occurrences: 92000,
      publishedInCountry: true,
      organization: 'Botswana Institute for Development Policy Analysis',
      description: 'Ecosystem health and species monitoring in savanna regions',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-gbif-001',
      name: 'GBIF Botswana Node',
      species: 6500,
      occurrences: 180000,
      publishedInCountry: false,
      organization: 'Global Biodiversity Information Facility',
      description: 'Aggregated biodiversity data for Botswana',
      publishingCountry: 'Denmark',
      datasetUrl: 'https://www.gbif.org/',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-insects-001',
      name: 'Botswana Insect Inventory',
      species: 2100,
      occurrences: 28000,
      publishedInCountry: true,
      organization: 'Natural History Museum of London - Botswana Programme',
      description: 'Entomological survey and species identification project',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-elephant-001',
      name: 'Elephants Without Borders Database',
      species: 15,
      occurrences: 12000,
      publishedInCountry: true,
      organization: 'Elephants Without Borders',
      description: 'Elephant population monitoring and movement tracking',
      publishingCountry: 'Botswana',
      license: 'CC BY-NC 4.0'
    },
    {
      id: 'bw-reptile-001',
      name: 'Reptiles and Amphibians of Botswana',
      species: 180,
      occurrences: 15000,
      publishedInCountry: true,
      organization: 'Herpetological Association of Africa',
      description: 'Herpetofauna distribution and ecology study',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-makgadikgadi-001',
      name: 'Makgadikgadi Pans Research Project',
      species: 850,
      occurrences: 22000,
      publishedInCountry: true,
      organization: 'University of the Witwatersrand',
      description: 'Biodiversity research in the Makgadikgadi salt pan ecosystem',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-trees-001',
      name: 'Trees and Shrubs of Botswana Database',
      species: 650,
      occurrences: 35000,
      publishedInCountry: true,
      organization: 'Forestry Association of Botswana',
      description: 'Woody plant species distribution and conservation status',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    },
    {
      id: 'bw-migration-001',
      name: 'Botswana Wildlife Migration Patterns',
      species: 95,
      occurrences: 18500,
      publishedInCountry: false,
      organization: 'Wildlife Conservation Society',
      description: 'Large mammal migration tracking and seasonal movements',
      publishingCountry: 'United States',
      license: 'CC BY-NC 4.0'
    },
    {
      id: 'bw-grassland-001',
      name: 'Grassland Biodiversity Assessment',
      species: 1400,
      occurrences: 42000,
      publishedInCountry: true,
      organization: 'Botswana University of Agriculture and Natural Resources',
      description: 'Grassland ecosystem species composition and diversity studies',
      publishingCountry: 'Botswana',
      license: 'CC BY 4.0'
    }
  ]
};