import { useState, useMemo } from 'react';
import { getAccumulationData, getTaxonomicGroups } from '../data/species-accumulation/api';
import type { TaxonomicGroupAccumulation } from '../data/species-accumulation/types';

interface SpeciesAccumulationCurveProps {
  countryCode: string;
  countryName: string;
}

export function SpeciesAccumulationCurve({ countryCode, countryName }: SpeciesAccumulationCurveProps) {
  const accumulationData = getAccumulationData(countryCode);
  const taxonomicGroups = getTaxonomicGroups(countryCode);
  const [selectedGroup, setSelectedGroup] = useState<string>(taxonomicGroups[0] || '');

  const currentGroupData = useMemo(() => {
    if (!accumulationData || !selectedGroup) return null;
    return accumulationData.taxonomicGroups.find(group => group.group === selectedGroup) || null;
  }, [accumulationData, selectedGroup]);

  if (!accumulationData || !currentGroupData) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No accumulation data available for {countryName}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Group Selection Dropdown */}
      <div className="mb-6 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <label htmlFor="taxonomic-group" className="text-sm font-medium text-gray-700">
            Taxonomic Group:
          </label>
          <select
            id="taxonomic-group"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {taxonomicGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <SpeciesAccumulationChart groupData={currentGroupData} />

      {/* Group Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: currentGroupData.color }}
          ></div>
          <h4 className="font-semibold text-gray-900">{currentGroupData.group}</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Total Species:</span> {currentGroupData.totalSpecies.toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Total Occurrences:</span> {currentGroupData.totalOccurrences.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SpeciesAccumulationChartProps {
  groupData: TaxonomicGroupAccumulation;
}

function SpeciesAccumulationChart({ groupData }: SpeciesAccumulationChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ year: number; species: number; effort: number; x: number; y: number } | null>(null);

  // Chart dimensions
  const width = 700;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 60, left: 80 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Data ranges
  const years = groupData.data.map(d => d.year);
  const speciesCounts = groupData.data.map(d => d.cumulativeSpecies);
  const efforts = groupData.data.map(d => d.effort || 1);

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const minSpecies = Math.min(...speciesCounts);
  const maxSpecies = Math.max(...speciesCounts);
  const minEffort = Math.min(...efforts);
  const maxEffort = Math.max(...efforts);

  // Scale functions
  const scaleX = (year: number) => ((year - minYear) / (maxYear - minYear)) * chartWidth;
  const scaleY = (species: number) => chartHeight - ((species - minSpecies) / (maxSpecies - minSpecies)) * chartHeight;
  const scaleCircleSize = (effort: number) => {
    const normalized = (effort - minEffort) / (maxEffort - minEffort);
    return Math.max(3, Math.min(12, 3 + normalized * 9)); // Size between 3-12px
  };

  // Generate path for the accumulation curve
  const pathData = groupData.data
    .map((point, index) => {
      const x = scaleX(point.year);
      const y = scaleY(point.cumulativeSpecies);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate ticks for axes
  const yearTicks = years.filter((_, index) => index % 2 === 0); // Every other year
  const speciesTicks = [0, 0.25, 0.5, 0.75, 1].map(t => 
    Math.round(minSpecies + t * (maxSpecies - minSpecies))
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="flex justify-center">
      <svg width={width} height={height} className="border border-gray-200 rounded-lg">
        {/* Background */}
        <rect width={width} height={height} fill="#FAFAFA" />
        
        {/* Chart area */}
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Grid lines */}
          {yearTicks.map(year => (
            <line
              key={`grid-x-${year}`}
              x1={scaleX(year)}
              y1={0}
              x2={scaleX(year)}
              y2={chartHeight}
              stroke="#E5E7EB"
              strokeWidth={1}
            />
          ))}
          
          {speciesTicks.map(species => (
            <line
              key={`grid-y-${species}`}
              x1={0}
              y1={scaleY(species)}
              x2={chartWidth}
              y2={scaleY(species)}
              stroke="#E5E7EB"
              strokeWidth={1}
            />
          ))}

          {/* Accumulation curve */}
          <path
            d={pathData}
            fill="none"
            stroke={groupData.color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Area under curve */}
          <path
            d={`${pathData} L ${scaleX(maxYear)} ${chartHeight} L ${scaleX(minYear)} ${chartHeight} Z`}
            fill={groupData.color}
            fillOpacity={0.1}
          />

          {/* Data points (sized by effort) */}
          {groupData.data.map(point => {
            const cx = scaleX(point.year);
            const cy = scaleY(point.cumulativeSpecies);
            const isHovered = hoveredPoint?.year === point.year;
            return (
              <circle
                key={point.year}
                cx={cx}
                cy={cy}
                r={isHovered ? scaleCircleSize(point.effort || 1) * 1.3 : scaleCircleSize(point.effort || 1)}
                fill={groupData.color}
                stroke="white"
                strokeWidth={isHovered ? 3 : 2}
                opacity={isHovered ? 1 : 0.8}
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  const svg = e.currentTarget.ownerSVGElement;
                  if (svg) {
                    const rect = svg.getBoundingClientRect();
                    setHoveredPoint({
                      year: point.year,
                      species: point.cumulativeSpecies,
                      effort: point.effort || 0,
                      x: rect.left + cx + margin.left,
                      y: rect.top + cy + margin.top
                    });
                  }
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}

          {/* Axes */}
          <line x1={0} y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#374151" strokeWidth={2} />
          <line x1={0} y1={0} x2={0} y2={chartHeight} stroke="#374151" strokeWidth={2} />

          {/* X-axis labels */}
          {yearTicks.map(year => (
            <text
              key={`x-label-${year}`}
              x={scaleX(year)}
              y={chartHeight + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6B7280"
            >
              {year}
            </text>
          ))}

          {/* Y-axis labels */}
          {speciesTicks.map(species => (
            <text
              key={`y-label-${species}`}
              x={-15}
              y={scaleY(species) + 4}
              textAnchor="end"
              fontSize="12"
              fill="#6B7280"
            >
              {formatNumber(species)}
            </text>
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
            Year
          </text>
          
          <text
            x={-55}
            y={chartHeight / 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
            transform={`rotate(-90, -55, ${chartHeight / 2})`}
          >
            Cumulative Species Count
          </text>
        </g>
      </svg>

      {/* Custom Tooltip */}
      {hoveredPoint && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${hoveredPoint.x}px`,
            top: `${hoveredPoint.y - 80}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl border-2 border-white">
            <div className="text-sm font-semibold mb-1">Year {hoveredPoint.year}</div>
            <div className="text-sm">{hoveredPoint.species.toLocaleString()} cumulative species</div>
            <div className="text-sm font-medium mt-2 text-yellow-300">
              Circle size: {hoveredPoint.effort.toLocaleString()} occurrence records
            </div>
          </div>
          <div 
            className="w-3 h-3 bg-gray-900 border-r-2 border-b-2 border-white absolute left-1/2 -translate-x-1/2 -bottom-1.5 rotate-45"
          ></div>
        </div>
      )}
    </div>
  );
}