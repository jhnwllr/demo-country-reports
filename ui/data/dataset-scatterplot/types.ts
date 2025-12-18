// Types for editable dataset scatter plot data
// Minimal types for dataset-scatterplot editable data
export interface DatasetPoint {
  id: string;
  name: string;
  species: number;
  occurrences: number;
  publishedInCountry: boolean;
}

export interface DatasetScatterData {
  countryCode: string;
  countryName: string;
  totalDatasets: number;
  lastModified?: string;
  dataSource?: string;
  notes?: string;
  datasets: DatasetPoint[];
}