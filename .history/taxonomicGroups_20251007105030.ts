export const taxonomicGroups = [
  {
    group: "Amphibians",
    occurrences: 1749370,
    species: 265,
    occurrenceGrowth: "0.69%",
    speciesGrowth: "0.00%",
    color: "#4C9B45"
  },
  {
    group: "Arachnids",
    occurrences: 612453,
    species: 5606,
    occurrenceGrowth: "3.29%",
    speciesGrowth: "0.13%",
    color: "#0079B5"
  },
  {
    group: "Basidiomycota",
    occurrences: 1951691,
    species: 6282,
    occurrenceGrowth: "1.46%",
    speciesGrowth: "0.29%",
    color: "#684393"
  },
  {
    group: "Birds",
    occurrences: 89663205,
    species: 1203,
    occurrenceGrowth: "0.33%",
    speciesGrowth: "0.17%",
    color: "#0079B5"
  },
  {
    group: "Bony fish",
    occurrences: 445080,
    species: 544,
    occurrenceGrowth: "2.05%",
    speciesGrowth: "0.55%",
    color: "#20B4E9"
  },
  {
    group: "Flowering plants",
    occurrences: 28824,
    species: 331,
    occurrenceGrowth: "1.52%",
    speciesGrowth: "0.16%",
    color: "#4C9B45"
  },
  {
    group: "Insects",
    occurrences: 1749370,
    species: 265,
    occurrenceGrowth: "1.88%",
    speciesGrowth: "0.61%",
    color: "#E27B72"
  }
];

export interface TaxonomicGroup {
  group: string;
  occurrences: number;
  species: number;
  occurrenceGrowth: string;
  speciesGrowth: string;
  color: string;
}
