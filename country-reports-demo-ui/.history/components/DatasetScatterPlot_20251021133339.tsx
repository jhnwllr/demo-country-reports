import { useState } from 'react';
import { DatasetPoint } from '../data/dataset-types';

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

  // Chart dimensions
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 60, left: 80 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Calculate log10 ranges
  const minSpecies = Math.min(...datasets.map(d => d.species));
  const maxSpecies = Math.max(...datasets.map(d => d.species));
  const minOccurrences = Math.min(...datasets.map(d => d.occurrences));
  const maxOccurrences = Math.max(...datasets.map(d => d.occurrences));

  const minSpeciesLog = Math.floor(Math.log10(minSpecies));
  const maxSpeciesLog = Math.ceil(Math.log10(maxSpecies));
  const minOccurrencesLog = Math.floor(Math.log10(minOccurrences));
  const maxOccurrencesLog = Math.ceil(Math.log10(maxOccurrences));

  // Scale functions
  const scaleX = (species: number) => {
    const logValue = Math.log10(species);
    return ((logValue - minSpeciesLog) / (maxSpeciesLog - minSpeciesLog)) * chartWidth;
  };

  const scaleY = (occurrences: number) => {
    const logValue = Math.log10(occurrences);
    return chartHeight - ((logValue - minOccurrencesLog) / (maxOccurrencesLog - minOccurrencesLog)) * chartHeight;
  };

  // Generate grid lines and labels
  const xTicks = [];
  const yTicks = [];
  
  for (let i = minSpeciesLog; i <= maxSpeciesLog; i++) {
    xTicks.push(i);
  }
  
  for (let i = minOccurrencesLog; i <= maxOccurrencesLog; i++) {
    yTicks.push(i);
  }

  // Color scheme
  const colors = {
    publishedInCountry: '#4C9B45', // Green for domestic
    publishedOutside: '#E27B72'    // Red for international
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
              fill={dataset.publishedInCountry ? colors.publishedInCountry : colors.publishedOutside}
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
                10^{tick}
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
                10^{tick}
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
            Number of Species (log₁₀)
          </text>
          
          <text
            x={-50}
            y={chartHeight / 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
            transform={`rotate(-90, -50, ${chartHeight / 2})`}
          >
            Number of Occurrences (log₁₀)
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
              Published: {tooltip.dataset.publishedInCountry ? countryName : tooltip.dataset.publishingCountry}
            </text>
          </g>
        )}
      </svg>

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
      </div>

      {/* Summary stats */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Total datasets: {datasets.length}</p>
        <p>Published in {countryName}: {datasets.filter(d => d.publishedInCountry).length}</p>
        <p>Published elsewhere: {datasets.filter(d => !d.publishedInCountry).length}</p>
      </div>
    </div>
  );
}