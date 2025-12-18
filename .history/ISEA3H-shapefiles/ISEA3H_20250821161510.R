
library(dggridR)
library(collapse)
library(purrr)

create_latlon_grid <- function(resolution = 1) {
  # Latitude ranges from -90 to 90
  lat_seq <- seq(-90, 90, by = resolution)
  # Longitude ranges from -180 to 180
  lon_seq <- seq(-180, 180, by = resolution)
  # Create all combinations
  grid <- expand.grid(lat = lat_seq, lon = lon_seq)
  return(grid)
}

res <- 7  # 1 degree resolution
grid_points <- create_latlon_grid(1)  # 1 degree resolution
dggs <- dgconstruct(precision=res)

grid_points$cell <- dgGEO_to_SEQNUM(dggs, grid_points$lon, grid_points$lat)$seqnum

cellcenters <- dgSEQNUM_to_GEO(dggs,grid_points$cell)

get_geogrid_id <- function(args) {
jar_path <- "ISEA3H-shapefiles/geogrid-demo-1.0-SNAPSHOT.jar"
cmd <- paste("java -jar", jar_path, args)
output <- system(cmd, intern = TRUE)
output
}

d <- tibble::as_tibble(cbind(tibble::as_tibble(grid_points),tibble::as.tibble(cellcenters))) |> 
select(cell, lat_c = lat_deg, lon_c = lon_deg) |>
unique() |>
mutate(res = res) |>
mutate(geogrid_id = 
map_dbl(paste(res, lat_c, lon_c, sep = " "), get_geogrid_id)) |>
glimpse()



