library(dplyr)
library(sf)
library(ggplot2)
library(rgbif)

dl_count_map <- function(cc = "BW") { 

# Map country codes to GADM level0gid codes
country_mapping <- list(
  "BW" = "BWA",  # Botswana
  "CO" = "COL",  # Colombia
  "DK" = "DNK",  # Denmark
  "AU" = "AUS"   # Australia
)

# Get GADM code for the country
gadm_code <- country_mapping[[cc]]
if (is.null(gadm_code)) {
  stop(paste("Country code", cc, "not found in mapping"))
}

sql <- paste0(" 
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
WHERE level0gid='", gadm_code, "'
AND coordinateUncertaintyInMeters <= 2000
GROUP BY level0gid, geogrid_id;
")

occ_download_sql(sql)
}

make_sp_map <- function(
cc,
key, 
cutoff = 5000,
cutoff_label = ">5K",
plot_expand = 0.2
) {

key_list <- list(
"BW" = "0057676-250920141307145",
"CO" = "0053960-250920141307145",
"DK" = "0043286-250920141307145"
)

key <- key_list[[cc]]

d <- occ_download_get(key) %>% 
    occ_download_import() |>   
    mutate(geogrid_id = as.character(geogrid_id)) 

# make sure to use the correct resolution shapefile
sf_obj <- st_read("data/ISEA3H-shapefiles/resolution-9/")

dd <- merge(sf_obj, d, by = "geogrid_id") 

# Calculate bounding box with buffer
bbox <- st_bbox(dd)
buffer_x <- (bbox["xmax"] - bbox["xmin"]) * plot_expand
buffer_y <- (bbox["ymax"] - bbox["ymin"]) * plot_expand

p <- ggplot() +
  geom_sf(data = dd, aes(fill = unique_species_count)) +
  coord_sf(
    xlim = c(bbox["xmin"] - buffer_x, bbox["xmax"] + buffer_x),
    ylim = c(bbox["ymin"] - buffer_y, bbox["ymax"] + buffer_y),
    expand = FALSE, 
    clip = "off"
  ) +
  scale_fill_viridis_c(
    name = NULL,
    limits = c(0, cutoff), 
    oob = scales::squish,   # squish values outside into the nearest limit
    labels = function(x) ifelse(x == cutoff, cutoff_label, paste0(x/1000, "K"))
  ) +
  theme_minimal() +
  theme(
    panel.grid = element_blank(),        # Remove all grid lines
    legend.position = c(0.5, 0.1),      # Move legend inside plot at bottom center
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

ggsave(p, filename = paste0("species-count-maps/plots/",cc,"-sp-counts.png"), width = 12, height = 8,dpi=900)

}

dl_count_map("BW")













