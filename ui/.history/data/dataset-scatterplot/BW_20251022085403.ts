import { DatasetScatterData } from './types';

export const botswanaDatasetData: DatasetScatterData = {
  countryCode: 'BW',
  countryName: 'Botswana',
  totalDatasets: 10,
  lastModified: '2025-10-22',
  dataSource: 'GBIF',
  notes: 'Placeholder dataset data for Botswana',
  datasets: [
    {
      id: '1',
      name: 'Botswana Biodiversity Survey',
      species: 500,
      occurrences: 2500,
      publishedInCountry: true,
    },
    {
      id: '2',
      name: 'Kalahari Desert Flora',
      species: 300,
      occurrences: 1200,
      publishedInCountry: true,
    },
    {
      id: '3',
      name: 'Okavango Delta Wildlife',
      species: 800,
      occurrences: 5000,
      publishedInCountry: true,
    },
    {
      id: '4',
      name: 'International Bird Records',
      species: 150,
      occurrences: 800,
      publishedInCountry: false,
    },
    {
      id: '5',
      name: 'Southern African Mammals',
      species: 200,
      occurrences: 1500,
      publishedInCountry: false,
    },
    {
      id: '6',
      name: 'Chobe National Park Survey',
      species: 600,
      occurrences: 3200,
      publishedInCountry: true,
    },
    {
      id: '7',
      name: 'Global Herbarium Records',
      species: 400,
      occurrences: 900,
      publishedInCountry: false,
    },
    {
      id: '8',
      name: 'Botswana Insect Collection',
      species: 1200,
      occurrences: 4500,
      publishedInCountry: true,
    },
    {
      id: '9',
      name: 'University Research Project',
      species: 250,
      occurrences: 600,
      publishedInCountry: true,
    },
    {
      id: '10',
      name: 'Regional Conservation Data',
      species: 350,
      occurrences: 1800,
      publishedInCountry: false,
    }
  ]
};