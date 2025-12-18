
library(dggridR)
library(collapse)
library(purrr)


create_latlon_grid <- function(resolution = 1) {
  lat_seq <- seq(-90, 90, by = resolution)
  lon_seq <- seq(-180, 180, by = resolution)
  grid <- expand.grid(lat = lat_seq, lon = lon_seq)
  return(grid)
}


create_shapfile <- function(res = NULL) { 

grid_points <- create_latlon_grid(0.1)  #
dggs <- dgconstruct(res=res)

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
glimpse() 

d <- d |>
mutate(geogrid_id = 
map_chr(paste(res, lat_c, lon_c, sep = " "), get_geogrid_id)) |>
glimpse()

grid <- dgcellstogrid(dggs,d$cell)
grid <- merge(grid,d,by.x="seqnum",by.y="cell")

wrapped_grid = st_wrap_dateline(grid, options = c("WRAPDATELINE=YES","DATELINEOFFSET=180"), quiet = TRUE)

dir_path <- paste0("resolution-",res,"/")
if (!dir.exists(dir_path)) {
  dir.create(dir_path)
} 

file_name <- paste0(dir_path,"ISEA3H-",res,".shp")

st_write(wrapped_grid, file_name, delete_layer = TRUE)
}

# library(ggplot2)
# p <- ggplot() +
# geom_sf(data=wrapped_grid) 
# ggsave(p, filename = "ISEA3H-shapefiles/grid_plot.svg")
