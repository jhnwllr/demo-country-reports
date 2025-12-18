import { DatasetScatterData } from './types';

export const australiaDatasetData: DatasetScatterData = {
  countryCode: 'AU',
  countryName: 'Australia',
  totalDatasets: 7,
  lastModified: '2025-10-21',
  dataSource: 'GBIF',
  notes: 'Biodiversity datasets from Australia institutions and GBIF network',
  datasets: [
    {
      id: 'au-1',
      name: 'NSW BioNet Atlas',
      species: 11733,
      occurrences: 14527447,
      publishedInCountry: true
    },
    {
      id: 'au-2',
      name: 'Victorian Biodiversity Atlas',
      species: 9313,
      occurrences: 10079568,
      publishedInCountry: true
    },
    {
      id: 'au-3',
      name: 'BirdLife Australia, Birdata',
      species: 710,
      occurrences: 11631570,
      publishedInCountry: true
    },
    {
      id: 'au-4',
      name: 'Eremaea',
      species: 876,
      occurrences: 3289668,
      publishedInCountry: true
    },
    {
      id: 'au-5',
      name: 'Australian Microbiome 16S (Archaea) Dataset of Terrestrial Samples',
      species: 371,
      occurrences: 4124268,
      publishedInCountry: true
    },
    {
      id: 'au-6',
      name: 'Australian Microbiome 16S (Bacteria) Dataset of Terrestrial Samples',
      species: 8753,
      occurrences: 26667782,
      publishedInCountry: true
    },
    {
      id: 'au-7',
      name: 'Australian Microbiome 18S (Eukaryote) Dataset of Terrestrial Samples',
      species: 5244,
      occurrences: 4634008,
      publishedInCountry: true
    }
  ]
};

