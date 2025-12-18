import { TaxonomicDiversityData, TAXONOMIC_COLORS } from './types';

export const australiaTaxonomicData: TaxonomicDiversityData = {
  countryCode: 'AU',
  countryName: 'Australia',
  totalSpecies: 178439,
  groups: [
    {
      name: 'Flowering Plants',
      species: 28824,
      percentage: 16.2,
      color: TAXONOMIC_COLORS.floweringPlants,
      description: 'Angiosperms including native and introduced flowering plant species',
      examples: ['Eucalyptus', 'Acacia', 'Banksia']
    },
    {
      name: 'Insects',
      species: 37350,
      percentage: 20.9,
      color: TAXONOMIC_COLORS.insects,
      description: 'Including beetles, butterflies, moths, ants, and other insect orders',
      examples: ['Beetles', 'Butterflies', 'Ants']
    },
    {
      name: 'Other',
      species: 49188,
      percentage: 27.6,
      color: TAXONOMIC_COLORS.other,
      description: 'Miscellaneous taxonomic groups and unclassified species'
    },
    {
      name: 'Sac Fungi',
      species: 11372,
      percentage: 6.4,
      color: TAXONOMIC_COLORS.sacFungi,
      description: 'Ascomycota - fungi that produce spores in sacs',
      examples: ['Yeasts', 'Morels', 'Truffles']
    },
    {
      name: 'Molluscs',
      species: 10367,
      percentage: 5.8,
      color: TAXONOMIC_COLORS.molluscs,
      description: 'Marine and terrestrial mollusks',
      examples: ['Snails', 'Clams', 'Octopi']
    },
    {
      name: 'Basidiomycota',
      species: 6282,
      percentage: 3.5,
      color: TAXONOMIC_COLORS.basidiomycota,
      description: 'Club fungi including mushrooms and bracket fungi',
      examples: ['Mushrooms', 'Bracket fungi', 'Puffballs']
    },
    {
      name: 'Arachnids',
      species: 5606,
      percentage: 3.1,
      color: TAXONOMIC_COLORS.arachnids,
      description: 'Spiders, scorpions, mites, and other arachnids',
      examples: ['Spiders', 'Scorpions', 'Mites']
    },
    {
      name: 'Birds',
      species: 1203,
      percentage: 0.7,
      color: TAXONOMIC_COLORS.birds,
      description: 'Native and migratory bird species',
      examples: ['Kookaburra', 'Cockatoo', 'Emu']
    },
    {
      name: 'Mosses',
      species: 1188,
      percentage: 0.7,
      color: TAXONOMIC_COLORS.mosses,
      description: 'Bryophytes - non-vascular plants',
      examples: ['Sheet moss', 'Cushion moss', 'Hair-cap moss']
    },
    {
      name: 'Reptiles',
      species: 1171,
      percentage: 0.7,
      color: TAXONOMIC_COLORS.reptiles,
      description: 'Snakes, lizards, turtles, and crocodiles',
      examples: ['Bearded dragon', 'Python', 'Gecko']
    },
    {
      name: 'Ferns',
      species: 544,
      percentage: 0.3,
      color: TAXONOMIC_COLORS.ferns,
      description: 'Pteridophytes - vascular plants that reproduce via spores',
      examples: ['Tree ferns', 'Bracken', 'Maidenhair fern']
    },
    {
      name: 'Mammals',
      species: 477,
      percentage: 0.3,
      color: TAXONOMIC_COLORS.mammals,
      description: 'Native mammals including marsupials and placental mammals',
      examples: ['Kangaroo', 'Koala', 'Wombat']
    },
    {
      name: 'Gymnosperms',
      species: 331,
      percentage: 0.2,
      color: TAXONOMIC_COLORS.gymnosperms,
      description: 'Seed plants including conifers and cycads',
      examples: ['Cycads', 'Pine trees', 'Kauri']
    },
    {
      name: 'Amphibians',
      species: 265,
      percentage: 0.1,
      color: TAXONOMIC_COLORS.amphibians,
      description: 'Frogs, toads, and salamanders',
      examples: ['Tree frogs', 'Ground frogs', 'Toads']
    }
  ]
};