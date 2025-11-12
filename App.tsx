
import React, { useState } from 'react';
import { GithubIcon } from './components/Icons';
import Simulator from './components/Simulator';
import QuantumFlip from './components/QuantumFlip';
import QuantumGuess from './components/QuantumGuess';

type View = 'simulator' | 'flip' | 'guess';

const NavButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            active ? 'bg-primary text-white' : 'text-slate-400 hover:bg-dark hover:text-slate-200'
        }`}
    >
        {children}
    </button>
);

export default function App() {
  const [view, setView] = useState<View>('simulator');

  return (
    <div className="min-h-screen bg-darker text-slate-200 flex flex-col">
      <header className="bg-dark/50 backdrop-blur-sm p-4 border-b border-slate-700/50 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 md:gap-8">
                <h1 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary whitespace-nowrap">
                    Quantum Simulators
                </h1>
                <nav className="flex items-center gap-1 md:gap-2 bg-darker p-1 rounded-lg border border-slate-700/50">
                    <NavButton active={view === 'simulator'} onClick={() => setView('simulator')}>
                        Simulator
                    </NavButton>
                    <NavButton active={view === 'flip'} onClick={() => setView('flip')}>
                        Flip Game
                    </NavButton>
                     <NavButton active={view === 'guess'} onClick={() => setView('guess')}>
                        Guess Game
                    </NavButton>
                </nav>
            </div>
           <a href="https://github.com/google/generative-ai-docs/tree/main/app-development/web" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <GithubIcon />
          </a>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        {view === 'simulator' && <Simulator />}
        {view === 'flip' && <QuantumFlip />}
        {view === 'guess' && <QuantumGuess />}
      </main>
       <footer className="text-center p-4 text-slate-500 text-sm border-t border-slate-700/50 mt-8">
          Inspired by ScienceAtHome Quantum Games. Built with React, TypeScript, and Tailwind CSS.
      </footer>
    </div>
  );
}
