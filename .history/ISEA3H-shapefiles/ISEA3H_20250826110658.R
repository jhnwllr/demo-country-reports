
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
create_shapefile(res = 2)
create_shapefile(res = 3)
create_shapefile(res = 4)
create_shapefile(res = 5) 
create_shapefile(res = 6)
create_shapefile(res = 7)
create_shapefile(res = 8)
create_shapefile(res = 9)
# create_shapefile(res = 10)



# R code for README.md

library(rgbif)
library(sf)
library(dplyr)
library(ggplot2)

sql <-
"
SELECT 
  GBIF_ISEA3HCode(
    6, 
    decimalLatitude,
    decimalLongitude,
    COALESCE(coordinateUncertaintyInMeters, 1000) 
  ) AS geogrid_id,
  COUNT(DISTINCT speciesKey) AS unique_species_count
FROM
  occurrence
  WHERE hasCoordinate = TRUE
  AND (coordinateUncertaintyInMeters <= 1000 OR coordinateUncertaintyInMeters IS NULL)
  AND speciesKey IS NOT NULL
  AND NOT ARRAY_CONTAINS(issue, 'ZERO_COORDINATE')
  AND NOT ARRAY_CONTAINS(issue, 'COORDINATE_OUT_OF_RANGE')
  AND NOT ARRAY_CONTAINS(issue, 'COORDINATE_INVALID')
  AND NOT ARRAY_CONTAINS(issue, 'COUNTRY_COORDINATE_MISMATCH')
GROUP BY
  geogrid_id
"

occ_download_sql(sql) 

d <- occ_download_get('0045164-250811113504898') %>% 
    occ_download_import() |>
    mutate(geogrid_id = as.character(geogrid_id)) 

sf_obj <- st_read("ISEA3H-shapefiles/resolution-6/")
sf_obj |> glimpse()

dd <- merge(sf_obj, d, by = "geogrid_id") |> glimpse()

p <- ggplot() +
geom_sf(data=dd, aes(fill = unique_species_count)) +
scale_fill_viridis_c() +
theme_minimal()


ggsave(p, filename = "ISEA3H-shapefiles/grid_plot.svg", width = 12, height = 8)


# generate table 

library(purrr)
library(dplyr)

1:9 %>% 
paste0("ISEA3H-shapefiles/resolution-",.,"/") |> 
map_dbl(~ nrow(sf::st_read(.x))) %>%
tibble(resolution = 1:9, n_cells = .) |>
knitr::kable()



# example grid 
library(ggplot2)
sf_obj <- sf::st_read("ISEA3H-shapefiles/resolution-6/")

p <- ggplot() +
geom_sf(data=sf_obj) +
theme_minimal()

ggsave(p, filename = "ISEA3H-shapefiles/grid_6.svg", width = 12, height = 8)


