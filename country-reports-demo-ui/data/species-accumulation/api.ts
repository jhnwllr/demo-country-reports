import type { CountryAccumulationData } from './types';
import { australiaAccumulationData } from './AU';
import { botswanaAccumulationData } from './BW';
import { colombiaAccumulationData } from './CO';
import { denmarkAccumulationData } from './DK';

// Registry of all country accumulation data
const accumulationDataRegistry: Record<string, CountryAccumulationData> = {
  AU: australiaAccumulationData,
  BW: botswanaAccumulationData,
  CO: colombiaAccumulationData,
  DK: denmarkAccumulationData,
};

/**
 * Get species accumulation data for a specific country
 */
export const getAccumulationData = (countryCode: string): CountryAccumulationData | null => {
  return accumulationDataRegistry[countryCode] || null;
};

/**
 * Get all available country codes with accumulation data
 */
export const getAvailableCountries = (): string[] => {
  return Object.keys(accumulationDataRegistry);
};

/**
 * Get taxonomic groups for a specific country
 */
export const getTaxonomicGroups = (countryCode: string): string[] => {
  const data = getAccumulationData(countryCode);
  return data ? data.taxonomicGroups.map(group => group.group) : [];
};

/**
 * Get accumulation data for a specific taxonomic group in a country
 */
export const getGroupAccumulationData = (countryCode: string, groupName: string) => {
  const data = getAccumulationData(countryCode);
  if (!data) return null;
  
  return data.taxonomicGroups.find(group => group.group === groupName) || null;
};