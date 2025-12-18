# ======================================================
# TOPOGRAPHIC MAP OF A COUNTRY IN R
# ======================================================

# ---- 1. Install and load required packages ----
# (uncomment install.packages() lines if needed)
# install.packages(c("sf", "rnaturalearth", "rnaturalearthdata",
#                    "elevatr", "terra", "ggplot2"))

library(sf)
library(rnaturalearth)
library(rnaturalearthdata)
library(elevatr)
library(terra)
library(ggplot2)

# ---- 2. Select country ----
country_name <- "Denmark"  # <-- Change this to any country

# ---- 3. Get country boundary ----
country <- ne_countries(scale = "medium",
                        country = country_name,
                        returnclass = "sf")

# Check country geometry
plot(st_geometry(country))

# ---- 4. Get bounding box and download elevation ----
bbox <- st_bbox(country)

# Download elevation data (adjust z for resolution: 6–9 typical)
elev <- get_elev_raster(locations = as.data.frame(t(bbox)),
                        z = 7,      # resolution (higher = finer)
                        clip = "bbox")

# Convert to SpatRaster
elev_terra <- rast(elev)

# ---- 5. Clip elevation raster to country boundary ----
country_terra <- vect(country)
elev_crop <- crop(elev_terra, country_terra)
elev_mask <- mask(elev_crop, country_terra)

# ---- 6. Convert to data frame for ggplot ----
elev_df <- as.data.frame(elev_mask, xy = TRUE)
names(elev_df) <- c("x", "y", "elevation")

# ---- 7. Compute hillshade for 3D relief effect ----
slope <- terrain(elev_mask, v = "slope", unit = "radians")
aspect <- terrain(elev_mask, v = "aspect", unit = "radians")
hillshade <- shade(slope, aspect, angle = 45, direction = 315)

hill_df <- as.data.frame(hillshade, xy = TRUE)
names(hill_df) <- c("x", "y", "hill")

# ---- 8. Plot map with ggplot2 ----
ggplot() +
  geom_raster(data = hill_df, aes(x = x, y = y, alpha = hill)) +
  geom_raster(data = elev_df, aes(x = x, y = y, fill = elevation), alpha = 0.8) +
