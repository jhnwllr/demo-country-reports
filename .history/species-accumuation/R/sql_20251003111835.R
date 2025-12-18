library(rgbif)
library(dplyr)
library(ggplot2)
library(purrr)

sql <- "
SELECT 
    \"year\", 
    countrycode,
    speciesKey,
    scientificname,
    COUNT(*) AS occ_count
FROM occurrence
WHERE \"year\" > 1969 AND \"year\" < 2025
  AND hasCoordinate = TRUE
  AND hasgeospatialissues = FALSE
  AND speciesKey IS NOT NULL
  AND countryCode='AU'
  AND basisOfRecord != 'FOSSIL_SPECIMEN'
  AND taxonrank = 'SPECIES'
GROUP BY 
speciesKey,
scientificname, 
\"year\";
"

occ_download_sql(sql)

