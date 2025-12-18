import { DatasetScatterData } from './types';
import { australiaDatasetData } from './AU';
import { botswanaDatasetData } from './BW';
import { colombiaDatasetData } from './CO';
import { denmarkDatasetData } from './DK';

// Map of country codes to their dataset data
const datasetDataMap: Record<string, DatasetScatterData> = {
  'AU': australiaDatasetData,
  'BW': botswanaDatasetData,
  'CO': colombiaDatasetData,
  'DK': denmarkDatasetData,
};

/**
 * Get dataset scatter plot data for a specific country
 */
export function getDatasetScatterData(countryCode: string): DatasetScatterData | null {
  return datasetDataMap[countryCode.toUpperCase()] || null;
}

/**
 * Get all available country codes for dataset data
 */
export function getAvailableCountryCodes(): string[] {
  return Object.keys(datasetDataMap);
}

/**
 * Check if dataset data is available for a country
 */
export function hasDatasetData(countryCode: string): boolean {
  return countryCode.toUpperCase() in datasetDataMap;
}

/**
 * Get summary statistics across all countries
 */
export function getDatasetSummaryStats() {
  const allData = Object.values(datasetDataMap);
  
  const totalCountries = allData.length;
  const totalDatasets = allData.reduce((sum, country) => sum + country.totalDatasets, 0);
  const totalSpecies = allData.reduce((sum, country) => 
    sum + Math.max(...country.datasets.map(d => d.species)), 0
  );
  const totalOccurrences = allData.reduce((sum, country) => 
    sum + country.datasets.reduce((countrySum, dataset) => countrySum + dataset.occurrences, 0), 0
  );
  
  const lastTimes = allData
    .map(d => d.lastModified ? new Date(d.lastModified).getTime() : 0);

  return {
    totalCountries,
    totalDatasets,
    totalSpecies,
    totalOccurrences,
    lastUpdated: Math.max(...lastTimes)
  };
}

export { datasetDataMap };