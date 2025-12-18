

library(rgbif)
library(dplyr)

sql_2024 <- "
SELECT 
  countryCode,
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
  AND \"year\" >= 1600 AND \"year\" <= 2024
GROUP BY 
  countryCode,
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




sql_2025 <- "
SELECT 
  countryCode,
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
# occ_download_sql(sql_2024)
# occ_download_sql(sql_2025)

d_2024 <- occ_download_get('0056992-250920141307145') %>%
    occ_download_import() |>
    dplyr::mutate(id = paste0(countrycode, "_", taxon_group)) |>
    glimpse() |>
    select(id, distinct_species_count, occurrence_count)


d_2025 <- occ_download_get('0057061-250920141307145') %>%
    occ_download_import() |>
    dplyr::mutate(id = paste0(countrycode, "_", taxon_group)) |>
    glimpse() 


dd <- merge(d_2024, d_2025, by = "id", all = TRUE, suffixes = c("_2024", "_2025")) |>
  dplyr::mutate(
    occurrence_growth_pct = round(((occurrence_count_2025 - occurrence_count_2024) / occurrence_count_2024) * 100, 2),
    species_growth_pct = round(((distinct_species_count_2025 - distinct_species_count_2024) / distinct_species_count_2024) * 100, 2)
  ) |>
glimpse() 

dd

$ distinct_species_count_2024 <int> 265, 5599, 6264, 1201, 541, 28779, 329, 37…
$ occurrence_count_2024       <int> 1737387, 592929, 1923640, 89371294, 436143…
$ countrycode                 <chr> "AU", "AU", "AU", "AU", "AU", "AU", "AU", …
$ taxon_group                 <chr> "amphibians", "arachnids", "basidiomycota"…
$ occurrence_count_2025       <int> 1749370, 612453, 1951691, 89663205, 445080…
$ distinct_species_count_2025 <int> 265, 5606, 6282, 1203, 544, 28824, 331, 37…
$ occurrence_growth_pct       <dbl> 0.69, 3.29, 1.46, 0.33, 2.05, 1.52, 1.88, …
$ species_growth_pct          <dbl> 0.00, 0.13, 0.29, 0.17, 0.55, 0.16, 0.61, …

