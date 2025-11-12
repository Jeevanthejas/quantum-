
import React from 'react';
import type { Difficulty } from '../../types';

interface DifficultySelectorProps {
    onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultyButton: React.FC<{ onClick: () => void, color: string, title: string, description: string }> = ({ onClick, color, title, description }) => (
    <button
        onClick={onClick}
        className={`p-6 rounded-lg border-2 text-left transition-all transform hover:scale-105 hover:shadow-2xl ${color}`}
    >
        <h3 className="font-bold text-xl mb-1 text-white">{title}</h3>
        <p className="text-sm text-slate-200/80">{description}</p>
    </button>
);


const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty }) => {
    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Welcome to Quantum Guess</h1>
                <p className="text-slate-400">Choose your difficulty to start the game.</p>
            </div>

            <div className="w-full bg-dark p-8 rounded-xl shadow-lg border border-slate-700/50 space-y-4">
                <DifficultyButton 
                    onClick={() => onSelectDifficulty('easy')}
                    color="border-green-500/50 bg-green-500/10 hover:bg-green-500/20"
                    title="Easy"
                    description="Probabilities are always 50% / 50%. A pure toss-up."
                />
                 <DifficultyButton 
                    onClick={() => onSelectDifficulty('medium')}
                    color="border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20"
                    title="Medium"
                    description="Probabilities are moderately skewed (e.g., 70% / 30%)."
                />
                 <DifficultyButton 
                    onClick={() => onSelectDifficulty('hard')}
                    color="border-red-500/50 bg-red-500/10 hover:bg-red-500/20"
                    title="Hard"
                    description="Probabilities are highly skewed (e.g., 90% / 10%). Can you beat the odds?"
                />
            </div>
        </div>
    );
};

export default DifficultySelector;