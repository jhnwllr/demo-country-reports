
library(dplyr)
library(sf)
library(ggplot2)
library(rgbif)

# GB insect species count ISEA3H map
# botswana country code = 'BW'
# great britann country code = 'GB'
# Columbia country code = 'CO'
# Australia country code = 'AU'
# Guatemala country code = 'GT'
# France country code = 'FR'

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
WHERE level0gid='AUS'
AND coordinateUncertaintyInMeters <= 2000
GROUP BY level0gid, geogrid_id;
"

# occ_download_sql(sql)

d <- occ_download_get('0032846-250920141307145') %>% 
    occ_download_import() |>   
    mutate(geogrid_id = as.character(geogrid_id)) 

# make sure to use the correct resolution shapefile
sf_obj <- st_read("data/ISEA3H-shapefiles/resolution-9/")

dd <- merge(sf_obj, d, by = "geogrid_id") 

p <- ggplot() +
  geom_sf(data = dd, aes(fill = unique_species_count)) +
  scale_fill_viridis_c(
    limits = c(0, 5000), 
    oob = scales::squish   # squish values outside into the nearest limit
  ) +
  theme_minimal() +
  labs(title = "Expected Species Richness based on chao1")


# ggsave(p, filename = "species-count-maps/plots/grid_plot.svg", width = 12, height = 8)
ggsave(p, filename = "species-count-maps/plots/AU.png", width = 12, height = 8,dpi=900)

