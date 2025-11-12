
import React from 'react';
import type { QubitState, Probabilities } from '../types';
import Slider from './ui/Slider';
import { InfoIcon } from './Icons';

interface ControlPanelProps {
  theta: number;
  onThetaChange: (value: number) => void;
  shots: number;
  onShotsChange: (value: number) => void;
  stateVector: QubitState | undefined;
  probabilities: Probabilities | undefined;
}

const formatComplex = (c: { re: number; im: number }) => {
    const reStr = c.re.toFixed(3);
    const imStr = Math.abs(c.im).toFixed(3);
    const sign = c.im < 0 ? '-' : '+';
    return `${reStr} ${sign} ${imStr}i`;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  theta,
  onThetaChange,
  shots,
  onShotsChange,
  stateVector,
  probabilities,
}) => {
  return (
    <div className="bg-dark p-6 rounded-xl shadow-lg space-y-8 border border-slate-700/50">
      <div>
        <h2 className="text-xl font-bold mb-4 text-slate-200">Controls</h2>
        <div className="space-y-6">
          <Slider
            label="Rotation Angle (θ)"
            min={0}
            max={Math.PI}
            step={0.01}
            value={theta}
            onChange={(e) => onThetaChange(parseFloat(e.target.value))}
            displayValue={`${(theta * 180 / Math.PI).toFixed(1)}°`}
          />
          <Slider
            label="Measurement Shots"
            min={1}
            max={4096}
            step={1}
            value={shots}
            onChange={(e) => onShotsChange(parseInt(e.target.value))}
            displayValue={shots.toString()}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-slate-200">Quantum State</h2>
        <div className="bg-darker p-4 rounded-lg text-sm space-y-2 font-mono">
            <p className="text-slate-400">// Statevector |ψ⟩ = α|0⟩ + β|1⟩</p>
            <p>α: <span className="text-cyan-400">{stateVector ? formatComplex(stateVector[0]) : '...'}</span></p>
            <p>β: <span className="text-cyan-400">{stateVector ? formatComplex(stateVector[1]) : '...'}</span></p>
            <hr className="border-slate-700 my-3" />
            <p className="text-slate-400">// Probabilities</p>
            <p>P(|0⟩): <span className="text-green-400">{probabilities ? probabilities.p0.toFixed(4) : '...'}</span></p>
            <p>P(|1⟩): <span className="text-green-400">{probabilities ? probabilities.p1.toFixed(4) : '...'}</span></p>
        </div>
      </div>
      
      <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg text-sm text-indigo-200">
        <h3 className="font-semibold text-base mb-2 flex items-center"><InfoIcon className="mr-2" />How it works</h3>
        <p>Your controls change a simulated qubit. <br />
        1. We start with state |0⟩. <br />
        2. A Hadamard gate creates a superposition. <br />
        3. The <strong>θ slider</strong> rotates the state. <br/>
        4. "Measuring" collapses the state to |0⟩ or |1⟩ based on final probabilities.</p>
      </div>

    </div>
  );
};

export default ControlPanel;
