// Placeholder images for Figma assets
const image_7939edfec694d8328b1c52b88c2e0562f61fb835 = '/assets/placeholder-chart.png';
const image_0b3ff0d2596d1053d3859a50cdaab2ed44428b71 = '/assets/placeholder-map.png';
const image_1733de95b04e2a57294a1506cc4e7fe0e5eabf0e = '/assets/placeholder-map2.png';
// Country data API - loads data from JSON files
// This simulates an API endpoint that you can easily modify by editing the JSON files

// Import country data files
import { countryData as australiaData } from './countries/AU';
import { countryData as botswanaData } from './countries/BW';
import { countryData as denmarkData } from './countries/DK';
import { countryData as colombiaData } from './countries/CO';

// Image imports for countries with available assets
import image_18d645e7f1bff2b60e0255aad48038c90765b0ad from 'figma:asset/18d645e7f1bff2b60e0255aad48038c90765b0ad.png';
import image_9a043df07abe015f495e424aac91e01fd5704c62 from 'figma:asset/9a043df07abe015f495e424aac91e01fd5704c62.png';
import image_642c8876bc4ea5b283e242b29883cc39f7b92f88 from 'figma:asset/642c8876bc4ea5b283e242b29883cc39f7b92f88.png';
import denmarkSpeciesRichness from "figma:asset/e5e4b0ec4e58ab45e0deb93a4136909f3a260699.png";
import denmarkChao1 from "figma:asset/575f90e5262d0551b03fc8e5d42fce5537cd4a9e.png";
import denmarkAccumulation from "figma:asset/9e97250e6b5ca984730cf395493778c31928d53f.png";
import colombiaSpeciesRichness from "figma:asset/e479b9aacbf7cfdc04762f98f69a72b862fe95ae.png";
import colombiaChao1 from "figma:asset/b9dfbea6ec91b346c4e8bfc2ccbabb9426f0952c.png";
import colombiaAccumulation from "figma:asset/1bddf94d2d0364db4055b85546e5a7343b788bad.png";

export interface TaxonomicGroup {
  group: string;
  occurrences: number;
  species: number;
  occurrenceGrowth: string;
  speciesGrowth: string;
  color: string;
}

export interface CountryData {
  name: string;
  code: string;
  totalOccurrences: string;
  publishedByCountry: string;
  annualGrowth: string;
  datasets: string;
  organizations: string;
  species: string;
  speciesAnnualGrowth: string;
  families: string;
  literatureCount: string;
  literatureTotal: string;
  description: string;
  chartTitle: string;
  taxonomicGroups: TaxonomicGroup[];
  diversityMaps?: {
    speciesRichness: string;
    chao1: string;
  };
  accumulationCurve?: string;
}

// Enhanced country data with image assets
const enhancedCountryData: Record<string, CountryData> = {
  AU: {
    ...australiaData,
    diversityMaps: {
      speciesRichness: image_642c8876bc4ea5b283e242b29883cc39f7b92f88,
      chao1: image_9a043df07abe015f495e424aac91e01fd5704c62
    },
    accumulationCurve: image_18d645e7f1bff2b60e0255aad48038c90765b0ad
  },
  BW: {
    ...botswanaData,
    diversityMaps: {
      speciesRichness: image_0b3ff0d2596d1053d3859a50cdaab2ed44428b71,
      chao1: image_1733de95b04e2a57294a1506cc4e7fe0e5eabf0e
    },
    accumulationCurve: image_7939edfec694d8328b1c52b88c2e0562f61fb835
  },
  DK: {
    ...denmarkData,
    diversityMaps: {
      speciesRichness: denmarkSpeciesRichness,
      chao1: denmarkChao1
    },
    accumulationCurve: denmarkAccumulation
  },
  CO: {
    ...colombiaData,
    diversityMaps: {
      speciesRichness: colombiaSpeciesRichness,
      chao1: colombiaChao1
    },
    accumulationCurve: colombiaAccumulation
  }
};

// API function to get country data
export const getCountryData = async (countryCode: string): Promise<CountryData | null> => {
  // Simulate API delay (optional)
  await new Promise(resolve => setTimeout(resolve, 10));
  
  return enhancedCountryData[countryCode] || null;
};

// API function to get all available countries
export const getAvailableCountries = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 10));
  
  return Object.keys(enhancedCountryData);
};

// Export the data for direct access if needed
export { enhancedCountryData };