
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

# plot(grid_points$lon, grid_points$lat, pch = 20, col = "blue",
    #  xlab = "Longitude", ylab = "Latitude", main = "Global Lat/Lon Grid")

dggs <- dgconstruct(precision=7)

#Load included test data set
data(dgquakes)

dgquakes
dgquakes$cell <- dgGEO_to_SEQNUM(dggs, grid_points$lon, grid_points$lat)$seqnum



# #Get the number of earthquakes in each equally-sized cell
# quakecounts   <- dgquakes |> fcount(cell)