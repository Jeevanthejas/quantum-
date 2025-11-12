
export interface Complex {
  re: number;
  im: number;
}

export type QubitState = [Complex, Complex];

export type BlochVector = [number, number, number]; // [x, y, z]

export interface MeasurementCounts {
  '0': number;
  '1': number;
}

export interface Probabilities {
    p0: number;
    p1: number;
}

export interface SweepData {
    theta: number;
    prob: number;
}

export type FlipResult = 'Heads' | 'Tails';

export type Guess = 0 | 1;

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GuessRound {
    guess: Guess;
    result: Guess;
    isCorrect: boolean;
    p0: number;
}