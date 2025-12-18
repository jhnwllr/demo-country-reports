import { CountryAccumulationData } from './types';

// Generate sample accumulation data for different taxonomic groups
const generateAccumulationData = (maxSpecies: number, years: number = 15) => {
  const data = [];
  let cumulativeSpecies = 0;
  
  for (let i = 0; i < years; i++) {
    const year = 2010 + i;
    // Simulate realistic accumulation curve (fast growth initially, then leveling off)
    const progress = i / (years - 1);
    const growthFactor = 1 - Math.pow(progress, 2); // Quadratic decay for realistic curve
    const yearlyGrowth = Math.floor(maxSpecies * growthFactor * 0.15 * Math.random() + maxSpecies * 0.02);
    
    cumulativeSpecies = Math.min(cumulativeSpecies + yearlyGrowth, maxSpecies);
    const occurrences = Math.floor(cumulativeSpecies * (50 + Math.random() * 200));
    
    data.push({
      year,
      cumulativeSpecies,
      occurrences,
      newSpecies: yearlyGrowth
    });
  }
  
  return data;
};

export const australiaAccumulationData: CountryAccumulationData = {
  countryCode: 'AU',
  countryName: 'Australia',
  lastModified: '2025-10-22',
  taxonomicGroups: [
    {
      group: 'Amphibians',
      color: '#4C9B45',
      totalSpecies: 265,
      totalOccurrences: 1749370,
      description: 'Frogs, toads, and salamanders across Australian ecosystems',
      data: generateAccumulationData(265)
    },
    {
      group: 'Arachnids',
      color: '#0079B5',
      totalSpecies: 5606,
      totalOccurrences: 612453,
      description: 'Spiders, scorpions, and other arachnids',
      data: generateAccumulationData(5606)
    },
    {
      group: 'Basidiomycota',
      color: '#E27B72',
      totalSpecies: 6282,
      totalOccurrences: 1951691,
      description: 'Mushrooms, toadstools, and other basidiomycete fungi',
      data: generateAccumulationData(6282)
    },
    {
      group: 'Birds',
      color: '#F59E0B',
      totalSpecies: 1028,
      totalOccurrences: 146919877,
      description: 'Native and migratory bird species',
      data: generateAccumulationData(1028)
    },
    {
      group: 'Bryophytes',
      color: '#8B5CF6',
      totalSpecies: 2376,
      totalOccurrences: 433569,
      description: 'Mosses, liverworts, and hornworts',
      data: generateAccumulationData(2376)
    },
    {
      group: 'Insects',
      color: '#EC4899',
      totalSpecies: 21114,
      totalOccurrences: 7685973,
      description: 'Beetles, butterflies, ants, and other insects',
      data: generateAccumulationData(21114)
    },
    {
      group: 'Mammals',
      color: '#06B6D4',
      totalSpecies: 479,
      totalOccurrences: 3149639,
      description: 'Native marsupials, placental mammals, and marine species',
      data: generateAccumulationData(479)
    },
    {
      group: 'Mollusks',
      color: '#84CC16',
      totalSpecies: 7228,
      totalOccurrences: 1300615,
      description: 'Snails, clams, octopuses, and other mollusks',
      data: generateAccumulationData(7228)
    },
    {
      group: 'Plants',
      color: '#F97316',
      totalSpecies: 33004,
      totalOccurrences: 58797415,
      description: 'Native flowering plants, conifers, and ferns',
      data: generateAccumulationData(33004)
    },
    {
      group: 'Reptiles',
      color: '#EF4444',
      totalSpecies: 1074,
      totalOccurrences: 2039859,
      description: 'Snakes, lizards, turtles, and crocodiles',
      data: generateAccumulationData(1074)
    }
  ]
};