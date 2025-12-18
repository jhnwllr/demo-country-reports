import { TaxonomicDiversityData, TAXONOMIC_COLORS } from './types';

// TODO: Fill in with actual Colombia taxonomic diversity data
export const colombiaTaxonomicData: TaxonomicDiversityData = {
  countryCode: 'CO',
  countryName: 'Colombia',
  totalSpecies: 0, // TODO: Add total species count
  groups: [
    // TODO: Add taxonomic groups for Colombia
    // Example structure:
    // {
    //   name: 'Flowering Plants',
    //   species: 0,
    //   percentage: 0,
    //   color: TAXONOMIC_COLORS.floweringPlants,
    //   description: 'Description of flowering plants in Colombia',
    //   examples: ['Example 1', 'Example 2', 'Example 3']
    // },
    // Add more groups as needed...
  ]
};

// Uncomment and update the import in api.ts when data is ready:
// import { colombiaTaxonomicData } from './CO';