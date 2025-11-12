
import type { Guess, Difficulty } from '../types';

/**
 * Generates a probability for measuring '0' based on the selected difficulty.
 * @param difficulty - The chosen game difficulty.
 * @returns A probability value for the round.
 */
export const generateRoundProbability = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 'easy':
      return 0.5;
    case 'medium': {
      // Skewed probabilities, e.g., 60-80% or 20-40%
      const base = Math.random() * 0.2 + 0.6; // 0.6 to 0.8
      return Math.random() < 0.5 ? base : 1 - base;
    }
    case 'hard': {
      // Highly skewed probabilities, e.g., 85-95% or 5-15%
      const base = Math.random() * 0.1 + 0.85; // 0.85 to 0.95
      return Math.random() < 0.5 ? base : 1 - base;
    }
    default:
      return 0.5;
  }
};


/**
 * Simulates a single quantum measurement.
 * @param p0 - The probability of measuring '0'.
 * @returns The measurement outcome, 0 or 1.
 */
export const getMeasurement = (p0: number): Guess => {
  return Math.random() < p0 ? 0 : 1;
};