
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

res <- 7  # 1 degree resolution
grid_points <- create_latlon_grid(1)  # 1 degree resolution
dggs <- dgconstruct(precision=res)

grid_points$cell <- dgGEO_to_SEQNUM(dggs, grid_points$lon, grid_points$lat)$seqnum
grid_points <- unique(tibble::as_tibble(grid_points))

cellcenters   <- dgSEQNUM_to_GEO(dggs,dgquakes$cell)


# paste(res,grid_points$lat,grid_points$lon,sep=" ")


args <- "1 41.5 6.5"  # Example arguments

jar_path <- "ISEA3H-shapefiles/geogrid-demo-1.0-SNAPSHOT.jar"
cmd <- paste("java -jar", jar_path, args)
system(cmd)
output <- system(cmd, intern = TRUE)

