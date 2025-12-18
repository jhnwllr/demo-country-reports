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
  AND countryCode IS NOT NULL
  AND classKey = 131
  AND basisOfRecord != 'FOSSIL_SPECIMEN'
  AND taxonrank = 'SPECIES'
  AND datasetkey != '6ac3f774-d9fb-4796-b3e9-92bf6c81c084'
GROUP BY 
speciesKey,
scientificname, 
\"year\",
countrycode;
"


