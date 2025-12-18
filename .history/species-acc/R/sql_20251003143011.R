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
  AND countryCode='BW'
  AND basisOfRecord != 'FOSSIL_SPECIMEN'
  AND taxonrank = 'SPECIES'
GROUP BY 
speciesKey,
scientificname, 
\"year\";
"

occ_download_sql(sql)

# '0042890-250920141307145' # AU 

d <- occ_download_get('0042890-250920141307145') %>%       
  occ_download_import()

dd <- d |> 
    arrange(year) |>
    mutate(cumulative_species_count = cumsum(!duplicated(specieskey))) |>
    group_by(year) |>
    summarise(cumulative_species_count = max(cumulative_species_count, na.rm = TRUE),
    occ_count = sum(occ_count)) |>
    ungroup() 


p <- ggplot(dd, aes(x = year, y = cumulative_species_count)) +
  geom_line(color = "#E27B72") +
  geom_point(aes(size=occ_count), shape=1, color = "#E27B72") +
  geom_point(size=0.5, color = "#E27B72") +
  scale_size_continuous(labels = scales::unit_format(unit = "M", scale = 1e-6), name = "occ/yr") +
  scale_y_continuous(labels = scales::comma) +
  labs(x = "", y = "cumulative species counts") +
  theme_minimal() +
  theme(legend.position = "top", 
        legend.text = element_text(size = 12),
        legend.title = element_text(size = 12),
        axis.text = element_text(size = 12),
        axis.title = element_text(size = 12)) 

# ggsave("species-acc/plots/AU-sp-acc.png", p, width = 10, height = 6, units = "in")

