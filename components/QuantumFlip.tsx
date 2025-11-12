
import React, { useState, useEffect } from 'react';
import { runFlipSimulation, simulateMeasurements } from '../services/quantumSimulator';
import type { QubitState, Probabilities, FlipResult } from '../types';
import Slider from './ui/Slider';
import QuantumCoin from './quantum-flip/QuantumCoin';
import ProbabilityDisplay from './quantum-flip/ProbabilityDisplay';
import { HeadsIcon, TailsIcon } from './Icons';

export default function QuantumFlip() {
    const [theta, setTheta] = useState<number>(Math.PI / 2);
    const [state, setState] = useState<QubitState | null>(null);
    const [probabilities, setProbabilities] = useState<Probabilities | null>(null);
    const [result, setResult] = useState<FlipResult | null>(null);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        const { state, probabilities } = runFlipSimulation(theta);
        setState(state);
        setProbabilities(probabilities);
        setResult(null); // Reset result when angle changes
    }, [theta]);

    const handleFlip = () => {
        if (!state || isFlipping) return;

        setIsFlipping(true);
        const measurement = simulateMeasurements(state, 1);
        
        setTimeout(() => {
            setResult(measurement['0'] === 1 ? 'Heads' : 'Tails');
            setIsFlipping(false);
        }, 500); // Corresponds to animation duration
    };

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Quantum Flip</h1>
                <p className="text-slate-400">An interactive quantum coin flip to learn about superposition and measurement.</p>
            </div>
            
            <div className="w-full bg-dark p-6 rounded-xl shadow-lg border border-slate-700/50 space-y-6">
                <div className="h-48 flex justify-center items-center">
                    <QuantumCoin theta={theta} isFlipping={isFlipping} />
                </div>
                
                {probabilities && <ProbabilityDisplay probabilities={probabilities} />}
                
                <div className="h-20 flex justify-center items-center">
                    {result && !isFlipping ? (
                        <div className="flex items-center gap-4 text-2xl font-bold animate-fade-in">
                            {result === 'Heads' ? 
                                <HeadsIcon className="h-8 w-8 text-yellow-400" /> : 
                                <TailsIcon className="h-8 w-8 text-indigo-400" />
                            }
                            <span>You got <span className={result === 'Heads' ? 'text-yellow-400' : 'text-indigo-400'}>{result}!</span></span>
                        </div>
                    ) : (
                        <div className="text-slate-500">Click flip to see the outcome!</div>
                    )}
                </div>
            </div>

            <div className="w-full bg-dark p-6 rounded-xl shadow-lg border border-slate-700/50 space-y-6">
                 <Slider
                    label="Coin Angle (θ)"
                    min={0}
                    max={Math.PI}
                    step={0.01}
                    value={theta}
                    onChange={(e) => setTheta(parseFloat(e.target.value))}
                    displayValue={`${(theta * 180 / Math.PI).toFixed(0)}°`}
                />
                <button
                    onClick={handleFlip}
                    disabled={isFlipping}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100"
                >
                    {isFlipping ? 'Flipping...' : 'Flip the Quantum Coin!'}
                </button>
            </div>

             <div className="w-full bg-dark p-6 rounded-xl shadow-lg border border-slate-700/50 text-sm text-slate-300 space-y-2">
                <h3 className="font-bold text-lg text-slate-200">How it works:</h3>
                <p><strong className="text-primary">Angle 0° (|0⟩):</strong> Always results in Heads.</p>
                <p><strong className="text-secondary">Angle 180° (|1⟩):</strong> Always results in Tails.</p>
                <p><strong className="text-green-400">In between:</strong> The coin is in a <span className="font-semibold">superposition</span>. The outcome is probabilistic, determined by the angle you set. When you flip, the superposition "collapses" to a definite state of either Heads or Tails.</p>
            </div>
        </div>
    );
}
