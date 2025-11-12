
import React, { useState, useEffect, useMemo } from 'react';
import { runSimulation, getBlochVector, simulateMeasurements, sweepTheta } from '../services/quantumSimulator';
import type { QubitState, BlochVector, MeasurementCounts, Probabilities, SweepData } from '../types';
import ControlPanel from './ControlPanel';
import BlochSphere from './BlochSphere';
import MeasurementHistogram from './MeasurementHistogram';
import ProbabilityPlot from './ProbabilityPlot';
import HowItWorks from './HowItWorks';

interface SimulationResult {
  state: QubitState;
  blochVector: BlochVector;
  probabilities: Probabilities;
  counts: MeasurementCounts;
}

export default function Simulator() {
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
    <>
      <HowItWorks />
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
            <h2 className="text-lg font-semibold mb-4 text-slate-300">Probability P(|0⟩) vs. θ</h2>
            <ProbabilityPlot data={probabilitySweepData} currentTheta={theta} />
          </div>
        </div>
      </div>
    </>
  );
}
