export interface DetectionResult {
  probabilities: number[][];
  avgProbability: number;
}

export const classicalDetection = (
  gridSize: number,
  shipPositions: Set<string>,
  noise: number
): DetectionResult => {
  const probabilities: number[][] = Array(gridSize)
    .fill(0)
    .map(() => Array(gridSize).fill(0));

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Classical detection is just random with some noise influence
      const baseProb = Math.random() * 0.3;
      const noiseEffect = noise * Math.random() * 0.2;
      probabilities[i][j] = Math.max(0, Math.min(1, baseProb + noiseEffect));
    }
  }

  const avgProb = probabilities.flat().reduce((a, b) => a + b, 0) / (gridSize * gridSize);
  return { probabilities, avgProbability: avgProb };
};

export const quantumIllumination = (
  gridSize: number,
  shipPositions: Set<string>,
  noise: number,
  shots: number
): DetectionResult => {
  const probabilities: number[][] = Array(gridSize)
    .fill(0)
    .map(() => Array(gridSize).fill(0));

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let detectionCount = 0;

      // Simulate quantum measurements with entanglement correlation
      for (let shot = 0; shot < shots; shot++) {
        let hasReflection = false;

        // Check distance to all ships (quantum illumination effect)
        shipPositions.forEach((pos) => {
          const [sx, sy] = pos.split(",").map(Number);
          const distance = Math.sqrt((sx - i) ** 2 + (sy - j) ** 2);

          // Quantum entanglement provides better detection at close range
          if (distance < 1.5) {
            // Entangled photon correlation strength decreases with distance
            const correlationStrength = 1 - distance / 1.5;
            // Noise reduces correlation
            const noiseEffect = 1 - noise * 0.5;
            const detectionProb = correlationStrength * noiseEffect;

            if (Math.random() < detectionProb) {
              hasReflection = true;
            }
          }
        });

        if (hasReflection) {
          detectionCount++;
        }
      }

      probabilities[i][j] = detectionCount / shots;
    }
  }

  const avgProb = probabilities.flat().reduce((a, b) => a + b, 0) / (gridSize * gridSize);
  return { probabilities, avgProbability: avgProb };
};

export const hybridGroverDetection = (
  gridSize: number,
  shipPositions: Set<string>,
  noise: number,
  shots: number
): DetectionResult => {
  // First phase: Quantum illumination to get candidate cells
  const quantumResult = quantumIllumination(gridSize, shipPositions, noise, shots);
  const probabilities = quantumResult.probabilities;

  // Second phase: Grover's amplitude amplification on high-probability regions
  const threshold = 0.3;
  const candidateCells: [number, number][] = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (probabilities[i][j] > threshold) {
        candidateCells.push([i, j]);
      }
    }
  }

  // Apply Grover's amplitude amplification effect
  // Amplify probabilities of cells near ships
  const amplifiedProbs: number[][] = Array(gridSize)
    .fill(0)
    .map(() => Array(gridSize).fill(0));

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let amplificationFactor = 1;

      // Check if this cell is a candidate
      if (candidateCells.some(([ci, cj]) => ci === i && cj === j)) {
        // Grover's algorithm provides quadratic speedup
        // Simulate this by amplifying probabilities near actual ships
        shipPositions.forEach((pos) => {
          const [sx, sy] = pos.split(",").map(Number);
          const distance = Math.sqrt((sx - i) ** 2 + (sy - j) ** 2);

          if (distance < 2) {
            // Amplitude amplification factor (reduced by noise)
            const groverBoost = 1 + (1 - distance / 2) * (1 - noise * 0.3);
            amplificationFactor = Math.max(amplificationFactor, groverBoost);
          }
        });
      }

      amplifiedProbs[i][j] = Math.min(1, probabilities[i][j] * amplificationFactor);
    }
  }

  const avgProb = amplifiedProbs.flat().reduce((a, b) => a + b, 0) / (gridSize * gridSize);
  return { probabilities: amplifiedProbs, avgProbability: avgProb };
};
