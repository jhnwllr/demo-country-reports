// Types for species accumulation curve data

export interface AccumulationDataPoint {
  year: number;
  cumulativeSpecies: number;
  occurrences: number;
  newSpecies?: number; // Optional: new species discovered that year
}

export interface TaxonomicGroupAccumulation {
  group: string;
  color: string;
  data: AccumulationDataPoint[];
  totalSpecies: number;
  totalOccurrences: number;
  description?: string;
}

export interface CountryAccumulationData {
  countryCode: string;
  countryName: string;
  lastModified: string;
  taxonomicGroups: TaxonomicGroupAccumulation[];
}