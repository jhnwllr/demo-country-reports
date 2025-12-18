
library(dggridR)
library(collapse)

create_latlon_grid <- function(resolution = 1) {
  # Latitude ranges from -90 to 90
  lat_seq <- seq(-90, 90, by = resolution)
  # Longitude ranges from -180 to 180
  lon_seq <- seq(-180, 180, by = resolution)
  # Create all combinations
  grid <- expand.grid(lat = lat_seq, lon = lon_seq)
  return(grid)
}

grid_points <- create_latlon_grid(1)  # 1 degree resolution
dggs <- dgconstruct(precision=7)
grid_points$cell <- dgGEO_to_SEQNUM(dggs, grid_points$lon, grid_points$lat)$seqnum
tibble::as_tibble(dgSEQNUM_to_GEO(dggs,grid_points$cell)) |> unique()

