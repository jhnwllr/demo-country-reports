# ======================================================
# TOPOGRAPHIC MAP OF A COUNTRY IN R (FIXED VERSION)
# ======================================================

# ---- 1. Install and load required packages ----
# install.packages(c("sf", "rnaturalearth", "rnaturalearthdata",
#                    "elevatr", "terra", "ggplot2"))

library(sf)
library(rnaturalearth)
library(rnaturalearthdata)
library(elevatr)
library(terra)
library(ggplot2)
library(metR)


# ---- 2. Select country ----
country_name <- "Denmark"  # <-- Change this to any country

# ---- 3. Get country boundary ----
country <- ne_countries(scale = "medium",
                        country = country_name,
                        returnclass = "sf")

# Check geometry
plot(st_geometry(country))

# ---- 4. Get elevation data (no coercion error) ----
# Directly use the sf polygon as input to get_elev_raster()
elev <- get_elev_raster(locations = country,
                        z = 7,        # adjust resolution (6–10)
                        clip = "locations")

# Convert to SpatRaster
elev_terra <- rast(elev)

# ---- 5. Clip elevation raster to country boundary ----
country_terra <- vect(country)
elev_crop <- crop(elev_terra, country_terra)
elev_mask <- mask(elev_crop, country_terra)

# ---- 6. Convert to data frame for ggplot ----
elev_df <- as.data.frame(elev_mask, xy = TRUE)
names(elev_df) <- c("x", "y", "elevation")

# ---- 7. Compute hillshade for terrain relief ----
slope <- terrain(elev_mask, v = "slope", unit = "radians")
aspect <- terrain(elev_mask, v = "aspect", unit = "radians")
hillshade <- shade(slope, aspect, angle = 45, direction = 315)

hill_df <- as.data.frame(hillshade, xy = TRUE)
names(hill_df) <- c("x", "y", "hill")

# ---- 8. Plot with ggplot ----
ggplot() +
  geom_raster(data = hill_df, aes(x = x, y = y, alpha = hill)) +
  geom_raster(data = elev_df, aes(x = x, y = y, fill = elevation), alpha = 0.8) +
  scale_alpha(range = c(0.3, 0.8), guide = "none") +
  geom_sf(data = country, fill = NA, color = "black", size = 0.4) +
  coord_sf() +
  labs(title = paste("Topographic Map of", country_name)) +
  theme_minimal() +
  theme(
    legend.position = "right",
    panel.grid = element_blank(),
    axis.title = element_blank(),
    axis.text = element_blank()
  )

# ======================================================
# END OF SCRIPT
# ======================================================
