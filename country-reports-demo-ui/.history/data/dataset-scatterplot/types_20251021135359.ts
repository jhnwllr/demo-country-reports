// Types for editable dataset scatter plot data
export interface DatasetPoint {
  id: string;
  name: string;
  species: number;
  occurrences: number;
  publishedInCountry: boolean;
  organization?: string;
  description?: string;
  publishingCountry?: string;
  datasetUrl?: string;
  lastUpdated?: string;
  license?: string;
}

export interface DatasetScatterData {
  countryCode: string;
  countryName: string;
  totalDatasets: number;
  datasets: DatasetPoint[];
  lastModified: string;
  dataSource?: string;
  notes?: string;
}

// Helper function to validate dataset data
export const validateDatasetData = (data: DatasetScatterData): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  
  // Check for duplicate dataset IDs
  const ids = data.datasets.map(d => d.id);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    issues.push('Duplicate dataset IDs found');
  }
  
  // Check for valid species and occurrence counts
  data.datasets.forEach(dataset => {
    if (dataset.species <= 0) {
      issues.push(`Invalid species count for dataset "${dataset.name}": ${dataset.species}`);
    }
    if (dataset.occurrences <= 0) {
      issues.push(`Invalid occurrence count for dataset "${dataset.name}": ${dataset.occurrences}`);
    }
    if (dataset.species > dataset.occurrences) {
      issues.push(`Species count exceeds occurrences for dataset "${dataset.name}"`);
    }
  });
  
  // Check total datasets count matches array length
  if (data.totalDatasets !== data.datasets.length) {
    issues.push(`Total datasets count (${data.totalDatasets}) doesn't match actual datasets (${data.datasets.length})`);
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};