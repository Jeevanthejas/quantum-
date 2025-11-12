
import React from 'react';
import { InfoIcon } from './Icons';

const Step = ({ number, text }: { number: string, text: React.ReactNode }) => (
    <div className="bg-darker p-4 rounded-lg flex items-center space-x-4 h-full">
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary font-bold text-lg">
        {number}
      </div>
      <p className="text-sm text-slate-300">{text}</p>
    </div>
);


const HowItWorks: React.FC = () => {
  return (
    <div className="bg-dark p-6 rounded-xl shadow-lg border border-slate-700/50 mb-8">
      <h2 className="text-xl font-bold mb-4 text-slate-200 flex items-center">
        <InfoIcon className="mr-3 text-primary h-6 w-6" />
        How The Simulation Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Step number="1" text={<>Starts with the qubit in the <strong>|0⟩</strong> state.</>} />
        <Step number="2" text={<>A <strong>Hadamard gate</strong> creates superposition.</>} />
        <Step number="3" text={<>The <strong>θ slider</strong> rotates the state around the Y-axis.</>} />
        <Step number="4" text={<><strong>Measuring</strong> collapses the state to |0⟩ or |1⟩.</>} />
      </div>
    </div>
  );
};

export default HowItWorks;
