library(rgbif)
library(dplyr)
library(ggplot2)
library(purrr)

sql <- '
SELECT 
    "year", 
    speciesKey,
    COUNT(*) AS occ_count
FROM occurrence
WHERE "year" > 1969 AND "year" < 2025
  AND hasCoordinate = TRUE
  AND speciesKey IS NOT NULL
  AND countryCode=\'AU\'
GROUP BY 
speciesKey, 
"year";
')


