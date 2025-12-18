import type { CountryCitesData } from './types';

// Sample CITES data for each country
const citesDataByCountry: Record<string, CountryCitesData> = {
  AU: {
    countryCode: 'AU',
    totalSpecies: 156,
    appendices: [
      {
        appendix: 'I',
        count: 42,
        description: 'Threatened with extinction - commercial trade prohibited'
      },
      {
        appendix: 'II',
        count: 98,
        description: 'Not necessarily threatened but trade must be controlled'
      },
      {
        appendix: 'III',
        count: 16,
        description: 'Protected in at least one country requesting assistance'
      }
    ],
    lastUpdated: '2024-12-01'
  },
  BW: {
    countryCode: 'BW',
    totalSpecies: 89,
    appendices: [
      {
        appendix: 'I',
        count: 28,
        description: 'Threatened with extinction - commercial trade prohibited'
      },
      {
        appendix: 'II',
        count: 54,
        description: 'Not necessarily threatened but trade must be controlled'
      },
      {
        appendix: 'III',
        count: 7,
        description: 'Protected in at least one country requesting assistance'
      }
    ],
    lastUpdated: '2024-12-01'
  },
  DK: {
    countryCode: 'DK',
    totalSpecies: 34,
    appendices: [
      {
        appendix: 'I',
        count: 8,
        description: 'Threatened with extinction - commercial trade prohibited'
      },
      {
        appendix: 'II',
        count: 22,
        description: 'Not necessarily threatened but trade must be controlled'
      },
      {
        appendix: 'III',
        count: 4,
        description: 'Protected in at least one country requesting assistance'
      }
    ],
    lastUpdated: '2024-12-01'
  },
  CO: {
    countryCode: 'CO',
    totalSpecies: 312,
    appendices: [
      {
        appendix: 'I',
        count: 76,
        description: 'Threatened with extinction - commercial trade prohibited'
      },
      {
        appendix: 'II',
        count: 198,
        description: 'Not necessarily threatened but trade must be controlled'
      },
      {
        appendix: 'III',
        count: 38,
        description: 'Protected in at least one country requesting assistance'
      }
    ],
    lastUpdated: '2024-12-01'
  }
};

export function getCitesData(countryCode: string): CountryCitesData | null {
  return citesDataByCountry[countryCode] || null;
}
