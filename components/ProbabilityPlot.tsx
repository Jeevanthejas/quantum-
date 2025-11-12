
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Label } from 'recharts';
import type { SweepData } from '../types';

interface ProbabilityPlotProps {
  data: SweepData[];
  currentTheta: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-darker/80 backdrop-blur-sm p-2 border border-slate-700 rounded-md shadow-lg text-sm">
        <p className="label">{`θ: ${(label * 180 / Math.PI).toFixed(1)}°`}</p>
        <p className="desc">{`P(|0⟩): ${payload[0].value.toFixed(3)}`}</p>
      </div>
    );
  }

  return null;
};

const ProbabilityPlot: React.FC<ProbabilityPlotProps> = ({ data, currentTheta }) => {
    const currentPoint = data.find(d => Math.abs(d.theta - currentTheta) < 0.02) || {theta: currentTheta, prob: 0};
    if (data.length > 0 && !data.find(d => Math.abs(d.theta - currentTheta) < 0.02)) {
        // A rough interpolation if the exact point isn't in our sweep data
        const p0 = (Math.cos(currentTheta / 2) - Math.sin(currentTheta/2)) ** 2 / 2;
        currentPoint.prob = p0;
    }


  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="theta" 
            type="number" 
            domain={[0, Math.PI]} 
            stroke="#94a3b8" 
            ticks={[0, Math.PI/2, Math.PI]}
            tickFormatter={(tick) => {
                if (tick === 0) return '0';
                if (Math.abs(tick - Math.PI/2) < 1e-6) return 'π/2';
                if (Math.abs(tick - Math.PI) < 1e-6) return 'π';
                return '';
            }}
          >
             <Label value="Angle θ (radians)" offset={-15} position="insideBottom" fill="#94a3b8" />
          </XAxis>
          <YAxis domain={[0, 1]} stroke="#94a3b8">
            <Label value="P(|0⟩)" angle={-90} position="insideLeft" fill="#94a3b8" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="prob" stroke="#6366f1" strokeWidth={2} dot={false} />
          <ReferenceDot x={currentTheta} y={currentPoint.prob} r={5} fill="#a855f7" stroke="#0f172a" strokeWidth={2} isFront={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProbabilityPlot;
