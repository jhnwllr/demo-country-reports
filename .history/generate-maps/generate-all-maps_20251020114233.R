library(dplyr)
library(sf)
library(ggplot2)
library(rgbif)
library(rnaturalearth)
library(rnaturalearthdata)
library(elevatr)
library(terra)

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
AND kingdomKey IN (1, 6) -- Animals and Plants only
AND coordinateUncertaintyInMeters <= 2000
AND hasGeospatialIssues = FALSE
AND hasCoordinate = TRUE
AND occurrenceStatus = 'PRESENT'
GROUP BY level0gid, geogrid_id;
")

occ_download_sql(sql)
}

make_sp_map <- function(
cc,
cutoff = 5000,
cutoff_label = ">5K",
plot_expand = 0.2
) {

key_list <- list(
"BW" = "0041734-251009101135966",
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

# Create extent for base map
extent_bbox <- st_bbox(c(
  xmin = bbox["xmin"] - buffer_x,
  xmax = bbox["xmax"] + buffer_x,
  ymin = bbox["ymin"] - buffer_y,
  ymax = bbox["ymax"] + buffer_y
))

# Get base map data
countries <- ne_countries(scale = "medium", returnclass = "sf")
coastlines <- ne_coastline(scale = "medium", returnclass = "sf")

# Crop base map to extent
countries_cropped <- st_crop(countries, extent_bbox)
coastlines_cropped <- st_crop(coastlines, extent_bbox)

# Get elevation data
elevation_raster <- get_elev_raster(
  locations = st_as_sfc(extent_bbox, crs = 4326),
  z = 6,
  clip = "bbox"
)

# Convert elevation to dataframe for ggplot
elevation_df <- as.data.frame(elevation_raster, xy = TRUE, na.rm = TRUE)
names(elevation_df) <- c("x", "y", "elevation")

p <- ggplot() +
  # Add elevation as base layer
  geom_raster(data = elevation_df, aes(x = x, y = y, fill = elevation), alpha = 0.6) +
  scale_fill_gradient2(
    low = "darkblue", mid = "lightgray", high = "darkred",
    midpoint = median(elevation_df$elevation, na.rm = TRUE),
    name = "Elevation (m)",
    guide = "none"  # Hide elevation legend
  ) +
  # Add country boundaries
  geom_sf(data = countries_cropped, fill = NA, color = "gray30", size = 0.3) +
  # Add coastlines
  geom_sf(data = coastlines_cropped, color = "gray50", size = 0.2) +
  # Add species richness data
  geom_sf(data = dd, aes(fill = after_scale(alpha(..fill.., 0.8))), 
          color = NA) +
  coord_sf(
    xlim = c(bbox["xmin"] - buffer_x, bbox["xmax"] + buffer_x),
    ylim = c(bbox["ymin"] - buffer_y, bbox["ymax"] + buffer_y),
    expand = FALSE, 
    clip = "off"
  ) +
  scale_fill_viridis_c(
    name = NULL,
    limits = c(0, cutoff), 
    oob = scales::squish,
    labels = function(x) ifelse(x == cutoff, cutoff_label, paste0(x/1000, "K"))
  ) +
  theme_minimal() +
  theme(
    panel.grid = element_blank(),
    legend.position = c(0.5, 0.1),
    legend.direction = "horizontal",
    legend.text = element_text(size = 12),
    legend.key.width = unit(2, "cm"),
    legend.key.height = unit(0.5, "cm"),
    plot.margin = margin(0, 0, 0, 0, "cm"),
    axis.title.x = element_blank(),
    axis.title.y = element_blank(),
    axis.text.x = element_blank(),
    axis.text.y = element_blank()
  ) 
filename <- paste0("country-reports-demo-ui/data/images/",cc,"-species-richness.png")
print(filename)
ggsave(p, filename = filename, width = 12, height = 8,dpi=600)

}


dl_chao1_map <- function (cc = "CO") {

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

sql <-
paste0("
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
WHERE level0gid=",gadm_code,"
AND coordinateUncertaintyInMeters <= 2000
AND hasGeospatialIssues = FALSE
AND hasCoordinate = TRUE
AND occurrenceStatus = 'PRESENT'
GROUP BY level0gid, geogrid_id, speciesKey;
") 

occ_download_sql(sql)
}


make_chao1_map <- function(
    cc="CO",
    cutoff = 5000,
    plot_expand = 0.2,
    cutoff_label = ">5K"
    ) {

# Check if chao1_results file exists, if not generate it
chao1_file <- paste0("diversity-metrics/chao1_results_", cc, ".rda")

if (file.exists(chao1_file)) {
  # Load existing chao1_results
  load(chao1_file)
} else {
    key_list <- list(
    "CO" = "0054037-250920141307145",
    "DK" = "0053432-250920141307145" # DK 
    )

    key <- key_list[[cc]]

  # Generate chao1_results
  d <- occ_download_get(key) %>% 
      occ_download_import() |>   
      mutate(geogrid_id = as.character(geogrid_id)) 

  # Calculate Chao1 for each grid cell
  calculate_chao1 <- function(abundance_vector) {
    # Remove zero abundances
    abundance_vector <- abundance_vector[abundance_vector > 0]
    
    if (length(abundance_vector) < 2) {
      return(NA)  # Need at least 2 species for Chao1
    }
    
    # Use vegan's estimateR function to calculate Chao1
    chao1_result <- estimateR(abundance_vector)
    return(chao1_result["S.chao1"])
  }

  community_matrix <- d %>%
    select(geogrid_id, specieskey, n_records) %>%
    tidyr::pivot_wider(names_from = specieskey, values_from = n_records, values_fill = 0) %>%
    tibble::column_to_rownames("geogrid_id")


  # Calculate Chao1 for each grid cell
  chao1_results <- community_matrix %>% 
    tibble::rownames_to_column("geogrid_id") %>%  # Convert rownames to column first
    rowwise() %>%
    mutate(
      observed_species = sum(c_across(-geogrid_id) > 0),      # Exclude geogrid_id from calculations
      total_individuals = sum(c_across(-geogrid_id)),
      chao1 = calculate_chao1(c_across(-geogrid_id))
    ) %>%
    select(geogrid_id, observed_species, total_individuals, chao1)

  # Save chao1_results to RDA file
  save(chao1_results, file = chao1_file)
}

# make sure to use the correct resolution shapefile
sf_obj <- sf::st_read("data/ISEA3H-shapefiles/resolution-9/")

dd <- merge(sf_obj, chao1_results, by = "geogrid_id") 

# Calculate bounding box with buffer
bbox <- st_bbox(dd)
buffer_x <- (bbox["xmax"] - bbox["xmin"]) * plot_expand
buffer_y <- (bbox["ymax"] - bbox["ymin"]) * plot_expand

# Create extent for base map
extent_bbox <- st_bbox(c(
  xmin = bbox["xmin"] - buffer_x,
  xmax = bbox["xmax"] + buffer_x,
  ymin = bbox["ymin"] - buffer_y,
  ymax = bbox["ymax"] + buffer_y
))

# Get base map data
countries <- ne_countries(scale = "medium", returnclass = "sf")
coastlines <- ne_coastline(scale = "medium", returnclass = "sf")

# Crop base map to extent
countries_cropped <- st_crop(countries, extent_bbox)
coastlines_cropped <- st_crop(coastlines, extent_bbox)

# Get elevation data
elevation_raster <- get_elev_raster(
  locations = st_as_sfc(extent_bbox, crs = 4326),
  z = 6,
  clip = "bbox"
)

# Convert elevation to dataframe for ggplot
elevation_df <- as.data.frame(elevation_raster, xy = TRUE, na.rm = TRUE)
names(elevation_df) <- c("x", "y", "elevation")

p <- ggplot() +
  # Add elevation as base layer
  geom_raster(data = elevation_df, aes(x = x, y = y, fill = elevation), alpha = 0.6) +
  scale_fill_gradient2(
    low = "darkblue", mid = "lightgray", high = "darkred",
    midpoint = median(elevation_df$elevation, na.rm = TRUE),
    name = "Elevation (m)",
    guide = "none"  # Hide elevation legend
  ) +
  # Add country boundaries
  geom_sf(data = countries_cropped, fill = NA, color = "gray30", size = 0.3) +
  # Add coastlines
  geom_sf(data = coastlines_cropped, color = "gray50", size = 0.2) +
  # Add Chao1 data
  geom_sf(data = dd, aes(fill = after_scale(alpha(..fill.., 0.8))), 
          color = NA) +
  coord_sf(
    xlim = c(bbox["xmin"] - buffer_x, bbox["xmax"] + buffer_x),
    ylim = c(bbox["ymin"] - buffer_y, bbox["ymax"] + buffer_y),
    expand = FALSE, 
    clip = "off"
  ) +
  scale_fill_viridis_c(
    name = NULL,
    limits = c(0, cutoff), 
    oob = scales::squish,
    labels = function(x) ifelse(x == cutoff, cutoff_label, paste0(x/1000, "K"))
  ) +
  theme_minimal() +
  theme(
    panel.grid = element_blank(),
    legend.position = c(0.5, 0.1),
    legend.direction = "horizontal",
    legend.text = element_text(size = 12),
    legend.key.width = unit(2, "cm"),
    legend.key.height = unit(0.5, "cm"),
    plot.margin = margin(0, 0, 0, 0, "cm"),
    axis.title.x = element_blank(),
    axis.title.y = element_blank(),
    axis.text.x = element_blank(),
    axis.text.y = element_blank()
  ) 

ggsave(p, filename = paste0("diversity-metrics/plots/",cc,"-chao1.png"), width = 12, height = 8, dpi = 900)

}

# dl_chao1_map("BW")

dl_count_map("BW")

make_sp_map(
"BW",
cutoff = 2000,
cutoff_label = ">2K",
plot_expand = 0.2
)

# make_chao1_map(
# "BW",
# cutoff = 2000,
# cutoff_label = ">2K",
# plot_expand = 0.2
# )












