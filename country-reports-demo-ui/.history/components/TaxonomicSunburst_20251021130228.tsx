import { useState } from 'react';
import { TaxonomicGroup } from '../data/api';

interface TaxonomicSunburstProps {
  taxonomicGroups: TaxonomicGroup[];
}

interface SunburstNode {
  name: string;
  value: number;
  color: string;
  children?: SunburstNode[];
}

interface TooltipData {
  name: string;
  species: number;
  percentage?: number;
  x: number;
  y: number;
}

export function TaxonomicSunburst({ taxonomicGroups }: TaxonomicSunburstProps) {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Create hierarchical structure for sunburst
  const createHierarchy = (): SunburstNode => {
    // Categorize groups into kingdoms
    const animalGroups = ['Amphibians', 'Arachnids', 'Birds', 'Fish', 'Insects', 'Mammals', 'Molluscs', 'Reptiles'];
    const plantGroups = ['Ferns', 'Floweringplants', 'Mosses'];
    const fungiGroups = ['Basidiomycota', 'Sacfungi'];

    const animals = taxonomicGroups.filter(g => animalGroups.includes(g.group));
    const plants = taxonomicGroups.filter(g => plantGroups.includes(g.group));
    const fungi = taxonomicGroups.filter(g => fungiGroups.includes(g.group));
    const other = taxonomicGroups.filter(g => g.group === 'Other');

    const totalSpecies = taxonomicGroups.reduce((sum, g) => sum + g.species, 0);

    return {
      name: 'Total',
      value: totalSpecies,
      color: '#4F4C4D',
      children: [
        {
          name: 'Animals',
          value: animals.reduce((sum, g) => sum + g.species, 0),
          color: '#0079B5',
          children: animals.map(g => ({
            name: g.group,
            value: g.species,
            color: g.color
          }))
        },
        {
          name: 'Plants',
          value: plants.reduce((sum, g) => sum + g.species, 0),
          color: '#4C9B45',
          children: plants.map(g => ({
            name: g.group,
            value: g.species,
            color: g.color
          }))
        },
        {
          name: 'Fungi',
          value: fungi.reduce((sum, g) => sum + g.species, 0),
          color: '#684393',
          children: fungi.map(g => ({
            name: g.group,
            value: g.species,
            color: g.color
          }))
        },
        ...(other.length > 0 ? [{
          name: 'Other',
          value: other.reduce((sum, g) => sum + g.species, 0),
          color: '#999999',
          children: other.map(g => ({
            name: g.group,
            value: g.species,
            color: g.color
          }))
        }] : [])
      ]
    };
  };

  const hierarchy = createHierarchy();
  const centerX = 250;
  const centerY = 250;
  const innerRadius = 60;
  const midRadius = 120;
  const outerRadius = 200;

  // Calculate arc path
  const describeArc = (x: number, y: number, radius1: number, radius2: number, startAngle: number, endAngle: number) => {
    const start1X = x + radius1 * Math.cos((startAngle - 90) * Math.PI / 180);
    const start1Y = y + radius1 * Math.sin((startAngle - 90) * Math.PI / 180);
    const end1X = x + radius1 * Math.cos((endAngle - 90) * Math.PI / 180);
    const end1Y = y + radius1 * Math.sin((endAngle - 90) * Math.PI / 180);
    
    const start2X = x + radius2 * Math.cos((endAngle - 90) * Math.PI / 180);
    const start2Y = y + radius2 * Math.sin((endAngle - 90) * Math.PI / 180);
    const end2X = x + radius2 * Math.cos((startAngle - 90) * Math.PI / 180);
    const end2Y = y + radius2 * Math.sin((startAngle - 90) * Math.PI / 180);

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      `M ${start1X} ${start1Y}`,
      `A ${radius1} ${radius1} 0 ${largeArcFlag} 1 ${end1X} ${end1Y}`,
      `L ${start2X} ${start2Y}`,
      `A ${radius2} ${radius2} 0 ${largeArcFlag} 0 ${end2X} ${end2Y}`,
      'Z'
    ].join(' ');
  };

  // Render sunburst segments
  const renderSegments = () => {
    const segments: JSX.Element[] = [];
    let currentAngle = 0;
    const total = hierarchy.value;

    // Render inner ring (kingdoms)
    hierarchy.children?.forEach((category, categoryIndex) => {
      const angleSize = (category.value / total) * 360;
      const endAngle = currentAngle + angleSize;
      
      const path = describeArc(centerX, centerY, innerRadius, midRadius, currentAngle, endAngle);
      const isHovered = hoveredSegment === category.name;
      
      segments.push(
        <g key={`category-${categoryIndex}`}>
          <path
            d={path}
            fill={category.color}
            stroke="white"
            strokeWidth="2"
            opacity={isHovered ? 1 : 0.85}
            style={{ 
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={() => setHoveredSegment(category.name)}
            onMouseLeave={() => setHoveredSegment(null)}
          />
          {angleSize > 15 && (
            <text
              x={centerX + (innerRadius + midRadius) / 2 * Math.cos((currentAngle + angleSize / 2 - 90) * Math.PI / 180)}
              y={centerY + (innerRadius + midRadius) / 2 * Math.sin((currentAngle + angleSize / 2 - 90) * Math.PI / 180)}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="500"
              pointerEvents="none"
            >
              {category.name}
            </text>
          )}
        </g>
      );

      // Render outer ring (specific groups)
      let subAngle = currentAngle;
      category.children?.forEach((group, groupIndex) => {
        const subAngleSize = (group.value / category.value) * angleSize;
        const subEndAngle = subAngle + subAngleSize;
        
        const subPath = describeArc(centerX, centerY, midRadius, outerRadius, subAngle, subEndAngle);
        const isSubHovered = hoveredSegment === group.name;
        
        segments.push(
          <g key={`group-${categoryIndex}-${groupIndex}`}>
            <path
              d={subPath}
              fill={group.color}
              stroke="white"
              strokeWidth="2"
              opacity={isSubHovered ? 1 : 0.7}
              style={{ 
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={() => setHoveredSegment(group.name)}
              onMouseLeave={() => setHoveredSegment(null)}
            />
          </g>
        );
        
        subAngle = subEndAngle;
      });

      currentAngle = endAngle;
    });

    return segments;
  };

  return (
    <div className="flex flex-col items-center">
      <svg width="500" height="500" viewBox="0 0 500 500" className="max-w-full">
        {/* Center circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="#F8F9FA"
          stroke="#4F4C4D"
          strokeWidth="2"
        />
        
        {/* Center text */}
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          fill="#4F4C4D"
          fontSize="14"
          fontWeight="600"
        >
          Total Species
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          fill="#4F4C4D"
          fontSize="20"
          fontWeight="700"
        >
          {hierarchy.value.toLocaleString()}
        </text>

        {/* Render all segments */}
        {renderSegments()}
      </svg>

      {/* Legend */}
      {hoveredSegment && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
          <div className="text-center">
            <span className="font-medium">{hoveredSegment}</span>
            <span className="text-gray-600 ml-2">
              {taxonomicGroups.find(g => g.group === hoveredSegment)?.species.toLocaleString() ||
               hierarchy.children?.find(c => c.name === hoveredSegment)?.value.toLocaleString()} species
            </span>
          </div>
        </div>
      )}

      {/* Key for rings */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p><span style={{ color: '#4F4C4D' }}>●</span> Inner ring: Major taxonomic kingdoms</p>
        <p className="mt-1"><span style={{ color: '#4F4C4D' }}>●</span> Outer ring: Specific taxonomic groups</p>
      </div>
    </div>
  );
}
