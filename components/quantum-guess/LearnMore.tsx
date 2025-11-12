
import React from 'react';

const LearnMore: React.FC = () => {
    return (
        <div className="w-full bg-dark p-4 rounded-xl shadow-lg border border-slate-700/50">
            <details className="text-sm text-slate-300 group">
                <summary className="font-semibold text-slate-200 cursor-pointer list-none flex items-center justify-between">
                    <span>Learn More: Why is this "Quantum"?</span>
                    <span className="transition-transform duration-200 group-open:rotate-90">▶</span>
                </summary>
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <p>
                        In a normal computer, a bit is either 0 or 1. But in a quantum computer, a "qubit" can be a mix of both at once (this is called superposition).
                    </p>
                    <br/>
                    <p>
                        When you measure a qubit, it "collapses" and is forced to choose: 0 or 1. This choice isn't guaranteed. Even with a 90% chance of being 0, there's still a 10% chance it will surprise you and collapse to 1. This built-in randomness is a fundamental (and strange!) part of quantum physics. This game lets you experience that uncertainty firsthand.
                    </p>
                </div>
            </details>
        </div>
    );
};

export default LearnMore;
