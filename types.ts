
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
