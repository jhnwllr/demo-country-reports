import { DatasetScatterData } from './types';

export const denmarkDatasetData: DatasetScatterData = {
  countryCode: 'DK',
  countryName: 'Denmark',
  totalDatasets: 22,
  lastModified: '2025-10-21',
  dataSource: 'Natural History Museum of Denmark and Danish biodiversity institutions',
  notes: 'Comprehensive datasets from well-documented Danish flora and fauna',
  datasets: [
    { id: 'dk-1', name: 'Natural History Museum of Denmark Collections', species: 18500, occurrences: 950000, publishedInCountry: true },
    { id: 'dk-2', name: 'DanBIF Danish Biodiversity Information Facility', species: 22000, occurrences: 1450000, publishedInCountry: true },
    { id: 'dk-3', name: 'GBIF Denmark Node', species: 25000, occurrences: 2100000, publishedInCountry: true },
    { id: 'dk-4', name: 'Danish Ornithological Society Database', species: 520, occurrences: 850000, publishedInCountry: true },
    { id: 'dk-5', name: 'eBird Denmark', species: 480, occurrences: 1200000, publishedInCountry: false },
    { id: 'dk-6', name: 'Danish Species Atlas Project', species: 15000, occurrences: 750000, publishedInCountry: true },
    { id: 'dk-7', name: 'Danish Marine Biodiversity Database', species: 3500, occurrences: 185000, publishedInCountry: true },
    { id: 'dk-8', name: 'University of Copenhagen Herbarium', species: 12000, occurrences: 425000, publishedInCountry: true },
    { id: 'dk-9', name: 'Danish Forest and Nature Agency Database', species: 8500, occurrences: 320000, publishedInCountry: true },
    { id: 'dk-10', name: 'Danish Butterfly Monitoring Scheme', species: 65, occurrences: 125000, publishedInCountry: true },
    { id: 'dk-11', name: 'Danish Freshwater Biology Laboratory', species: 2400, occurrences: 95000, publishedInCountry: true },
    { id: 'dk-12', name: 'iNaturalist Denmark Observations', species: 8200, occurrences: 285000, publishedInCountry: false },
    { id: 'dk-13', name: 'Danish Mycological Society Database', species: 5500, occurrences: 180000, publishedInCountry: true },
    { id: 'dk-14', name: 'Danish Lichen Society Collections', species: 1200, occurrences: 45000, publishedInCountry: true },
    { id: 'dk-15', name: 'Danish Wild Bee Monitoring Project', species: 285, occurrences: 75000, publishedInCountry: true },
    { id: 'dk-16', name: 'Danish Beetle Atlas', species: 3800, occurrences: 155000, publishedInCountry: true },
    { id: 'dk-17', name: 'Danish Mammal Atlas', species: 85, occurrences: 45000, publishedInCountry: true },
    { id: 'dk-18', name: 'Danish Spider Database', species: 650, occurrences: 95000, publishedInCountry: true },
    { id: 'dk-19', name: 'Danish Bryological Society Collections', species: 850, occurrences: 65000, publishedInCountry: true },
    { id: 'dk-20', name: 'Danish Wetland Monitoring Program', species: 2200, occurrences: 125000, publishedInCountry: true },
    { id: 'dk-21', name: 'Greenland Biodiversity Database', species: 4500, occurrences: 95000, publishedInCountry: true },
    { id: 'dk-22', name: 'Faroe Islands Natural History Collections', species: 1800, occurrences: 65000, publishedInCountry: true }
  ]
};