import { useState } from 'react';
import type { DatasetPoint } from '../data/dataset-scatterplot/types';

interface DatasetScatterPlotProps {
  datasets: DatasetPoint[];
  countryName: string;
}

interface TooltipData {
  dataset: DatasetPoint;
  x: number;
  y: number;
}

export function DatasetScatterPlot({ datasets, countryName }: DatasetScatterPlotProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [useLogScale, setUseLogScale] = useState(true);

  // Chart dimensions
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 60, left: 80 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Calculate data ranges
  const minSpecies = Math.min(...datasets.map(d => d.species));
  const maxSpecies = Math.max(...datasets.map(d => d.species));
  const minOccurrences = Math.min(...datasets.map(d => d.occurrences));
  const maxOccurrences = Math.max(...datasets.map(d => d.occurrences));

  // Log scale ranges
  const minSpeciesLog = Math.floor(Math.log10(minSpecies));
  const maxSpeciesLog = Math.ceil(Math.log10(maxSpecies));
  const minOccurrencesLog = Math.floor(Math.log10(minOccurrences));
  const maxOccurrencesLog = Math.ceil(Math.log10(maxOccurrences));

  // Scale functions
  const scaleX = (species: number) => {
    if (useLogScale) {
      const logValue = Math.log10(species);
      return ((logValue - minSpeciesLog) / (maxSpeciesLog - minSpeciesLog)) * chartWidth;
    } else {
      return ((species - minSpecies) / (maxSpecies - minSpecies)) * chartWidth;
    }
  };

  const scaleY = (occurrences: number) => {
    if (useLogScale) {
      const logValue = Math.log10(occurrences);
      return chartHeight - ((logValue - minOccurrencesLog) / (maxOccurrencesLog - minOccurrencesLog)) * chartHeight;
    } else {
      return chartHeight - ((occurrences - minOccurrences) / (maxOccurrences - minOccurrences)) * chartHeight;
    }
  };

  // Generate grid lines and labels
  const xTicks = [];
  const yTicks = [];
  
  if (useLogScale) {
    for (let i = minSpeciesLog; i <= maxSpeciesLog; i++) {
      xTicks.push(i);
    }
    
    for (let i = minOccurrencesLog; i <= maxOccurrencesLog; i++) {
      yTicks.push(i);
    }
  } else {
    // Generate linear ticks
    const speciesRange = maxSpecies - minSpecies;
    const occurrencesRange = maxOccurrences - minOccurrences;
    
    // Generate approximately 5-8 ticks for species
    const speciesTickCount = 6;
    for (let i = 0; i <= speciesTickCount; i++) {
      const value = minSpecies + (i / speciesTickCount) * speciesRange;
      xTicks.push(Math.round(value));
    }
    
    // Generate approximately 5-8 ticks for occurrences
    const occurrencesTickCount = 6;
    for (let i = 0; i <= occurrencesTickCount; i++) {
      const value = minOccurrences + (i / occurrencesTickCount) * occurrencesRange;
      yTicks.push(Math.round(value));
    }
  }

  // Color scheme
  const colors = {
    publishedInCountry: '#4C9B45', // Green for domestic
    publishedOutside: '#E27B72',   // Red for international
    eBird: '#2563EB'              // Blue for eBird
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTickLabel = (tick: number) => {
    const value = Math.pow(10, tick);
    return formatNumber(value);
  };

  // Helper function to get color for a dataset
  const getDatasetColor = (dataset: DatasetPoint) => {
    if (dataset.id === '4fa7b334-ce0d-4e88-aaae-2e0c138d049e') {
      return colors.eBird;
    }
    return dataset.publishedInCountry ? colors.publishedInCountry : colors.publishedOutside;
  };

  return (
    <div className="relative">
      <svg width={width} height={height} className="border border-gray-200 rounded">
        {/* Background */}
        <rect width={width} height={height} fill="#FAFAFA" />
        
        {/* Chart area */}
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Grid lines */}
          {xTicks.map(tick => (
            <g key={`x-grid-${tick}`}>
              <line
                x1={scaleX(Math.pow(10, tick))}
                y1={0}
                x2={scaleX(Math.pow(10, tick))}
                y2={chartHeight}
                stroke="#E5E7EB"
                strokeWidth={1}
              />
            </g>
          ))}
          
          {yTicks.map(tick => (
            <g key={`y-grid-${tick}`}>
              <line
                x1={0}
                y1={scaleY(Math.pow(10, tick))}
                x2={chartWidth}
                y2={scaleY(Math.pow(10, tick))}
                stroke="#E5E7EB"
                strokeWidth={1}
              />
            </g>
          ))}

          {/* Data points */}
          {datasets.map((dataset) => (
            <circle
              key={dataset.id}
              cx={scaleX(dataset.species)}
              cy={scaleY(dataset.occurrences)}
              r={6}
              fill={getDatasetColor(dataset)}
              stroke="white"
              strokeWidth={2}
              opacity={0.8}
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => {
                const svgRect = e.currentTarget.closest('svg')?.getBoundingClientRect();
                if (svgRect) {
                  setTooltip({
                    dataset,
                    x: e.clientX - svgRect.left,
                    y: e.clientY - svgRect.top
                  });
                }
              }}
              onMouseMove={(e) => {
                if (tooltip) {
                  const svgRect = e.currentTarget.closest('svg')?.getBoundingClientRect();
                  if (svgRect) {
                    setTooltip({
                      ...tooltip,
                      x: e.clientX - svgRect.left,
                      y: e.clientY - svgRect.top
                    });
                  }
                }
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}

          {/* Axis lines */}
          <line x1={0} y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#374151" strokeWidth={2} />
          <line x1={0} y1={0} x2={0} y2={chartHeight} stroke="#374151" strokeWidth={2} />

          {/* X-axis labels */}
          {xTicks.map(tick => (
            <g key={`x-label-${tick}`}>
              <text
                x={scaleX(Math.pow(10, tick))}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#6B7280"
              >
                {formatTickLabel(tick)}
              </text>
            </g>
          ))}

          {/* Y-axis labels */}
          {yTicks.map(tick => (
            <g key={`y-label-${tick}`}>
              <text
                x={-15}
                y={scaleY(Math.pow(10, tick)) + 4}
                textAnchor="end"
                fontSize="12"
                fill="#6B7280"
              >
                {formatTickLabel(tick)}
              </text>
            </g>
          ))}

          {/* Axis titles */}
          <text
            x={chartWidth / 2}
            y={chartHeight + 45}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
          >
            Number of Species
          </text>
          
          <text
            x={-65}
            y={chartHeight / 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
            transform={`rotate(-90, -65, ${chartHeight / 2})`}
          >
            Number of Occurrences
          </text>
        </g>

        {/* Tooltip */}
        {tooltip && (
          <g style={{ pointerEvents: 'none' }}>
            <rect
              x={tooltip.x + 10}
              y={tooltip.y - 70}
              width="250"
              height="65"
              fill="rgba(0, 0, 0, 0.9)"
              rx="6"
              ry="6"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
            />
            <text
              x={tooltip.x + 15}
              y={tooltip.y - 50}
              fill="white"
              fontSize="12"
              fontWeight="600"
            >
              {tooltip.dataset.name}
            </text>
            <text
              x={tooltip.x + 15}
              y={tooltip.y - 35}
              fill="white"
              fontSize="11"
            >
              Species: {formatNumber(tooltip.dataset.species)}
            </text>
            <text
              x={tooltip.x + 15}
              y={tooltip.y - 22}
              fill="white"
              fontSize="11"
            >
              Occurrences: {formatNumber(tooltip.dataset.occurrences)}
            </text>
            <text
              x={tooltip.x + 15}
              y={tooltip.y - 9}
              fill="white"
              fontSize="11"
            >
              Published: {tooltip.dataset.publishedInCountry ? countryName : 'International'}
            </text>
          </g>
        )}
      </svg>

      {/* External Tooltip - renders above other elements */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 70,
            transform: 'translate(0, 0)'
          }}
        >
          <div className="bg-black/90 text-white p-3 rounded-lg shadow-lg min-w-[250px] max-w-[300px]">
            <div className="font-semibold text-sm mb-1 truncate">
              {tooltip.dataset.name}
            </div>
            <div className="text-xs space-y-0.5">
              <div>Species: {formatNumber(tooltip.dataset.species)}</div>
              <div>Occurrences: {formatNumber(tooltip.dataset.occurrences)}</div>
              <div>Published: {tooltip.dataset.publishedInCountry ? countryName : 'International'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: colors.publishedInCountry }}
          ></div>
          <span className="text-sm text-gray-700">Published in {countryName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: colors.publishedOutside }}
          ></div>
          <span className="text-sm text-gray-700">Published outside {countryName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: colors.eBird }}
          ></div>
          <span className="text-sm text-gray-700">eBird</span>
        </div>
      </div>
    </div>
  );
}