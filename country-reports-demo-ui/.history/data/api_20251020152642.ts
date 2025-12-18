// Images from data/images folder (using 2-letter country codes)
const image_7939edfec694d8328b1c52b88c2e0562f61fb835 = '/data/images/BW-accumulation.png';
const image_0b3ff0d2596d1053d3859a50cdaab2ed44428b71 = '/data/images/BW-species-richness.png';
const image_1733de95b04e2a57294a1506cc4e7fe0e5eabf0e = '/data/images/BW-chao1.png';
// Country data API - loads data from JSON files
// This simulates an API endpoint that you can easily modify by editing the JSON files

// Import country data files
import { countryData as australiaData } from './countries/AU';
import { countryData as botswanaData } from './countries/BW';
import { countryData as denmarkData } from './countries/DK';
import { countryData as colombiaData } from './countries/CO';

// Images from data/images folder for countries with available assets (using 2-letter country codes)
const image_18d645e7f1bff2b60e0255aad48038c90765b0ad = '/data/images/AU-accumulation.png?v=' + Date.now();
const image_9a043df07abe015f495e424aac91e01fd5704c62 = '/data/images/AU-chao1.png?v=' + Date.now();
const image_642c8876bc4ea5b283e242b29883cc39f7b92f88 = '/data/images/AU-species-richness.png?v=' + Date.now();
const denmarkSpeciesRichness = '/data/images/DK-species-richness.png';
const denmarkChao1 = '/data/images/DK-chao1.png';
const denmarkAccumulation = '/data/images/DK-accumulation.png';
const colombiaSpeciesRichness = '/data/images/CO-species-richness.png';
const colombiaChao1 = '/data/images/CO-chao1.png';
const colombiaAccumulation = '/data/images/CO-accumulation.png';

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

// Helper function to generate image paths using country codes
export const getCountryImagePath = (countryCode: string, imageType: 'accumulation' | 'chao1' | 'species-richness'): string => {
  return `/data/images/${countryCode}-${imageType}.png`;
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