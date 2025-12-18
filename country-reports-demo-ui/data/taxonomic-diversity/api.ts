// API for taxonomic diversity chart data
import { TaxonomicDiversityData } from './types';
import { australiaTaxonomicData } from './AU';
import { botswanaTaxonomicData } from './BW';

// Registry of all taxonomic diversity data
const taxonomicDataRegistry: Record<string, TaxonomicDiversityData> = {
  AU: australiaTaxonomicData,
  BW: botswanaTaxonomicData,
  // Add more countries as needed:
  // CO: colombiaTaxonomicData,
  // DK: denmarkTaxonomicData,
};

/**
 * Get taxonomic diversity data for a specific country
 * @param countryCode - Two-letter country code (e.g., 'AU', 'BW')
 * @returns Taxonomic diversity data or null if not found
 */
export const getTaxonomicDiversityData = async (countryCode: string): Promise<TaxonomicDiversityData | null> => {
  // Simulate API delay (optional)
  await new Promise(resolve => setTimeout(resolve, 10));
  
  return taxonomicDataRegistry[countryCode.toUpperCase()] || null;
};

/**
 * Get all available countries with taxonomic diversity data
 * @returns Array of country codes
 */
export const getAvailableTaxonomicCountries = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 10));
  
  return Object.keys(taxonomicDataRegistry);
};

/**
 * Validate taxonomic diversity data consistency
 * @param data - Taxonomic diversity data to validate
 * @returns Validation result with any issues found
 */
export const validateTaxonomicData = (data: TaxonomicDiversityData): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  
  // Check if percentages add up to approximately 100%
  const totalPercentage = data.groups.reduce((sum, group) => sum + group.percentage, 0);
  if (Math.abs(totalPercentage - 100) > 0.1) {
    issues.push(`Percentages sum to ${totalPercentage}% instead of 100%`);
  }
  
  // Check if species counts match total
  const totalSpeciesCount = data.groups.reduce((sum, group) => sum + group.species, 0);
  if (totalSpeciesCount !== data.totalSpecies) {
    issues.push(`Species counts sum to ${totalSpeciesCount} but totalSpecies is ${data.totalSpecies}`);
  }
  
  // Check for duplicate group names
  const groupNames = data.groups.map(g => g.name.toLowerCase());
  const uniqueNames = new Set(groupNames);
  if (uniqueNames.size !== groupNames.length) {
    issues.push('Duplicate group names found');
  }
  
  // Check for valid colors (hex format)
  data.groups.forEach(group => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(group.color)) {
      issues.push(`Invalid color format for group "${group.name}": ${group.color}`);
    }
  });
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

// Export the registry for direct access if needed
export { taxonomicDataRegistry };

// Export types for convenience
export type { TaxonomicDiversityData, TaxonomicGroup } from './types';