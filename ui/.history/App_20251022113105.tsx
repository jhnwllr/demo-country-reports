
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { Progress } from "./components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Leaf,
  Bug,
  Bird,
  Fish,
  TreePine,
  Microscope,
  Globe,
  Database,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { getCountryData, type CountryData } from "./data/api";
import { useState, useEffect } from "react";

// Images from data/images folder  
const gbifLogo = '/data/images/gbif-logo.svg?v=' + Date.now();
const occurrenceRecordsImage = '/data/images/occurrence-records.png';
const chao1Image = '/data/images/chao1/chao1-explainer.png';
import { TaxonomicSunburst } from "./components/TaxonomicSunburst";
import { DatasetScatterPlot } from "./components/DatasetScatterPlot";
import { getDatasetScatterData } from "./data/dataset-scatterplot/api";



// Available countries
const availableCountries = ["AU", "BW", "DK", "CO"];

// Helper function to get growth rate styling based on percentage value
const getGrowthStyling = (growthStr: string) => {
  const numericValue = parseFloat(growthStr.replace('%', ''));
  
  if (numericValue >= 3.0) {
    return {
      color: 'text-green-600',
      icon: TrendingUp,
      label: 'High growth'
    };
  } else if (numericValue >= 1.0) {
    return {
      color: 'text-amber-600',
      icon: TrendingUp,
      label: 'Moderate growth'
    };
  } else if (numericValue > 0) {
    return {
      color: 'text-orange-600',
      icon: TrendingUp,
      label: 'Low growth'
    };
  } else {
    return {
      color: 'text-red-600',
      icon: TrendingDown,
      label: 'No growth'
    };
  }
};

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>("AU");
  const [currentCountry, setCurrentCountry] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize country from URL parameter on first load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryFromUrl = urlParams.get('country');
    
    if (countryFromUrl && availableCountries.includes(countryFromUrl.toUpperCase())) {
      setSelectedCountry(countryFromUrl.toUpperCase());
    }
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const countryFromUrl = urlParams.get('country');
      
      if (countryFromUrl && availableCountries.includes(countryFromUrl.toUpperCase())) {
        setSelectedCountry(countryFromUrl.toUpperCase());
      } else {
        setSelectedCountry("AU");
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL when country changes
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    
    // Update URL without triggering a page reload
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('country', country);
    window.history.pushState({}, '', newUrl.toString());
  };

  // Load country data when selected country changes
  useEffect(() => {
    const loadCountryData = async () => {
      setLoading(true);
      try {
        const data = await getCountryData(selectedCountry);
        setCurrentCountry(data);
      } catch (error) {
        console.error("Failed to load country data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCountryData();
  }, [selectedCountry]);



  // Show loading state
  if (loading || !currentCountry) {
    return (
      <div className="max-w-4xl mx-auto p-12 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading biodiversity data...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-12 bg-white min-h-screen">
      {/* Country Selection Menu */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 py-4 mb-8 -mx-12 px-12">
        <div className="flex justify-center">
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger className="w-64 bg-white border-gray-300">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 shadow-xl">
              <SelectItem value="AU">🇦🇺 Australia</SelectItem>
              <SelectItem value="BW">🇧🇼 Botswana</SelectItem>
              <SelectItem value="DK">🇩🇰 Denmark</SelectItem>
              <SelectItem value="CO">🇨🇴 Colombia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img
                src={gbifLogo}
                alt="GBIF Logo"
                className="h-8 w-8"
              />
              <h1 className="text-3xl">{currentCountry.name}</h1>
            </div>
            <p className="text-gray-600">
              Global Biodiversity Information Facility - 2025 Activity Report
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Generated: October 1, 2025
            </p>
            <p className="text-sm text-gray-500">
              Data Portal: gbif.org
            </p>
          </div>
        </div>
        <Separator />
      </div>

      {/* Executive Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Summary Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            {currentCountry.description}
          </p>
          <div className="grid grid-cols-4 gap-4">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#4C9B4520" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-sm"
                  style={{ color: "#4F4C4D" }}
                >
                  Total Occurrences
                </span>
                <Database
                  className="h-5 w-5"
                  style={{ color: "#4C9B45" }}
                />
              </div>
              <div className="text-3xl mb-1" style={{ color: "#4C9B45" }}>{currentCountry.totalOccurrences}</div>
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp
                  className="h-3 w-3"
                  style={{ color: "#4C9B45" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "#4C9B45" }}
                >
                  {currentCountry.annualGrowth} annual growth
                </span>
              </div>
              <div
                className="text-xs"
                style={{ color: "#4F4C4D" }}
              >
                {currentCountry.publishedByCountry}
              </div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#68439320" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-sm"
                  style={{ color: "#4F4C4D" }}
                >
                  Published Datasets
                </span>
                <Database
                  className="h-4 w-4"
                  style={{ color: "#684393" }}
                />
              </div>
              <div className="text-2xl mt-1">{currentCountry.datasets}</div>
              <div
                className="text-sm"
                style={{ color: "#684393" }}
              >
                By {currentCountry.organizations}
              </div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#D0628D20" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-sm"
                  style={{ color: "#4F4C4D" }}
                >
                  Total Species
                </span>
                <Leaf
                  className="h-4 w-4"
                  style={{ color: "#D0628D" }}
                />
              </div>
              <div className="text-3xl mb-1" style={{ color: "#D0628D" }}>{currentCountry.species}</div>
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp
                  className="h-3 w-3"
                  style={{ color: "#D0628D" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "#D0628D" }}
                >
                  {currentCountry.speciesAnnualGrowth} annual growth
                </span>
              </div>
              <div
                className="text-xs"
                style={{ color: "#4F4C4D" }}
              >
                From {currentCountry.families}
              </div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#E27B7220" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-sm"
                  style={{ color: "#4F4C4D" }}
                >
                  Literature Metrics
                </span>
                <Microscope
                  className="h-4 w-4"
                  style={{ color: "#E27B72" }}
                />
              </div>
              <div className="text-2xl mt-1">{currentCountry.literatureCount}</div>
              <div
                className="text-xs mb-1"
                style={{ color: "#E27B72" }}
              >
                peer-reviewed articles citing GBIF use during 2024
              </div>
              <div
                className="text-xs"
                style={{ color: "#4F4C4D" }}
              >
                {currentCountry.literatureTotal}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diversity Metrics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Diversity Metrics</CardTitle>
          <CardDescription>
            Species richness of plants and animals across {currentCountry.name} comparing expected
            values (Chao1 estimator) with unique species counts for each grid cell from
            occurrence records.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center overflow-hidden">
              <h4 className="mb-3 text-sm font-medium text-gray-700">
                Species Richness
              </h4>
              <div className="w-full overflow-hidden rounded-lg mt-6">
                {selectedCountry === "AU" || selectedCountry === "DK" || selectedCountry === "BW" ? (
                  <img
                    src={currentCountry.diversityMaps?.speciesRichness}
                    alt={`Species Richness based on occurrence records - ${currentCountry.name} biodiversity hexagonal map showing unique species count from 0K to 5K with purple to yellow color scale`}
                    className="w-full h-auto rounded-lg transform scale-[1.17] origin-center"
                  />
                ) : (
                  <ImageWithFallback
                    src={currentCountry.diversityMaps?.speciesRichness || ""}
                    alt={`Species Richness based on occurrence records - ${currentCountry.name} biodiversity hexagonal map showing unique species count`}
                    className="w-full h-auto rounded-lg transform scale-[1.17] origin-center"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col items-center overflow-hidden">
              <h4 className="mb-3 text-sm font-medium text-gray-700">
                Expected Species Richness (Chao1)
              </h4>
              <div className="w-full overflow-hidden rounded-lg mt-6">
                {selectedCountry === "AU" || selectedCountry === "DK" || selectedCountry === "CO" || selectedCountry === "BW" ? (
                  <img
                    src={currentCountry.diversityMaps?.chao1}
                    alt={`Expected Species Richness (Chao1) - ${currentCountry.name} biodiversity hexagonal map showing estimated species diversity with purple to yellow color scale`}
                    className="w-full h-auto rounded-lg transform scale-[1.17] origin-center"
                  />
                ) : (
                  <ImageWithFallback
                    src={currentCountry.diversityMaps?.chao1 || ""}
                    alt={`Expected Species Richness (Chao1) - ${currentCountry.name} biodiversity hexagonal map showing estimated species diversity`}
                    className="w-full h-auto rounded-lg transform scale-[1.17] origin-center"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Chao1 Explainer */}
          <div className="mt-6 px-4 py-3 bg-gray-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-xs text-gray-700">
              <strong>About Chao1 Estimator:</strong> The Chao1
              estimator is a non-parametric statistical method
              used to estimate the total number of species in a
              community based on observed occurrence data. It
              accounts for undetected species by analyzing the
              frequency of rare species (singletons and
              doubletons) in the dataset, providing a more
              complete picture of biodiversity than raw
              occurrence counts alone. If underestimation is expected, 
              the hexagon is filled in gray.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Occurrence Growth */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Occurrence Growth</CardTitle>
          <CardDescription>
            Historical growth in occurrence records from 2007 to 2025 showing steady data accumulation over time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <svg
              width="100%"
              height="300"
              viewBox="0 0 800 300"
              className="max-w-4xl"
            >
              {/* Background */}
              <rect width="800" height="300" fill="#fafafa" rx="8" />
              
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="800" height="300" fill="url(#grid)" />
              
              {/* Y-axis labels */}
              <text x="40" y="50" fontSize="12" fill="#6b7280" textAnchor="end">140M</text>
              <text x="40" y="110" fontSize="12" fill="#6b7280" textAnchor="end">100M</text>
              <text x="40" y="170" fontSize="12" fill="#6b7280" textAnchor="end">60M</text>
              <text x="40" y="230" fontSize="12" fill="#6b7280" textAnchor="end">20M</text>
              <text x="40" y="290" fontSize="12" fill="#6b7280" textAnchor="end">0M</text>
              
              {/* X-axis labels */}
              <text x="80" y="290" fontSize="12" fill="#6b7280" textAnchor="middle">2008</text>
              <text x="200" y="290" fontSize="12" fill="#6b7280" textAnchor="middle">2012</text>
              <text x="320" y="290" fontSize="12" fill="#6b7280" textAnchor="middle">2016</text>
              <text x="440" y="290" fontSize="12" fill="#6b7280" textAnchor="middle">2020</text>
              <text x="560" y="290" fontSize="12" fill="#6b7280" textAnchor="middle">2024</text>
              <text x="680" y="290" fontSize="12" fill="#6b7280" textAnchor="middle">2025</text>
              
              {/* Main growth curve */}
              <path
                d="M 60 285 L 80 284 L 100 282 L 120 275 L 140 280 L 160 278 L 180 277 L 200 270 L 220 272 L 240 271 L 260 265 L 280 262 L 300 255 L 320 250 L 340 235 L 360 240 L 380 238 L 400 237 L 420 236 L 440 232 L 460 220 L 480 195 L 500 190 L 520 188 L 540 185 L 560 180 L 580 175 L 600 170 L 620 160 L 640 145 L 660 140 L 680 135 L 700 130 L 720 125"
                fill="none"
                stroke="#4C9B45"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              
              {/* Area under curve for visual appeal */}
              <path
                d="M 60 285 L 80 284 L 100 282 L 120 275 L 140 280 L 160 278 L 180 277 L 200 270 L 220 272 L 240 271 L 260 265 L 280 262 L 300 255 L 320 250 L 340 235 L 360 240 L 380 238 L 400 237 L 420 236 L 440 232 L 460 220 L 480 195 L 500 190 L 520 188 L 540 185 L 560 180 L 580 175 L 600 170 L 620 160 L 640 145 L 660 140 L 680 135 L 700 130 L 720 125 L 720 300 L 60 300 Z"
                fill="#4C9B45"
                fillOpacity="0.1"
              />
              
              {/* Data points for each year */}
              <circle cx="60" cy="285" r="3" fill="#4C9B45" />
              <circle cx="80" cy="284" r="3" fill="#4C9B45" />
              <circle cx="100" cy="282" r="3" fill="#4C9B45" />
              <circle cx="120" cy="275" r="3" fill="#4C9B45" />
              <circle cx="140" cy="280" r="3" fill="#4C9B45" />
              <circle cx="160" cy="278" r="3" fill="#4C9B45" />
              <circle cx="180" cy="277" r="3" fill="#4C9B45" />
              <circle cx="200" cy="270" r="3" fill="#4C9B45" />
              <circle cx="220" cy="272" r="3" fill="#4C9B45" />
              <circle cx="240" cy="271" r="3" fill="#4C9B45" />
              <circle cx="260" cy="265" r="3" fill="#4C9B45" />
              <circle cx="280" cy="262" r="3" fill="#4C9B45" />
              <circle cx="300" cy="255" r="3" fill="#4C9B45" />
              <circle cx="320" cy="250" r="3" fill="#4C9B45" />
              <circle cx="340" cy="235" r="3" fill="#4C9B45" />
              <circle cx="360" cy="240" r="3" fill="#4C9B45" />
              <circle cx="380" cy="238" r="3" fill="#4C9B45" />
              <circle cx="400" cy="237" r="3" fill="#4C9B45" />
              <circle cx="420" cy="236" r="3" fill="#4C9B45" />
              <circle cx="440" cy="232" r="3" fill="#4C9B45" />
              <circle cx="460" cy="220" r="3" fill="#4C9B45" />
              <circle cx="480" cy="195" r="3" fill="#4C9B45" />
              <circle cx="500" cy="190" r="3" fill="#4C9B45" />
              <circle cx="520" cy="188" r="3" fill="#4C9B45" />
              <circle cx="540" cy="185" r="3" fill="#4C9B45" />
              <circle cx="560" cy="180" r="3" fill="#4C9B45" />
              <circle cx="580" cy="175" r="3" fill="#4C9B45" />
              <circle cx="600" cy="170" r="3" fill="#4C9B45" />
              <circle cx="620" cy="160" r="3" fill="#4C9B45" />
              <circle cx="640" cy="145" r="3" fill="#4C9B45" />
              <circle cx="660" cy="140" r="3" fill="#4C9B45" />
              <circle cx="680" cy="135" r="3" fill="#4C9B45" />
              <circle cx="700" cy="130" r="3" fill="#4C9B45" />
              <circle cx="720" cy="125" r="3" fill="#4C9B45" />
              
              {/* Title */}
              <text x="400" y="25" fontSize="16" fill="#4F4C4D" textAnchor="middle" fontWeight="500">
                {currentCountry.chartTitle}
              </text>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Dataset Distribution Analysis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Dataset Distribution Analysis</CardTitle>
          <CardDescription>
            Distribution of datasets by species count and occurrence records in {currentCountry.name}. Points are colored by publishing location and scaled logarithmically to show the full range of dataset sizes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DatasetScatterPlot 
            datasets={getDatasetScatterData(selectedCountry)?.datasets || []}
            countryName={currentCountry.name}
          />
          
          {/* Dataset Analysis Explainer */}
          <div className="mt-6 px-4 py-3 bg-gray-50 rounded-lg border-l-4 border-orange-400">
            <p className="text-xs text-gray-700">
              <strong>About Dataset Analysis:</strong> This scatter plot shows the relationship between the number of species and occurrence records across different datasets in {currentCountry.name}. Each point represents a dataset, with green points indicating datasets published by institutions within {currentCountry.name} and red points showing datasets published by international organizations. The logarithmic scale allows visualization of datasets ranging from small specialized collections to large comprehensive surveys. Hover over any point to see detailed information about that dataset.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Species Accumulation Curves */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Species Accumulation Curve</CardTitle>
          <CardDescription>
            Cumulative species discovery over time showing the rate of new species identification in the dataset. Circles in the legend indicate the sampling effort that year in occurrence records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            {selectedCountry === "AU" || selectedCountry === "DK" || selectedCountry === "CO" || selectedCountry === "BW" ? (
              <img 
                src={currentCountry.accumulationCurve}
                alt={`Species accumulation curve showing cumulative species discovery over time for ${currentCountry.name}`}
                className="w-full max-w-4xl h-auto rounded-lg"
              />
            ) : (
              <ImageWithFallback
                src={currentCountry.accumulationCurve || ""}
                alt={`Species accumulation curve showing cumulative species discovery over time for ${currentCountry.name}`}
                className="w-full max-w-4xl h-auto rounded-lg"
              />
            )}
          </div>

          {/* Species Accumulation Curve Explainer */}
          <div className="mt-6 px-4 py-3 bg-gray-50 rounded-lg border-l-4 border-green-400">
            <p className="text-xs text-gray-700">
              <strong>About Species Accumulation Curves:</strong> This curve shows the cumulative number of unique species discovered as sampling effort increases over time. The slope of the line indicates progress towards complete sampling - a steep slope means many new species are still being discovered, while a flattening curve suggests the sampling is approaching completeness for that region or habitat. When the curve plateaus, it indicates that most species in the area have been documented.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Taxonomic Diversity Sunburst */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Taxonomic Diversity</CardTitle>
          <CardDescription>
            Hierarchical visualization of species distribution across taxonomic kingdoms and groups in {currentCountry.name}. Hover over segments to see detailed counts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaxonomicSunburst taxonomicGroups={currentCountry.taxonomicGroups} />
          
          {/* Sunburst Explainer */}
          <div className="mt-6 px-4 py-3 bg-gray-50 rounded-lg border-l-4 border-purple-400">
            <p className="text-xs text-gray-700">
              <strong>About the Sunburst Chart:</strong> This visualization displays the hierarchical structure of biodiversity in {currentCountry.name}. The inner ring represents major taxonomic kingdoms (Animals, Plants, Fungi), with each segment sized proportionally to the number of species. The outer ring breaks down these kingdoms into specific taxonomic groups, allowing you to see the relative contribution of each group to overall biodiversity. Hover over any segment to see exact species counts.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Species Counts by Group */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Species Occurrence Counts by Taxonomic Group</CardTitle>
          <CardDescription>
            Number of occurrence records and species counts for major taxonomic groups in {currentCountry.name} with annual growth rates. Data can be published by institutions within {currentCountry.name} or from publishers outside {currentCountry.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Taxonomic Group</TableHead>
                <TableHead className="text-right">Occurrences</TableHead>
                <TableHead className="text-right">Species</TableHead>
                <TableHead className="text-right">Occ. Growth</TableHead>
                <TableHead className="text-right">Species Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCountry.taxonomicGroups.map((group, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2">
                    <span 
                      className="h-4 w-4 rounded-full" 
                      style={{ backgroundColor: group.color, display: "inline-block" }}
                    ></span>
                    {group.group}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {group.occurrences.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {group.species.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {(() => {
                      const styling = getGrowthStyling(group.occurrenceGrowth);
                      const IconComponent = styling.icon;
                      return (
                        <span className="flex items-center justify-end gap-1">
                          <IconComponent className={`h-3 w-3 ${styling.color}`} />
                          <span className={`text-sm ${styling.color}`}>{group.occurrenceGrowth}</span>
                        </span>
                      );
                    })()}
                  </TableCell>
                  <TableCell className="text-right">
                    {(() => {
                      const styling = getGrowthStyling(group.speciesGrowth);
                      const IconComponent = styling.icon;
                      return (
                        <span className="flex items-center justify-end gap-1">
                          <IconComponent className={`h-3 w-3 ${styling.color}`} />
                          <span className={`text-sm ${styling.color}`}>{group.speciesGrowth}</span>
                        </span>
                      );
                    })()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Taxonomic Data Explainer */}
          <div className="mt-6 px-4 py-3 bg-gray-50 rounded-lg border-l-4 border-orange-400">
            <p className="text-xs text-gray-700">
              <strong>About Growth Statistics & Species Counts:</strong> The growth percentages represent annual growth rates in data collection for each taxonomic group over the past year. The Species column shows the number of distinct species identified from occurrence records in each group, representing unique taxonomic entities rather than individual observations. A slow species growth rate combined with a high occurrence growth rate might indicate, but not necessarily, that a country is well sampled for that taxonomic group, as fewer new species are being discovered relative to existing data.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* IUCN Conservation Metrics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>IUCN Red List Assessment Metrics</CardTitle>
          <CardDescription>
            Conservation status assessments for {currentCountry.name} species according to IUCN criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-600"></span>
                Critically Endangered
              </span>
              <span className="text-sm">89 species (3.1%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-orange-500"></span>
                Endangered
              </span>
              <span className="text-sm">186 species (6.5%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                Vulnerable
              </span>
              <span className="text-sm">256 species (9.0%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                Near Threatened
              </span>
              <span className="text-sm">192 species (6.7%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-600"></span>
                Least Concern
              </span>
              <span className="text-sm">1,892 species (66.4%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gray-400"></span>
                Data Deficient
              </span>
              <span className="text-sm">232 species (8.1%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Biodiversity Data Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Data Collection Achievements
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                Record growth in citizen science contributions
                with over 45M new observations
              </li>
              <li>
                Significant improvements in taxonomic coverage
                for tropical regions
              </li>
              <li>
                Enhanced data quality through automated
                validation and expert verification
              </li>
              <li>
                Integration of environmental DNA (eDNA) sampling
                expanding microbial discovery
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="mb-2 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              Data Gaps & Challenges
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                Underrepresentation of tropical and developing
                regions in occurrence data
              </li>
              <li>
                Limited temporal coverage for historical
                biodiversity patterns
              </li>
              <li>
                Taxonomic bias toward charismatic megafauna and
                well-studied groups
              </li>
              <li>
                Need for standardized protocols across different
                data collection methods
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Priorities */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Strategic Priorities for Biodiversity Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="mb-1 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Global Coverage Expansion
              </h4>
              <p className="text-gray-700">
                Increase participation from underrepresented
                regions, particularly in biodiversity hotspots
                and developing countries, through capacity
                building and technology transfer.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="mb-1 flex items-center gap-2">
                <Microscope className="h-4 w-4" />
                Taxonomic Gap Closure
              </h4>
              <p className="text-gray-700">
                Focus on documenting understudied groups
                including invertebrates, microorganisms, and
                cryptic species through advanced molecular
                techniques and AI-assisted identification.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="mb-1 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Integration & Quality
              </h4>
              <p className="text-gray-700">
                Enhance data interoperability, implement machine
                learning for quality assessment, and develop
                real-time monitoring systems for biodiversity
                change detection.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            <p>Compiled by: GBIF Secretariat</p>
            <p>
              Data Contributors: 1,847 institutions worldwide
            </p>
          </div>
          <div className="text-right">
            <p>Next Update: January 2026</p>
            <p>Access: gbif.org/occurrence</p>
          </div>
        </div>
      </div>
    </div>
  );
}