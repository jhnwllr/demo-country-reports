library(dplyr)
library(sf)
library(ggplot2)
library(rnaturalearth)
library(rnaturalearthdata)
library(elevatr)
library(terra)

# Function to list available country codes
list_available_countries <- function() {
  countries <- ne_countries(scale = "medium", returnclass = "sf")
  
  # Create a dataframe with different country code fields
  country_info <- data.frame(
    NAME = countries$NAME,
    ISO_A2 = countries$ISO_A2,
    ISO_A2_EH = countries$ISO_A2_EH,
    WB_A2 = countries$WB_A2,
    stringsAsFactors = FALSE
  )
  
  # Remove rows with all NA values
  country_info <- country_info[!is.na(country_info$NAME), ]
  
  # Print the results
  print(country_info[order(country_info$NAME), ])
  
  return(country_info)
}

# Function to find country by partial name or code
find_country <- function(search_term) {
  countries <- ne_countries(scale = "medium", returnclass = "sf")
  
  # Search in multiple fields
  matches <- countries[
    grepl(search_term, countries$NAME, ignore.case = TRUE) |
    grepl(search_term, countries$ISO_A2, ignore.case = TRUE) |
    grepl(search_term, countries$ISO_A2_EH, ignore.case = TRUE) |
    grepl(search_term, countries$WB_A2, ignore.case = TRUE),
  ]
  
  if (nrow(matches) > 0) {
    result <- data.frame(
      NAME = matches$NAME,
      ISO_A2 = matches$ISO_A2,
      ISO_A2_EH = matches$ISO_A2_EH,
      WB_A2 = matches$WB_A2,
      stringsAsFactors = FALSE
    )
    print(result)
    return(result)
  } else {
    message("No matches found for:", search_term)
    return(data.frame())
  }
}

# Function to create topographic elevation maps by country code
create_elevation_map <- function(
  cc,
  zoom_level = 8,
  output_dir = "country-reports-demo-ui/data/images/",
  plot_expand = 0.1,
  width = 12,
  height = 8,
  dpi = 600
) {
  
  # Get country boundaries
  countries <- ne_countries(scale = "medium", returnclass = "sf")
  
  # Create a comprehensive search for the country
  country_boundary <- countries[
    countries$ISO_A2 == cc | 
    countries$ISO_A2_EH == cc | 
    countries$WB_A2 == cc |
    countries$ADM0_A3 == cc,
  ]
  
  if (nrow(country_boundary) == 0) {
    message("Searching for countries with partial match...")
    find_country(cc)
    stop(paste("Country code", cc, "not found. Use list_available_countries() to see all options."))
  }
  
  # If multiple matches, take the first one
  if (nrow(country_boundary) > 1) {
    country_boundary <- country_boundary[1, ]
    message("Multiple matches found, using first match")
  }
  
  # Get country name for title - try multiple name fields
  country_name <- ifelse(!is.na(country_boundary$NAME), 
                        country_boundary$NAME,
                        ifelse(!is.na(country_boundary$NAME_LONG),
                              country_boundary$NAME_LONG,
                              paste("Country", cc)))
  
  # Calculate bounding box with buffer
  bbox <- st_bbox(country_boundary)
  buffer_x <- (bbox["xmax"] - bbox["xmin"]) * plot_expand
  buffer_y <- (bbox["ymax"] - bbox["ymin"]) * plot_expand
  
  # Create extent for elevation data
  extent_bbox <- st_bbox(c(
    xmin = bbox["xmin"] - buffer_x,
    xmax = bbox["xmax"] + buffer_x,
    ymin = bbox["ymin"] - buffer_y,
    ymax = bbox["ymax"] + buffer_y
  ))
  
  # Get elevation data
  tryCatch({
    elevation_raster <- get_elev_raster(
      locations = st_as_sfc(extent_bbox, crs = 4326),
      z = zoom_level,
      clip = "bbox"
    )
    
    # Convert elevation to dataframe for ggplot
    elevation_df <- as.data.frame(elevation_raster, xy = TRUE, na.rm = TRUE)
    names(elevation_df) <- c("x", "y", "elevation")
    
    # Remove any remaining NAs
    elevation_df <- elevation_df[!is.na(elevation_df$elevation), ]
    
    if (nrow(elevation_df) == 0) {
      stop("No elevation data available for this region")
    }
    
  }, error = function(e) {
    stop(paste("Could not retrieve elevation data:", e$message))
  })
  
  # Get additional geographic features
  coastlines <- ne_coastline(scale = "medium", returnclass = "sf")
  rivers <- ne_download(scale = "medium", type = "rivers_lake_centerlines", returnclass = "sf")
  lakes <- ne_download(scale = "medium", type = "lakes", returnclass = "sf")
  
  # Crop features to extent
  coastlines_cropped <- st_crop(coastlines, extent_bbox)
  
  # Safely crop rivers and lakes with error handling
  rivers_cropped <- tryCatch({
    st_crop(rivers, extent_bbox)
  }, error = function(e) {
    data.frame() # Return empty dataframe if cropping fails
  })
  
  lakes_cropped <- tryCatch({
    st_crop(lakes, extent_bbox)
  }, error = function(e) {
    data.frame() # Return empty dataframe if cropping fails
  })
  
  # Create elevation breaks for better visualization
  elevation_range <- range(elevation_df$elevation, na.rm = TRUE)
  elevation_breaks <- seq(elevation_range[1], elevation_range[2], length.out = 10)
  
  # Create the topographic map
  p <- ggplot() +
    # Add elevation as base layer with terrain colors
    geom_raster(data = elevation_df, aes(x = x, y = y, fill = elevation)) +
    # Add country boundaries
    geom_sf(data = country_boundary, fill = NA, color = "black", linewidth = 1.0) +
    # Add coastlines
    geom_sf(data = coastlines_cropped, color = "navy", linewidth = 0.5) +
    # Add rivers if available
    {if(nrow(rivers_cropped) > 0) geom_sf(data = rivers_cropped, color = "lightblue", linewidth = 0.3)} +
    # Add lakes if available
    {if(nrow(lakes_cropped) > 0) geom_sf(data = lakes_cropped, fill = "lightblue", color = "blue", linewidth = 0.2)} +
    coord_sf(
      xlim = c(bbox["xmin"] - buffer_x, bbox["xmax"] + buffer_x),
      ylim = c(bbox["ymin"] - buffer_y, bbox["ymax"] + buffer_y),
      expand = FALSE,
      clip = "off"
    ) +
    scale_fill_gradientn(
      name = "Elevation (m)",
      colors = c("#2166ac", "#4393c3", "#92c5de", "#d1e5f0", 
                 "#f7f7f7", "#fdbf6f", "#ff7f00", "#d94701", "#a50f15"),
      values = scales::rescale(c(min(elevation_df$elevation), 
                               quantile(elevation_df$elevation, c(0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8)), 
                               max(elevation_df$elevation))),
      breaks = elevation_breaks,
      labels = function(x) paste0(round(x), "m"),
      na.value = "transparent"
    ) +
    labs(
      title = paste("Topographic Map -", country_name),
      subtitle = paste("Country Code:", cc, "| Zoom Level:", zoom_level)
    ) +
    theme_minimal() +
    theme(
      panel.grid = element_blank(),
      legend.position = "bottom",
      legend.direction = "horizontal",
      legend.text = element_text(size = 10),
      legend.title = element_text(size = 12),
      legend.key.width = unit(3, "cm"),
      legend.key.height = unit(0.5, "cm"),
      plot.title = element_text(size = 16, hjust = 0.5, face = "bold"),
      plot.subtitle = element_text(size = 12, hjust = 0.5),
      axis.title.x = element_blank(),
      axis.title.y = element_blank(),
      axis.text.x = element_blank(),
      axis.text.y = element_blank(),
      panel.background = element_rect(fill = "white", color = NA),
      plot.background = element_rect(fill = "white", color = NA)
    )
  
  # Save the map
  filename <- paste0(output_dir, cc, "-topographic.png")
  
  # Create output directory if it doesn't exist
  dir.create(dirname(filename), recursive = TRUE, showWarnings = FALSE)
  
  ggsave(p, filename = filename, width = width, height = height, dpi = dpi)
  
  message(paste("Topographic map saved:", filename))
  
  return(p)
}

# Function to create topographic maps for multiple countries
create_multiple_topographic_maps <- function(
  country_codes,
  zoom_level = 8,
  output_dir = "country-reports-demo-ui/data/images/",
  plot_expand = 0.1,
  width = 12,
  height = 8,
  dpi = 600
) {
  
  results <- list()
  
  for (cc in country_codes) {
    message(paste("Creating topographic map for:", cc))
    
    tryCatch({
      map <- create_elevation_map(
        cc = cc,
        zoom_level = zoom_level,
        output_dir = output_dir,
        plot_expand = plot_expand,
        width = width,
        height = height,
        dpi = dpi
      )
      results[[cc]] <- map
    }, error = function(e) {
      warning(paste("Failed to create map for", cc, ":", e$message))
      results[[cc]] <- NULL
    })
  }
  
  return(results)
}

# Debug functions - uncomment to use
# list_available_countries()
find_country("Denmark")
# find_country("Botswana")

# Example usage:
# First, let's see what codes are available
message("Listing available countries...")
list_available_countries()

# create_elevation_map("DK", zoom_level = 8)
# create_multiple_topographic_maps(c("BW", "CO", "DK", "AU"))

