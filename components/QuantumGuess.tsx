
import React, { useState, useEffect } from 'react';
import { generateRoundProbability, getMeasurement } from '../services/guessingGame';
import type { Guess, Difficulty, GuessRound } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';
import Scoreboard from './quantum-guess/Scoreboard';
import GameSummary from './quantum-guess/GameSummary';
import DifficultySelector from './quantum-guess/DifficultySelector';
import RoundProbability from './quantum-guess/RoundProbability';
import LearnMore from './quantum-guess/LearnMore';

const MAX_ROUNDS = 10;

type GameState = 'selectingDifficulty' | 'playing' | 'summary';

export default function QuantumGuess() {
    const [gameState, setGameState] = useState<GameState>('selectingDifficulty');
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [currentP0, setCurrentP0] = useState(0.5);
    const [history, setHistory] = useState<GuessRound[]>([]);
    const [isGuessing, setIsGuessing] = useState(false);
    const [lastResult, setLastResult] = useState<GuessRound | null>(null);

    const startGame = (selectedDifficulty: Difficulty) => {
        setDifficulty(selectedDifficulty);
        setRound(1);
        setScore(0);
        setCurrentP0(generateRoundProbability(selectedDifficulty));
        setHistory([]);
        setLastResult(null);
        setIsGuessing(false);
        setGameState('playing');
    };

    const handleGuess = (guess: Guess) => {
        if (isGuessing || gameState !== 'playing') return;
        
        setIsGuessing(true);
        const result = getMeasurement(currentP0);
        const isCorrect = guess === result;
        const newResult: GuessRound = { guess, result, isCorrect, p0: currentP0 };

        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        setLastResult(newResult);
        setHistory(prev => [...prev, newResult]);
        
        setTimeout(() => {
            if (round < MAX_ROUNDS) {
                setRound(prev => prev + 1);
                if (difficulty) {
                    setCurrentP0(generateRoundProbability(difficulty));
                }
                setLastResult(null);
                setIsGuessing(false);
            } else {
                setGameState('summary');
            }
        }, 1500);
    };
    
    const handlePlayAgain = () => {
        setGameState('selectingDifficulty');
    }

    if (gameState === 'selectingDifficulty') {
        return <DifficultySelector onSelectDifficulty={startGame} />;
    }
    
    if (gameState === 'summary') {
        return <GameSummary score={score} history={history} onPlayAgain={handlePlayAgain} />;
    }

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Quantum Guess 2.0</h1>
                <p className="text-slate-400">The odds are revealed, but the outcome is still uncertain. Can you guess correctly?</p>
            </div>

            <div className="w-full bg-dark p-6 rounded-xl shadow-lg border border-slate-700/50 space-y-6">
                <Scoreboard round={round} maxRounds={MAX_ROUNDS} score={score} />
                
                <RoundProbability p0={currentP0} />

                <div className="h-24 flex justify-center items-center">
                    {lastResult ? (
                        <div className={`flex items-center gap-3 text-2xl font-bold animate-fade-in ${lastResult.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                           {lastResult.isCorrect ? <CheckCircleIcon className="h-8 w-8" /> : <XCircleIcon className="h-8 w-8" />}
                           <span>
                            {lastResult.isCorrect ? "Correct!" : `Incorrect! The result was ${lastResult.result}.`}
                           </span>
                        </div>
                    ) : (
                       <p className="text-slate-400 text-lg">Make your guess based on the odds:</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => handleGuess(0)}
                        disabled={isGuessing}
                        className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-4 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 text-3xl"
                    >
                        |0⟩
                    </button>
                    <button 
                        onClick={() => handleGuess(1)}
                        disabled={isGuessing}
                        className="bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-4 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 text-3xl"
                    >
                        |1⟩
                    </button>
                </div>
            </div>
            <LearnMore />
        </div>
    );
}