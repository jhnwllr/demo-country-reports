
library(dggridR)
library(collapse)
library(purrr)


create_latlon_grid <- function(resolution = 1) {
  lat_seq <- seq(-90, 90, by = resolution)
  lon_seq <- seq(-180, 180, by = resolution)
  grid <- expand.grid(lat = lat_seq, lon = lon_seq)
  return(grid)
}

create_shapefile <- function(res = NULL) { 

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

dir_path <- paste0("ISEA3H-shapefiles/resolution-",res,"/")
if (!dir.exists(dir_path)) {
  dir.create(dir_path)
} 

file_name <- paste0(dir_path,"ISEA3H-",res,".shp")

st_write(wrapped_grid, file_name, delete_layer = TRUE)
}


# create the shapefiles up to resolution 10
# You can run this to create higher resolution grids if needed

create_shapefile(res = 1)


# Plot some of the grids for README

library(sf)
library(dplyr)
library(ggplot2)

sf::sf_use_s2(FALSE)


sf_obj <- resolution_1 <- st_read("ISEA3H-shapefiles/resolution-1/ISEA3H-1.shp")
sf_obj |> glimpse()

p <- ggplot() +
geom_sf(data=sf_obj) +
coord_sf(datum = NA)

scale_x_continuous(name = "Longitude",
                    breaks = seq(-180, 180, 60)) +
scale_y_continuous(name = "Latitude",
                    breaks = seq(-90, 90, 30))

+ 
labs(y = "Latitude", x = "Longitude") +
theme(
    axis.text.y = element_text(size = 12, margin = margin(r = 10)),
    axis.title.y = element_text(size = 14, margin = margin(r = 15)),
    plot.margin = margin(1, 1, 1, 2, "cm")
  ) +
theme(plot.margin = margin(1, 1, 1, 2, "cm")) # left margin increased

ggsave(p, filename = "ISEA3H-shapefiles/grid_plot.svg")
