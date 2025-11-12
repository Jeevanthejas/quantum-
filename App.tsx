
import React, { useState, useEffect, useMemo } from 'react';
import { runSimulation, getBlochVector, simulateMeasurements, sweepTheta } from './services/quantumSimulator';
import type { QubitState, BlochVector, MeasurementCounts, Probabilities, SweepData } from './types';
import ControlPanel from './components/ControlPanel';
import BlochSphere from './components/BlochSphere';
import MeasurementHistogram from './components/MeasurementHistogram';
import ProbabilityPlot from './components/ProbabilityPlot';
import { GithubIcon } from './components/Icons';

interface SimulationResult {
  state: QubitState;
  blochVector: BlochVector;
  probabilities: Probabilities;
  counts: MeasurementCounts;
}

export default function App() {
  const [theta, setTheta] = useState<number>(Math.PI / 2);
  const [shots, setShots] = useState<number>(1024);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const probabilitySweepData: SweepData[] = useMemo(() => sweepTheta(), []);

  useEffect(() => {
    const { state, probabilities } = runSimulation(theta);
    const blochVector = getBlochVector(state);
    const counts = simulateMeasurements(state, shots);

    setSimulationResult({
      state,
      blochVector,
      probabilities,
      counts,
    });
  }, [theta, shots]);

  return (
    <div className="min-h-screen bg-darker text-slate-200 flex flex-col">
      <header className="bg-dark/50 backdrop-blur-sm p-4 border-b border-slate-700/50 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Quantum Game Simulator
          </h1>
           <a href="https://github.com/google/generative-ai-docs/tree/main/app-development/web" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <GithubIcon />
          </a>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ControlPanel
              theta={theta}
              onThetaChange={setTheta}
              shots={shots}
              onShotsChange={setShots}
              stateVector={simulationResult?.state}
              probabilities={simulationResult?.probabilities}
            />
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-dark rounded-xl shadow-lg p-4 flex flex-col justify-center items-center border border-slate-700/50">
              <h2 className="text-lg font-semibold mb-4 text-slate-300">Bloch Sphere</h2>
              {simulationResult && <BlochSphere vector={simulationResult.blochVector} />}
            </div>

            <div className="bg-dark rounded-xl shadow-lg p-4 flex flex-col border border-slate-700/50">
              <h2 className="text-lg font-semibold mb-4 text-slate-300">Measurement Histogram</h2>
              {simulationResult && <MeasurementHistogram data={simulationResult.counts} shots={shots} />}
            </div>
            
            <div className="md:col-span-2 bg-dark rounded-xl shadow-lg p-4 flex flex-col border border-slate-700/50">
              <h2 className="text-lg font-semibold mb-4 text-slate-300">Probability P(|0>) vs. θ</h2>
              <ProbabilityPlot data={probabilitySweepData} currentTheta={theta} />
            </div>
          </div>
        </div>
      </main>
       <footer className="text-center p-4 text-slate-500 text-sm border-t border-slate-700/50 mt-8">
          Inspired by ScienceAtHome Quantum Games. Built with React, TypeScript, and Tailwind CSS.
      </footer>
    </div>
  );
}
