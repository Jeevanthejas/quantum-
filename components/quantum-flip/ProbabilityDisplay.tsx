
import React from 'react';
import type { Probabilities } from '../../types';
import { HeadsIcon, TailsIcon } from '../Icons';

interface ProbabilityDisplayProps {
    probabilities: Probabilities;
}

const ProbabilityBar: React.FC<{ label: string; value: number; colorClass: string; icon: React.ReactNode }> = ({ label, value, colorClass, icon }) => (
    <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 ${colorClass}`}>
            {icon}
        </div>
        <div className="w-full bg-darker rounded-full h-6 border border-slate-700">
            <div
                className="bg-gradient-to-r from-slate-600 to-current h-6 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${value * 100}%` }}
            ></div>
        </div>
        <span className={`font-mono font-semibold text-lg w-20 text-right ${colorClass}`}>
            {(value * 100).toFixed(1)}%
        </span>
    </div>
);


const ProbabilityDisplay: React.FC<ProbabilityDisplayProps> = ({ probabilities }) => {
    return (
        <div className="space-y-4">
            <ProbabilityBar 
                label="Heads" 
                value={probabilities.p0} 
                colorClass="text-yellow-400"
                icon={<HeadsIcon className="w-6 h-6" />}
            />
            <ProbabilityBar 
                label="Tails" 
                value={probabilities.p1} 
                colorClass="text-indigo-400"
                icon={<TailsIcon className="w-6 h-6" />}
            />
        </div>
    );
};

export default ProbabilityDisplay;
