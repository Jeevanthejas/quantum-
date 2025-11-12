
import React from 'react';
import type { GuessRound } from '../../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

interface GameSummaryProps {
    score: number;
    history: GuessRound[];
    onPlayAgain: () => void;
}

const GameSummary: React.FC<GameSummaryProps> = ({ score, history, onPlayAgain }) => {
    const totalRounds = history.length;
    const accuracy = totalRounds > 0 ? (score / totalRounds) * 100 : 0;
    
    // Calculate expected vs actual outcomes
    const expectedP0 = history.reduce((acc, round) => acc + round.p0, 0) / totalRounds;
    const actualZeros = history.filter(h => h.result === 0).length;
    const actualP0 = actualZeros / totalRounds;

    const comparisonData = [
        { name: 'Probability', 'Expected |0⟩': expectedP0 * 100, 'Actual |0⟩': actualP0 * 100 },
        { name: 'Probability', 'Expected |1⟩': (1 - expectedP0) * 100, 'Actual |1⟩': (1 - actualP0) * 100 },
    ];
    
    const outcomeCounts = [
        { name: '|0⟩', count: actualZeros },
        { name: '|1⟩', count: totalRounds - actualZeros },
    ];

    const colors = ["#6366f1", "#a855f7"];

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Game Over!</h1>
                <p className="text-slate-400">Here's how you did against the quantum odds.</p>
            </div>

            <div className="w-full bg-dark p-6 rounded-xl shadow-lg border border-slate-700/50 space-y-6">
                <div className="flex justify-around text-center bg-darker p-4 rounded-lg border border-slate-700">
                    <div>
                        <p className="text-sm text-slate-400 font-medium">Final Score</p>
                        <p className="text-3xl font-bold text-primary">{score} / {totalRounds}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-400 font-medium">Accuracy</p>
                        <p className="text-3xl font-bold text-primary">{accuracy.toFixed(0)}%</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-200 mb-2 text-center">Expected vs. Actual Outcomes</h3>
                     <div className="w-full h-56">
                        <ResponsiveContainer>
                           <BarChart data={comparisonData} layout="vertical" margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                                <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                                <YAxis type="category" dataKey="name" stroke="#94a3b8" hide />
                                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}} />
                                <Legend />
                                <Bar dataKey="Expected |0⟩" stackId="a" fill="#6366f1" radius={[4, 0, 0, 4]} />
                                <Bar dataKey="Expected |1⟩" stackId="a" fill="#a855f7" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="Actual |0⟩" stackId="b" fill="#6366f1" fillOpacity="0.6" radius={[4, 0, 0, 4]} />
                                <Bar dataKey="Actual |1⟩" stackId="b" fill="#a855f7" fillOpacity="0.6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="w-full bg-dark p-6 rounded-xl shadow-lg border border-slate-700/50 text-center space-y-4">
                 <p className="text-slate-300">
                    <strong>Learning takeaway:</strong> Even when |0⟩ had a high chance, |1⟩ sometimes appeared. Over many rounds, the results approach the expected probabilities, but each individual quantum event is fundamentally uncertain.
                </p>
                 <button
                    onClick={onPlayAgain}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-100"
                >
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default GameSummary;