
library(dggridR)
library(collapse)

dggs <- dgconstruct(precision=7)

dggs
#Load included test data set
# data(dgquakes)

# #Get the corresponding grid cells for each earthquake epicenter (lat-long pair)
dgquakes$cell <- dgGEO_to_SEQNUM(dggs, dgquakes$lon, dgquakes$lat)$seqnum

# #Get the number of earthquakes in each equally-sized cell
# quakecounts   <- dgquakes |> fcount(cell)