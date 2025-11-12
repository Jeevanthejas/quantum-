
import React from 'react';

interface QuantumCoinProps {
    theta: number;
    isFlipping: boolean;
}

const QuantumCoin: React.FC<QuantumCoinProps> = ({ theta, isFlipping }) => {
    // Normalize theta from [0, PI] to [0, 1] for color interpolation
    const t = theta / Math.PI;

    // Interpolate between Heads color (yellow) and Tails color (indigo)
    const r = 250 + t * (79 - 250); // yellow-400 -> indigo-500
    const g = 204 + t * (70 - 204);
    const b = 21 + t * (229 - 21);
    
    // Rotation for tilt effect: map [0, PI] to [-90deg, 90deg]
    const rotationX = (t - 0.5) * 180;

    return (
        <div className="relative" style={{ perspective: '800px' }}>
             <div
                className={`w-32 h-32 rounded-full border-4 transition-transform duration-300 ease-out flex items-center justify-center
                    ${isFlipping ? 'animate-flip' : ''}`}
                style={{
                    borderColor: `rgb(${r}, ${g}, ${b})`,
                    background: `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.1) 0%, rgba(30, 41, 59, 0.5) 70%)`,
                    transform: `rotateX(${rotationX}deg)`,
                    boxShadow: `0 0 40px rgba(${r}, ${g}, ${b}, 0.5)`
                }}
            >
                <span className="font-bold text-4xl text-slate-400" style={{ transform: 'rotateX(-90deg) translateZ(64px)'}}>|1⟩</span>
                 <span className="font-bold text-4xl text-slate-400" style={{ transform: 'rotateX(90deg) translateZ(64px) '}}>|0⟩</span>
            </div>
            <style>
                {`
                @keyframes flip {
                    0% { transform: rotateX(${rotationX}deg) rotateY(0deg); }
                    100% { transform: rotateX(${rotationX}deg) rotateY(360deg); }
                }
                .animate-flip {
                    animation: flip 0.5s ease-in-out;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                `}
            </style>
        </div>
    );
};

export default QuantumCoin;
