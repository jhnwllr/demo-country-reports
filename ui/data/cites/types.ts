export interface CitesSpeciesData {
  appendix: 'I' | 'II' | 'III';
  count: number;
  description: string;
}

export interface CountryCitesData {
  countryCode: string;
  totalSpecies: number;
  appendices: CitesSpeciesData[];
  lastUpdated: string;
}
