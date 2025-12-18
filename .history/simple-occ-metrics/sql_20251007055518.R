library(rgbif)

mammals <- c("359")
birds <- c("212")
bonyfish <- c("1103", "1104", "494", "495", "1105", "496", "497", "1106", "498", "499", "1107", "537", "538", "1153", "547", "1162", "548", "549", "550", "1163", "1164", "1165", "1166", "1167", "1305", "1067", "1306", "1307", "1308", "1068", "1069", "587", "1310", "588", "589", "1311", "1312", "1313", "590", "708", "890", "774", "889", "773", "772", "888", "765", "879")
amphibians <- c("131")
insects <- c("216")
reptiles <- c("11418114", "11569602", "11592253", "11493978")
molluscs <- c("52")
arachnids <- c("367")
floweringplants <- c("220", "196")
gymnosperms <- c("194", "244", "228", "282")
ferns <- c("7228684", "246", "7228682", "7219203")
mosses <- c("35")
sacfungi <- c("95")
basidiomycota <- c("34")



sql <- "
SELECT 
  CASE 
    WHEN taxonKey IN ('359') THEN 'mammals'
    WHEN taxonKey IN ('212') THEN 'birds'
    WHEN taxonKey IN ('1103', '1104', '494', '495', '1105', '496', '497', '1106', '498', '499', '1107', '537', '538', '1153', '547', '1162', '548', '549', '550', '1163', '1164', '1165', '1166', '1167', '1305', '1067', '1306', '1307', '1308', '1068', '1069', '587', '1310', '588', '589', '1311', '1312', '1313', '590', '708', '890', '774', '889', '773', '772', '888', '765', '879') THEN 'bonyfish'
    WHEN taxonKey IN ('131') THEN 'amphibians'
    WHEN taxonKey IN ('216') THEN 'insects'
    WHEN taxonKey IN ('11418114', '11569602', '11592253', '11493978') THEN 'reptiles'
    WHEN taxonKey IN ('52') THEN 'molluscs'
    WHEN taxonKey IN ('367') THEN 'arachnids'
    WHEN taxonKey IN ('220', '196') THEN 'floweringplants'
    WHEN taxonKey IN ('194', '244', '228', '282') THEN 'gymnosperms'
    WHEN taxonKey IN ('7228684', '246', '7228682', '7219203') THEN 'ferns'
    WHEN taxonKey IN ('35') THEN 'mosses'
    WHEN taxonKey IN ('95') THEN 'sacfungi'
    WHEN taxonKey IN ('34') THEN 'basidiomycota'
    ELSE 'other'
  END AS taxon_group,
  COUNT(*) AS occurrence_count,
  COUNT(DISTINCT speciesKey) AS distinct_species_count
FROM occurrence
WHERE countryCode IN ('BW', 'CO', 'DK', 'AU')
GROUP BY 
  CASE 
    WHEN classKey IN ('359') THEN 'mammals'
    WHEN classKey IN ('212') THEN 'birds'
    WHEN famillyKey IN ('1103', '1104', '494', '495', '1105', '496', '497', '1106', '498', '499', '1107', '537', '538', '1153', '547', '1162', '548', '549', '550', '1163', '1164', '1165', '1166', '1167', '1305', '1067', '1306', '1307', '1308', '1068', '1069', '587', '1310', '588', '589', '1311', '1312', '1313', '590', '708', '890', '774', '889', '773', '772', '888', '765', '879') THEN 'bonyfish'
    WHEN classKey IN ('131') THEN 'amphibians'
    WHEN classKey IN ('216') THEN 'insects'
    WHEN classKey IN ('11418114', '11569602', '11592253', '11493978') THEN 'reptiles'
    WHEN phylumKey IN ('52') THEN 'molluscs'
    WHEN classKey IN ('367') THEN 'arachnids'
    WHEN taxonKey IN ('220', '196') THEN 'floweringplants'
    WHEN taxonKey IN ('194', '244', '228', '282') THEN 'gymnosperms'
    WHEN taxonKey IN ('7228684', '246', '7228682', '7219203') THEN 'ferns'
    WHEN taxonKey IN ('35') THEN 'mosses'
    WHEN taxonKey IN ('95') THEN 'sacfungi'
    WHEN taxonKey IN ('34') THEN 'basidiomycota'
    ELSE 'other'
  END
ORDER BY occurrence_count DESC;
"



