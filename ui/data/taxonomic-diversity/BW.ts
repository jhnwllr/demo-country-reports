import { TaxonomicDiversityData, TAXONOMIC_COLORS } from './types';

export const botswanaTaxonomicData: TaxonomicDiversityData = {
  countryCode: 'BW',
  countryName: 'Botswana',
  totalSpecies: 8969,
  groups: [
    {
      name: 'Insects',
      species: 3095,
      percentage: 34.5,
      color: TAXONOMIC_COLORS.insects,
      description: 'Desert and savanna insects including many endemic species',
      examples: ['Desert beetles', 'Grasshoppers', 'Termites']
    },
    {
      name: 'Flowering Plants',
      species: 3068,
      percentage: 34.2,
      color: TAXONOMIC_COLORS.floweringPlants,
      description: 'Desert and savanna flowering plants adapted to arid conditions',
      examples: ['Baobab', 'Acacia', 'Desert rose']
    },
    {
      name: 'Birds',
      species: 684,
      percentage: 7.6,
      color: TAXONOMIC_COLORS.birds,
      description: 'Diverse bird fauna including migratory and resident species',
      examples: ['African fish eagle', 'Lilac-breasted roller', 'Ostrich']
    },
    {
      name: 'Other',
      species: 400,
      percentage: 4.5,
      color: TAXONOMIC_COLORS.other,
      description: 'Miscellaneous taxonomic groups and unclassified species'
    },
    {
      name: 'Arachnids',
      species: 294,
      percentage: 3.3,
      color: TAXONOMIC_COLORS.arachnids,
      description: 'Spiders, scorpions, and other arachnids adapted to arid environments',
      examples: ['Desert spiders', 'Scorpions', 'Solifuges']
    },
    {
      name: 'Mammals',
      species: 233,
      percentage: 2.6,
      color: TAXONOMIC_COLORS.mammals,
      description: 'Large mammals of the Kalahari and Okavango ecosystems',
      examples: ['Elephant', 'Lion', 'Giraffe', 'Zebra']
    },
    {
      name: 'Sac Fungi',
      species: 183,
      percentage: 2.0,
      color: TAXONOMIC_COLORS.sacFungi,
      description: 'Fungi adapted to arid and semi-arid conditions'
    },
    {
      name: 'Reptiles',
      species: 164,
      percentage: 1.8,
      color: TAXONOMIC_COLORS.reptiles,
      description: 'Desert-adapted reptiles including snakes and lizards',
      examples: ['Rock python', 'Monitor lizard', 'Gecko']
    },
    {
      name: 'Basidiomycota',
      species: 84,
      percentage: 0.9,
      color: TAXONOMIC_COLORS.basidiomycota,
      description: 'Club fungi found in woodland and savanna areas'
    },
    {
      name: 'Amphibians',
      species: 57,
      percentage: 0.6,
      color: TAXONOMIC_COLORS.amphibians,
      description: 'Frogs and toads adapted to seasonal water availability',
      examples: ['Reed frogs', 'Bullfrogs', 'Rain frogs']
    },
    {
      name: 'Molluscs',
      species: 49,
      percentage: 0.5,
      color: TAXONOMIC_COLORS.molluscs,
      description: 'Freshwater and terrestrial mollusks'
    },
    {
      name: 'Mosses',
      species: 41,
      percentage: 0.5,
      color: TAXONOMIC_COLORS.mosses,
      description: 'Bryophytes found in moist microhabitats'
    },
    {
      name: 'Ferns',
      species: 30,
      percentage: 0.3,
      color: TAXONOMIC_COLORS.ferns,
      description: 'Ferns found in rocky outcrops and seasonal wetlands'
    }
  ]
};