
import React from 'react';

interface ScoreboardProps {
    round: number;
    maxRounds: number;
    score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ round, maxRounds, score }) => {
    return (
        <div className="flex justify-around text-center bg-darker p-4 rounded-lg border border-slate-700">
            <div>
                <p className="text-sm text-slate-400 font-medium">Round</p>
                <p className="text-2xl font-bold text-slate-200">{round} / {maxRounds}</p>
            </div>
            <div>
                <p className="text-sm text-slate-400 font-medium">Score</p>
                <p className="text-2xl font-bold text-primary">{score}</p>
            </div>
        </div>
    );
};

export default Scoreboard;
