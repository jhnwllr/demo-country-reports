library(dplyr)
library(sf)
library(ggplot2)
library(rgbif)

# ES50 species count ISEA3H map
# ES50 analysis for community metrics

sql <- " 
SELECT
  level0gid,
  GBIF_ISEA3HCode(
    9, 
    decimalLatitude,
    decimalLongitude,
    COALESCE(coordinateUncertaintyInMeters, 1000)
  ) AS geogrid_id,
  COUNT(DISTINCT speciesKey) AS unique_species_count
FROM occurrence
WHERE level0gid='ESP'
AND coordinateUncertaintyInMeters <= 2000
GROUP BY level0gid, geogrid_id;
"

# occ_download_sql(sql)

# d <- occ_download_get('YOUR_DOWNLOAD_ID_HERE') %>% 
#     occ_download_import() |>   
#     mutate(geogrid_id = as.character(geogrid_id)) 

# make sure to use the correct resolution shapefile
# sf_obj <- st_read("data/ISEA3H-shapefiles/resolution-9/")

# dd <- merge(sf_obj, d, by = "geogrid_id") 

# p <- ggplot() +
#   geom_sf(data = dd, aes(fill = unique_species_count)) +
#   scale_fill_viridis_c(
#     limits = c(0, 5000), 
#     oob = scales::squish   # squish values outside into the nearest limit
#   ) +
#   theme_minimal()

# ggsave(p, filename = "es50/plots/ES50.png", width = 12, height = 8, dpi = 900)