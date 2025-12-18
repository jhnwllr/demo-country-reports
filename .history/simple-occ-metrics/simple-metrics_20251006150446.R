codes = c("AU", "BW", "CO", "DK") 

# export const countryData = {
#   name: "Denmark",
#   code: "DK",
#   totalOccurrences: "45.7 M",
#   publishedByCountry: "38.2 M published by Denmark",
#   datasets: "394",
#   organizations: "43 organizations in Denmark",
#   species: "89,234",
#   families: "4,567 families",
#   literatureCount: "67",
#   literatureTotal: "445 articles since 2008",
#   description: "Occurrence record data about Denmark. These can be published by institutions within Denmark or from publishers outside of Denmark.",
#   chartTitle: "Denmark Occurrence Records Over Time"
# };


cc="AU"

name = enumeration_country() |> filter(iso2==cc) |> pull(title)
totalOccurrences = paste0(round(rgbif::occ_count(country=cc) / 1000000, 1), " M")
publishedByCountry = paste0(round(rgbif::occ_count(country = cc, publishingCountry=cc) / 1000000, 1), " M published by ", name)
datasets = rgbif::dataset_search(publishingCountry = cc)$meta$count
organizations = paste0(rgbif::occ_count(publishingCountry=cc,facet="publishingOrg",facetLimit=10000) |> nrow(), " organizations in ", name)
species = format(rgbif::occ_count(country=cc,facet="speciesKey",facetLimit=1000000) |> nrow(), big.mark=",")
families = paste0(format(rgbif::occ_count(country=cc,facet="familyKey",facetLimit=1000000) |> nrow(), big.mark=","), " families") 
literatureCount = "100"
literatureTotal = "445 articles since 2008"
description = paste0("Occurrence record data about ", name,". These can be published by institutions within ", name, " or from publishers outside of ", name,".")
chartTitle = paste0(name, " Occurrence Records Over Time")

# Calculate annual growth
current_year = as.numeric(format(Sys.Date(), "%Y"))
last_year = current_year - 1

# Get occurrence counts for current and previous year
current_year_count = rgbif::occ_count(country=cc,year=paste0("*,",current_year))
last_year_count = rgbif::occ_count(country=cc, year=last_year)

# Calculate annual growth percentage
if(last_year_count > 0) {
  annualGrowth = paste0(round(((current_year_count - last_year_count) / last_year_count) * 100, 1), "%")
} else {
  annualGrowth = "N/A"
}

# Create the country data list
countryData = list(
  name = name,
  code = cc,
  totalOccurrences = totalOccurrences,
  publishedByCountry = publishedByCountry,
  datasets = as.character(datasets),
  organizations = organizations,
  species = species,
  families = families,
  literatureCount = literatureCount,
  literatureTotal = literatureTotal,
  description = description,
  chartTitle = chartTitle,
  annualGrowth = annualGrowth
)

# Generate TypeScript content
ts_content = paste0(
  "export const countryData = {\n",
  "  name: \"", countryData$name, "\",\n",
  "  code: \"", countryData$code, "\",\n",
  "  totalOccurrences: \"", countryData$totalOccurrences, "\",\n",
  "  publishedByCountry: \"", countryData$publishedByCountry, "\",\n",
  "  datasets: \"", countryData$datasets, "\",\n",
  "  organizations: \"", countryData$organizations, "\",\n",
  "  species: \"", countryData$species, "\",\n",
  "  families: \"", countryData$families, "\",\n",
  "  literatureCount: \"", countryData$literatureCount, "\",\n",
  "  literatureTotal: \"", countryData$literatureTotal, "\",\n",
  "  description: \"", countryData$description, "\",\n",
  "  chartTitle: \"", countryData$chartTitle, "\",\n",
  "  annualGrowth: \"", countryData$annualGrowth, "\"\n",
  "};\n"
)

writeLines(ts_content, paste0(cc, ".ts"))

