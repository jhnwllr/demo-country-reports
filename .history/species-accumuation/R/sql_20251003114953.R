library(rgbif)
library(dplyr)
library(ggplot2)
library(purrr)

sql <- "
SELECT 
    \"year\", 
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

# occ_download_sql(sql)

# d <- occ_download_get('0042890-250920141307145') %>%       
  # occ_download_import()

dd <- d |> 
    arrange(year) |>
    mutate(cumulative_species_count = cumsum(!duplicated(specieskey))) |>
    group_by(year) |>
    summarise(cumulative_species_count = max(cumulative_species_count, na.rm = TRUE),
    occ_count = sum(occ_count)) |>
    ungroup() 



p <- ggplot(dd, aes(x = year, y = cumulative_species_count)) +
  geom_line() +
  geom_point(aes(size=occ_count),shape=1) +
  geom_point(size=0.5) +
  theme_minimal() +
  theme(legend.position = "top") 

ggsave("plots/AU-sp-acc.svg", p, width = 10, height = 6, units = "in")

