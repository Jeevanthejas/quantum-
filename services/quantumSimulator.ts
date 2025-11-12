
import type { Complex, QubitState, BlochVector, MeasurementCounts, Probabilities, SweepData } from '../types';

// --- Complex Number Utilities ---
const complex = (re: number, im: number): Complex => ({ re, im });
const add = (a: Complex, b: Complex): Complex => complex(a.re + b.re, a.im + b.im);
const multiply = (a: Complex, b: Complex): Complex => complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjugate = (a: Complex): Complex => complex(a.re, -a.im);
const magnitudeSq = (a: Complex): number => a.re * a.re + a.im * a.im;

// --- Quantum State & Gate Definitions ---
export const STATE_ZERO: QubitState = [complex(1, 0), complex(0, 0)];
const SQRT1_2 = 1 / Math.sqrt(2);

type Gate = [[Complex, Complex], [Complex, Complex]];

const HADAMARD_GATE: Gate = [
  [complex(SQRT1_2, 0), complex(SQRT1_2, 0)],
  [complex(SQRT1_2, 0), complex(-SQRT1_2, 0)],
];

/**
 * Creates a Ry(theta) rotation gate.
 * @param theta - The rotation angle in radians.
 * @returns The Ry gate matrix.
 */
const getRyGate = (theta: number): Gate => {
  const cos_t2 = Math.cos(theta / 2);
  const sin_t2 = Math.sin(theta / 2);
  return [
    [complex(cos_t2, 0), complex(-sin_t2, 0)],
    [complex(sin_t2, 0), complex(cos_t2, 0)],
  ];
};

/**
 * Applies a quantum gate to a qubit state.
 * @param gate - The 2x2 gate matrix.
 * @param state - The qubit state vector.
 * @returns The new qubit state vector.
 */
const applyGate = (gate: Gate, state: QubitState): QubitState => {
  const [a, b] = state;
  const [[g00, g01], [g10, g11]] = gate;

  const result_a = add(multiply(g00, a), multiply(g01, b));
  const result_b = add(multiply(g10, a), multiply(g11, b));

  return [result_a, result_b];
};

/**
 * Runs the simulation: applies H then Ry(theta) to |0>.
 * @param theta - The rotation angle for Ry.
 * @returns An object containing the final state and measurement probabilities.
 */
export const runSimulation = (theta: number): { state: QubitState; probabilities: Probabilities } => {
  let state = STATE_ZERO;
  // 1. Apply Hadamard gate for superposition.
  state = applyGate(HADAMARD_GATE, state);
  // 2. Apply Ry(theta) gate for rotation.
  const ryGate = getRyGate(theta);
  state = applyGate(ryGate, state);

  const probabilities = getMeasurementProbs(state);
  return { state, probabilities };
};


/**
 * Runs the quantum coin flip simulation: applies Ry(theta) to |0>.
 * @param theta - The rotation angle for Ry.
 * @returns An object containing the final state and measurement probabilities.
 */
export const runFlipSimulation = (theta: number): { state: QubitState; probabilities: Probabilities } => {
  let state = STATE_ZERO;
  // Apply Ry(theta) gate for rotation.
  const ryGate = getRyGate(theta);
  state = applyGate(ryGate, state);

  const probabilities = getMeasurementProbs(state);
  return { state, probabilities };
};

/**
 * Calculates the measurement probabilities for a given state.
 * P(|0>) = |alpha|^2, P(|1>) = |beta|^2
 * @param state - The qubit state [alpha, beta].
 * @returns The probabilities of measuring 0 and 1.
 */
export const getMeasurementProbs = (state: QubitState): Probabilities => {
  const p0 = magnitudeSq(state[0]);
  const p1 = magnitudeSq(state[1]);
  return { p0, p1 };
};


/**
 * Simulates measurements on a qubit state.
 * @param state - The qubit state.
 * @param shots - The number of measurements to simulate.
 * @returns The counts for '0' and '1' outcomes.
 */
export const simulateMeasurements = (state: QubitState, shots: number): MeasurementCounts => {
  const { p0 } = getMeasurementProbs(state);
  let count0 = 0;

  for (let i = 0; i < shots; i++) {
    if (Math.random() < p0) {
      count0++;
    }
  }
  
  return {
    '0': count0,
    '1': shots - count0,
  };
};

/**
 * Calculates the Bloch vector [x, y, z] from a qubit state.
 * x = 2 * Re(alpha* * beta)
 * y = 2 * Im(alpha* * beta)
 * z = |alpha|^2 - |beta|^2
 * @param state - The qubit state [alpha, beta].
 * @returns The Bloch vector [x, y, z].
 */
export const getBlochVector = (state: QubitState): BlochVector => {
    const [alpha, beta] = state;
    const alpha_conj = conjugate(alpha);
    const beta_conj = conjugate(beta);

    const x = 2 * multiply(alpha_conj, beta).re;
    const y = 2 * multiply(alpha_conj, beta).im;
    const z = magnitudeSq(alpha) - magnitudeSq(beta);

    return [x, y, z];
};

/**
 * Sweeps theta from 0 to PI and calculates the probability of measuring |0>.
 * @returns An array of data points for plotting.
 */
export const sweepTheta = (steps: number = 100): SweepData[] => {
    const data: SweepData[] = [];
    for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * Math.PI;
        const { probabilities } = runSimulation(theta);
        data.push({ theta, prob: probabilities.p0 });
    }
    return data;
}
