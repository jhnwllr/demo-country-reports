// Types for species accumulation curve data

export interface AccumulationDataPoint {
  year: number;
  cumulativeSpecies: number;
  effort?: number; // Sampling effort that determines point size
  occurrences?: number; // Optional: occurrence records for that year
}

export interface TaxonomicGroupAccumulation {
  group: string;
  color: string;
  data: AccumulationDataPoint[];
  totalSpecies: number;
  totalOccurrences: number;
}

export interface CountryAccumulationData {
  countryCode: string;
  countryName: string;
  lastModified: string;
  taxonomicGroups: TaxonomicGroupAccumulation[];
}