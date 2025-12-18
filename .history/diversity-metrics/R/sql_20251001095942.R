
library(dplyr)
library(sf)
library(ggplot2)
library(rgbif)
library(vegan)  # for rarefy() function

# Bias corrected diversity metrics from abundance data
# ES50 (Expected Species at 50 individuals) ISEA3H map
# ES50 analysis for community metrics - requires abundance data for rarefaction
# 

sql <-
"
SELECT
  level0gid,
  GBIF_ISEA3HCode(
    9, 
    decimalLatitude,
    decimalLongitude,
    COALESCE(coordinateUncertaintyInMeters, 1000)
  ) AS geogrid_id,
  speciesKey,
  COUNT(*) AS n_records
FROM occurrence
WHERE level0gid='AUS'
AND coordinateUncertaintyInMeters <= 2000
AND hasGeospatialIssues = FALSE
AND hasCoordinate = TRUE
AND occurrenceStatus = 'PRESENT'
GROUP BY level0gid, geogrid_id, speciesKey;
"


# occ_download_sql(sql)

# d <- occ_download_get('YOUR_DOWNLOAD_ID_HERE') %>% 
#     occ_download_import() |>   
#     mutate(geogrid_id = as.character(geogrid_id)) 

# Calculate ES50 for each grid cell
# calculate_es50 <- function(abundance_vector) {
#   total_individuals <- sum(abundance_vector)
#   if (total_individuals < 50) {
#     return(NA)  # Not enough individuals for ES50
#   }
#   # Use vegan's rarefy function to calculate expected species at n=50
#   es50 <- rarefy(abundance_vector, sample = 50)
#   return(es50)
# }

# # Create community matrix (grid cells × species)
# community_matrix <- d %>%
#   select(geogrid_id, speciesKey, abundance) %>%
#   pivot_wider(names_from = speciesKey, values_from = abundance, values_fill = 0) %>%
#   column_to_rownames("geogrid_id")

# # Calculate ES50 for each grid cell
# es50_results <- community_matrix %>%
#   rowwise() %>%
#   mutate(
#     total_individuals = sum(c_across(everything())),
#     es50 = if_else(total_individuals >= 50, 
#                    rarefy(c_across(everything()), sample = 50),
#                    NA_real_)
#   ) %>%
#   select(es50, total_individuals) %>%
#   rownames_to_column("geogrid_id")

# make sure to use the correct resolution shapefile
# sf_obj <- st_read("data/ISEA3H-shapefiles/resolution-9/")

# dd <- merge(sf_obj, es50_results, by = "geogrid_id") 

# p <- ggplot() +
#   geom_sf(data = dd, aes(fill = es50)) +
#   scale_fill_viridis_c(
#     name = "ES50",
#     limits = c(0, 50), 
#     oob = scales::squish,   # squish values outside into the nearest limit
#     na.value = "grey90"     # color for grid cells with <50 individuals
#   ) +
#   theme_minimal() +
#   labs(title = "Expected Species Richness at 50 Individuals (ES50)")

# ggsave(p, filename = "es50/plots/ES50_map.png", width = 12, height = 8, dpi = 900)