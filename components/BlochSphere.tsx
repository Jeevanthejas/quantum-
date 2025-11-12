
import React from 'react';
import type { BlochVector } from '../types';

interface BlochSphereProps {
  vector: BlochVector;
}

const BlochSphere: React.FC<BlochSphereProps> = ({ vector }) => {
  const [x, y, z] = vector;
  const size = 250;
  const center = size / 2;
  const radius = size / 2 - 10;

  // Project 3D vector to 2D plane (side view using x and z)
  const pointX = center + x * radius;
  const pointZ = center - z * radius; // SVG y-axis is inverted
  
  // Use 'y' component to influence color (e.g., from blue to purple)
  const colorT = (y + 1) / 2; // Normalize y from [-1, 1] to [0, 1]
  const red = 99 + colorT * (168 - 99);   // from rgb(99, 102, 241) -> primary
  const green = 102 + colorT * (85 - 102);  // to rgb(168, 85, 247) -> secondary
  const blue = 241 + colorT * (247 - 241);
  const pointColor = `rgb(${red}, ${green}, ${blue})`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Sphere outline and fill */}
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#475569" strokeWidth="2" />
      <circle cx={center} cy={center} r={radius} fill="rgba(30, 41, 59, 0.5)" />
      
      {/* Equator */}
      <ellipse cx={center} cy={center} rx={radius} ry={radius/10} fill="none" stroke="#475569" strokeDasharray="4 4" strokeWidth="1" />
      
      {/* Axes */}
      <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="#475569" strokeWidth="1" />
      <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="#475569" strokeWidth="1" />

      {/* Axis labels */}
      <text x={center} y={center - radius - 5} textAnchor="middle" fill="#94a3b8" fontSize="12">|0⟩ (z)</text>
      <text x={center} y={center + radius + 15} textAnchor="middle" fill="#94a3b8" fontSize="12">|1⟩</text>
      <text x={center + radius + 5} y={center + 4} textAnchor="start" fill="#94a3b8" fontSize="12">x</text>

      {/* State vector representation */}
      <line x1={center} y1={center} x2={pointX} y2={pointZ} stroke={pointColor} strokeWidth="2.5" />
      <circle cx={pointX} cy={pointZ} r="5" fill={pointColor} stroke="#0f172a" strokeWidth="2" />
    </svg>
  );
};

export default BlochSphere;
