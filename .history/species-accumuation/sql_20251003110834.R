library(rgbif)
library(dplyr)
library(ggplot2)
library(purrr)

occ_download_sql('
SELECT 
    "year", 
    countrycode,
    speciesKey,
    COUNT(*) AS occ_count
FROM occurrence
WHERE "year" > 1969 AND "year" < 2025
  AND hasCoordinate = TRUE
  AND speciesKey IS NOT NULL
  AND countryCode="AU"
GROUP BY 
speciesKey, 
"year",
countrycode;
')


