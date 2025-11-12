
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { MeasurementCounts } from '../types';

interface MeasurementHistogramProps {
  data: MeasurementCounts;
  shots: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { count, probability } = payload[0].payload;
    return (
      <div className="bg-darker/80 backdrop-blur-sm p-2 border border-slate-700 rounded-md shadow-lg text-sm">
        <p className="label">{`State: |${label}⟩`}</p>
        <p className="intro">{`Count: ${count}`}</p>
        <p className="desc">{`Probability: ${(probability * 100).toFixed(1)}%`}</p>
      </div>
    );
  }
  return null;
};


const MeasurementHistogram: React.FC<MeasurementHistogramProps> = ({ data, shots }) => {
  const chartData = [
    { name: '0', count: data['0'], probability: data['0'] / shots },
    { name: '1', count: data['1'], probability: data['1'] / shots },
  ];
  
  const colors = ["#6366f1", "#a855f7"]; // Primary, Secondary

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#94a3b8" tickFormatter={(value) => `|${value}⟩`} />
          <YAxis stroke="#94a3b8" domain={[0, shots]}/>
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MeasurementHistogram;
