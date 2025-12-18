// Types for species accumulation curve data

export interface AccumulationDataPoint {
  year: number;
  cumulativeSpecies: number;
  occurrences?: number; // Optional: occurrence records for that year (for circle sizing)
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