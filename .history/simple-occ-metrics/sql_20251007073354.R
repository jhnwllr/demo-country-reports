library(rgbif)

sql <- "
SELECT 
  countryCode,
  CASE 
    WHEN \"year\" >= 1600 AND \"year\" <= 2024 THEN '1600-2024'
    WHEN \"year\" >= 1600 AND \"year\" <= 2025 THEN '1600-2025'
    ELSE 'other_years'
  END AS year_group,
  CASE 
    WHEN classKey IN ('359') THEN 'mammals'
    WHEN classKey IN ('212') THEN 'birds'
    WHEN familyKey IN ('1103', '1104', '494', '495', '1105', '496', '497', '1106', '498', '499', '1107', '537', '538', '1153', '547', '1162', '548', '549', '550', '1163', '1164', '1165', '1166', '1167', '1305', '1067', '1306', '1307', '1308', '1068', '1069', '587', '1310', '588', '589', '1311', '1312', '1313', '590', '708', '890', '774', '889', '773', '772', '888', '765', '879') THEN 'bonyfish'
    WHEN classKey IN ('131') THEN 'amphibians'
    WHEN classKey IN ('216') THEN 'insects'
    WHEN classKey IN ('11418114', '11569602', '11592253', '11493978') THEN 'reptiles'
    WHEN phylumKey IN ('52') THEN 'molluscs'
    WHEN classKey IN ('367') THEN 'arachnids'
    WHEN classKey IN ('220', '196') THEN 'floweringplants'
    WHEN classKey IN ('194', '244', '228', '282') THEN 'gymnosperms'
    WHEN orderKey IN ('392') THEN 'ferns'
    WHEN phylumKey IN ('35') THEN 'mosses'
    WHEN phylumKey IN ('95') THEN 'sacfungi'
    WHEN phylumKey IN ('34') THEN 'basidiomycota'
    ELSE 'other'
  END AS taxon_group,
  COUNT(*) AS occurrence_count,
  COUNT(DISTINCT speciesKey) AS distinct_species_count
FROM occurrence
WHERE countryCode IN ('BW', 'CO', 'DK', 'AU')
  AND \"year\" >= 1600 AND \"year\" <= 2025
GROUP BY 
  countryCode,
  CASE 
    WHEN \"year\" >= 1600 AND \"year\" <= 2024 THEN '1600-2024'
    WHEN \"year\" >= 1600 AND \"year\" <= 2025 THEN '1600-2025'
    ELSE 'other_years'
  END,
  CASE 
    WHEN classKey IN ('359') THEN 'mammals'
    WHEN classKey IN ('212') THEN 'birds'
    WHEN familyKey IN ('1103', '1104', '494', '495', '1105', '496', '497', '1106', '498', '499', '1107', '537', '538', '1153', '547', '1162', '548', '549', '550', '1163', '1164', '1165', '1166', '1167', '1305', '1067', '1306', '1307', '1308', '1068', '1069', '587', '1310', '588', '589', '1311', '1312', '1313', '590', '708', '890', '774', '889', '773', '772', '888', '765', '879') THEN 'bonyfish'
    WHEN classKey IN ('131') THEN 'amphibians'
    WHEN classKey IN ('216') THEN 'insects'
    WHEN classKey IN ('11418114', '11569602', '11592253', '11493978') THEN 'reptiles'
    WHEN phylumKey IN ('52') THEN 'molluscs'
    WHEN classKey IN ('367') THEN 'arachnids'
    WHEN classKey IN ('220', '196') THEN 'floweringplants'
    WHEN classKey IN ('194', '244', '228', '282') THEN 'gymnosperms'
    WHEN orderKey IN ('392') THEN 'ferns'
    WHEN phylumKey IN ('35') THEN 'mosses'
    WHEN phylumKey IN ('95') THEN 'sacfungi'
    WHEN phylumKey IN ('34') THEN 'basidiomycota'
    ELSE 'other'
  END
ORDER BY occurrence_count DESC;
"

occ_download_sql(sql)

d <- occ_download_get('0056424-250920141307145') %>%
occ_download_import()


  taxonomicGroups: [
    {
      group: "Flowering plants",
      occurrences: 12456789,
      species: 1834,
      occurrenceGrowth: "4.2%",
      speciesGrowth: "0.6%",
      color: "#4C9B45"
    },
    {
      group: "Birds", 
      occurrences: 28934567,
      species: 512,
      occurrenceGrowth: "5.1%",
      speciesGrowth: "0.3%",
      color: "#0079B5"
    },
    {
      group: "Insects",
      occurrences: 3456789,
      species: 15642,
      occurrenceGrowth: "3.8%",
      speciesGrowth: "1.2%",
      color: "#E27B72"
    },
    {
      group: "Mammals",
      occurrences: 1789456,
      species: 89,
      occurrenceGrowth: "2.9%",
      speciesGrowth: "0.1%",
      color: "#F0BE48"
    },
    {
      group: "Bony fish",
      occurrences: 2345678,
      species: 298,
      occurrenceGrowth: "3.2%",
      speciesGrowth: "0.4%",
      color: "#20B4E9"
    },
    {
      group: "Reptiles",
      occurrences: 234567,
      species: 18,
      occurrenceGrowth: "1.8%",
      speciesGrowth: "0.2%",
      color: "#684393"
    },
    {
      group: "Amphibians",
      occurrences: 345678,
      species: 24,
      occurrenceGrowth: "2.1%",
      speciesGrowth: "0.1%",
      color: "#4C9B45"
    },
    {
      group: "Molluscs",
      occurrences: 456789,
      species: 456,
      occurrenceGrowth: "1.9%",
      speciesGrowth: "0.7%",
      color: "#D0628D"
    },
    {
      group: "Sac fungi",
      occurrences: 2134567,
      species: 3842,
      occurrenceGrowth: "6.2%",
      speciesGrowth: "2.1%",
      color: "#4F4C4D"
    },
    {
      group: "Basidiomycota",
      occurrences: 1567890,
      species: 2156,
      occurrenceGrowth: "5.8%",
      speciesGrowth: "1.9%",
      color: "#684393"
    },
    {
      group: "Arachnids",
      occurrences: 789456,
      species: 892,
      occurrenceGrowth: "4.1%",
      speciesGrowth: "1.3%",
      color: "#0079B5"
    },
    {
      group: "Ferns",
      occurrences: 123456,
      species: 67,
      occurrenceGrowth: "2.3%",
      speciesGrowth: "0.4%",
      color: "#F0BE48"
    },
    {
      group: "Mosses",
      occurrences: 567890,
      species: 456,
      occurrenceGrowth: "3.7%",
      speciesGrowth: "0.8%",
      color: "#20B4E9"
    },
    {
      group: "Gymnosperms",
      occurrences: 78945,
      species: 12,
      occurrenceGrowth: "1.4%",
      speciesGrowth: "0.1%",
      color: "#E27B72"
    }
  ]
};


