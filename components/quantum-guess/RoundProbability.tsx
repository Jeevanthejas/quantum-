
import React from 'react';

interface RoundProbabilityProps {
    p0: number;
}

const ProbabilityBar: React.FC<{ value: number; label: string, colorClass: string }> = ({ value, label, colorClass }) => (
    <div className="w-full bg-darker rounded-full h-8 border border-slate-700 overflow-hidden relative">
        <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
            style={{ width: `${value * 100}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center px-4">
             <span className="font-bold text-slate-200">{label}</span>
             <span className="ml-auto font-mono font-semibold text-slate-200">
                {(value * 100).toFixed(1)}%
            </span>
        </div>
    </div>
);


const RoundProbability: React.FC<RoundProbabilityProps> = ({ p0 }) => {
    const p1 = 1 - p0;
    return (
        <div className="space-y-3">
            <p className="text-center text-sm font-medium text-slate-400">Probabilities for this round:</p>
            <div className="flex flex-col md:flex-row gap-3">
                 <ProbabilityBar value={p0} label="|0⟩" colorClass="bg-primary" />
                 <ProbabilityBar value={p1} label="|1⟩" colorClass="bg-secondary" />
            </div>
        </div>
    );
};

export default RoundProbability;