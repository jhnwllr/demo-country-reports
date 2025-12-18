

# rgbif::occ_count(publishingCountry="AU",facet="publishingOrg",facetLimit=1000) |> nrow()
# rgbif::dataset_search(publishingCountry = "AU")$meta
# rgbif::dataset_search(publishingCountry = "AU",facet="publishingCountry")$meta
# rgbif::organizations(publishingCountry = "AU")

rgbif::occ_count(country="AU",facet="speciesKey",facetLimit=100000000) |> nrow()
