

library(dplyr)
library(sf)
library(ggplot2)
library(rgbif)

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
WHERE level0gid='COL'
AND coordinateUncertaintyInMeters <= 2000
GROUP BY level0gid, geogrid_id;
"

# occ_download_sql(sql)

# '0032846-250920141307145' # COL
key <- "0043286-250920141307145" # DK 
cutoff <- 10000

d <- occ_download_get(key) %>% 
    occ_download_import() |>   
    mutate(geogrid_id = as.character(geogrid_id)) 

# make sure to use the correct resolution shapefile
sf_obj <- st_read("data/ISEA3H-shapefiles/resolution-9/")

dd <- merge(sf_obj, d, by = "geogrid_id") 

p <- ggplot() +
  geom_sf(data = dd, aes(fill = unique_species_count)) +
  scale_fill_viridis_c(
    name = NULL,
    limits = c(0, cutoff), 
    oob = scales::squish,   # squish values outside into the nearest limit
    labels = function(x) ifelse(x == cutoff, "<5K", paste0(x/1000, "K"))
  ) +
  theme_minimal() +
  theme(
    panel.grid = element_blank(),        # Remove all grid lines
    legend.position = c(0.5, 0.05),      # Move legend inside plot at bottom center
    legend.direction = "horizontal",     # Keep legend horizontal
    legend.text = element_text(size = 12), # Make legend text larger
    legend.key.width = unit(2, "cm"),    # Make legend keys wider
    legend.key.height = unit(0.5, "cm"),  # Make legend keys taller
    plot.margin = margin(0, 0, 0, 0, "cm"), # Remove plot margins
    axis.title.x = element_blank(),      # Remove x axis label
    axis.title.y = element_blank(),      # Remove y axis label
    axis.text.x = element_blank(),       # Remove x axis tick labels
    axis.text.y = element_blank()        # Remove y axis tick labels
  ) 

# ggsave(p, filename = "species-count-maps/plots/grid_plot.svg", width = 12, height = 8)
# ggsave(p, filename = "species-count-maps/plots/AU-sp-counts.png", width = 12, height = 8,dpi=900)
# ggsave(p, filename = "species-count-maps/plots/CO-sp-counts.png", width = 12, height = 8,dpi=900)
ggsave(p, filename = "species-count-maps/plots/DK-sp-counts.png", width = 12, height = 8,dpi=900)



