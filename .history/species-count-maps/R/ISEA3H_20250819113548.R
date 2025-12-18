
library(dggridR)
library(sf)

# === 1) Pick the grid resolution (integer; higher = finer) ===
res <- 7  # e.g., 7–12 are common

# Build an ISEA aperture-3 hex grid system ("ISEA3H")
dggs <- dgconstruct(
  projection = "ISEA",
  aperture   = 3,
  topology   = "HEXAGON",
  res        = res,
  metric     = TRUE
)

# === 2) Define an area of interest (WGS84 lat/lon) ===
# Example: conterminous US bbox — replace with your own
minlat <- 24.7433195; minlon <- -124.7844079
maxlat <- 49.3457868; maxlon <-  -66.9513812

# cellsize controls search step (smaller = slower but more complete)
grid_sf <- dgrectgrid(
  dggs,
  minlat = minlat, minlon = minlon,
  maxlat = maxlat, maxlon = maxlon,
  cellsize = 0.05
)

# Ensure CRS + valid geometries before writing
st_crs(grid_sf) <- 4326
grid_sf <- st_make_valid(grid_sf)

# === 3) Write to Shapefile ===
out <- sprintf("ISEA3H_res%d.shp", res)
st_write(grid_sf, out, delete_dsn = TRUE)
cat("Wrote:", out, "\n")

sf::st_read("species-count-maps/data/isea3h-shapefile/")

