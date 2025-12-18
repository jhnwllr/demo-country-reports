library(dggridR)

# Set up a grid with your desired resolution (e.g., resolution = 6)
dggs <- dgconstruct(res = 6)

# Get all cell centroids for the grid at this resolution
centroids <- dgcellstogrid(dggs, cells = dggetallcells(dggs, res = 6), frame = "centers")

# Extract latitude and longitude columns
lat_lon_centroids <- centroids[, c("lat_deg", "lon_deg")]

# View the result
print(lat_lon_centroids)