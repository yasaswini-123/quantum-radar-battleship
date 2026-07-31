# Quantum Radar for Battleship Game 

**Design and Implementation of a Quantum Radar System for the Battleship Game using Hybrid Quantum Algorithms**

## Abstract

This project demonstrates a quantum radar system for the Battleship game that uses **Quantum Illumination** and **Grover's Algorithm** to detect hidden ships faster than classical search methods. It combines entanglement, superposition, and amplitude amplification to achieve high accuracy under noisy conditions, improving detection efficiency and reducing computational cost.

## Problem Statement

Classical Battleship simulations and AI-based search strategies face several limitations:

1. **Sequential searching** – cells must be checked one at a time.
2. **Inefficient for large grids** – worst-case search requires O(N²) queries for an N×N grid.
3. **No noise handling** – classical AI cannot efficiently detect targets under uncertainty.

**Challenge:** Build a quantum-enhanced system that detects hidden ships more efficiently — using probability amplification or entanglement — while reducing the number of guesses needed.

## Proposed Solution

### Option 1 — Grover's Algorithm (Search-Based Radar)
- Treats each grid cell as a quantum state.
- Applies an oracle marking hidden ships.
- Uses amplitude amplification to boost the probability of measuring the correct cell.
- Achieves quadratic speedup: O(√N²) ≈ O(N) instead of classical O(N²).
- Best for pinpointing **exact** ship locations.

### Option 2 — Quantum Illumination (Presence-Based Radar)
- Uses entangled photon pairs (signal + idler).
- Measures the reflected signal after interaction with the environment.
- Detects the **presence** of ships in noisy conditions, but not exact coordinates.

### Hybrid Approach
1. Use **Quantum Illumination** first to detect presence in a noisy region.
2. Apply **Grover's Algorithm** to locate the exact position within that candidate set.

## Methodology

### Step 1 — Grid Representation
- Model the N×N Battleship grid as a quantum state space.
- Each cell corresponds to a computational basis state.

### Step 2 — Ship Placement
- Randomly place ships as target states (indices).

### Step 3 — Quantum Detection

**Quantum Illumination**
- Generate entangled photon pairs per cell (Hadamard + CNOT → Bell pair).
- Send the signal photon toward the grid; keep the idler photon for comparison.
- Measure correlation between signal and idler — high correlation implies a ship is likely present.
- Compute a detection probability `P(i,j)` for every cell.
- Select candidate cells where `P(i,j) > threshold`.

**Grover's Algorithm**
- Encode candidate cells into superposition.
- Apply an oracle that phase-flips the true ship state(s).
- Apply a diffuser to amplify the correct amplitude.
- Repeat for `k ≈ √N` iterations.
- Measure the register to output the exact ship location.

### Step 4 — Result Analysis & Visualization
- Generate a probability heatmap of detected ships.
- Overlay actual vs. Grover-detected ship positions.
- Compare quantum efficiency against classical search (number of queries needed).

## Tech Stack

| Layer | Technology / Tool | Purpose |
|---|---|---|
| Programming | Python 3.10+ | Core development |
| Quantum Framework | Qiskit (IBM Quantum SDK) | Build circuits for Grover's & Quantum Illumination |
| Simulator | Aer Simulator | Local quantum simulation |
| Optional Hardware | IBM Quantum Lab | Run experiments on real quantum processors |
| Data Handling | NumPy | Grid calculations, thresholds, probability modeling |
| Visualization | Matplotlib | Heatmaps and detection map visualization |
| Frontend (Demo) | React.js + Plotly.js | Interactive detection heatmap, Grover results, probability graphs |
| Backend (Demo) | Python (Flask) | Simulation logic and computation |
| Version Control | Git & GitHub | Collaboration and code management |

## Circuit Design

- **2-qubit Bell pair per cell** (signal + idler), minimizing circuit depth.
- **Operations:**
  - `H` → superposition
  - `CZ` → entanglement
  - Conditional `Z` → ship-presence phase flip
  - Measurement → ship probability outcome
- Circuit depth minimized to three main gates per pair.
- Output represented as a histogram of correlation probabilities (`|00⟩`, `|11⟩`).

## Demo Implementation

- **Frontend:** React.js + Plotly.js — lets the user pick a grid size and run the simulation live, showing the detection heatmap, Grover search results, and probability bar graphs.
- **Backend:** Python (Flask) integrated with Qiskit's AerSimulator, handling entangled photon creation, correlation measurement, and Grover iterations.
- **Demo workflow:** select grid (e.g., 4×4) → run simulation → view detection probability map, measurement histogram (`|00⟩`, `|11⟩`), and Grover result highlighting the exact ship position.
- **Hosted Prototype:** https://lovable.dev/projects/1216444d-9e59-46ac-a088-b13f1f0c9e1b

## Results

- **Simulation setup:** Python, Qiskit AerSimulator, Matplotlib; 4×4 or 5×5 grid; 512 shots.
- Quantum heatmaps show high-probability regions around actual ship locations.
- Correlation histograms peak at `|00⟩` and `|11⟩`, as expected for entangled measurement outcomes.
- Grover's search locates exact ship cells within **2–3 iterations**, versus roughly **16 iterations** for classical radar on the same grid.

### Feasibility Comparison

| Aspect | Classical Radar | Quantum Battleship |
|---|---|---|
| Detection | Based on reflected amplitude | Based on entangled photon correlations |
| Noise Tolerance | Low | High |
| Search Complexity | O(N²) | O(N) |
| Accuracy | Probabilistic | Near-deterministic via amplitude amplification |

## Advantages

- **Time-efficient:** Fewer iterations (√N vs. N).
- **Scalable:** Extends to larger grids or multiple ships.
- **Noise-tolerant:** Quantum Illumination remains effective at low signal-to-noise ratios.
- **Hybrid quantum-classical:** Combines probabilistic detection with deterministic search.

## Conclusion

The project successfully demonstrates quantum-assisted detection for Battleship. The Quantum Illumination + Grover hybrid achieves both speed and accuracy, supported by optimized circuits, heatmaps, and histograms.

## Future Scope

- **Real Quantum Hardware Execution:** Run on IBM Quantum processors to validate real-time results.
- **Multi-Ship Detection:** Extend the hybrid algorithm to simultaneous multi-target localization.
- **Dynamic Environments:** Apply adaptive noise modeling for moving ship targets.
- **Quantum-Classical Fusion:** Integrate AI (e.g., reinforcement learning) for adaptive oracle creation.
- **Hardware Optimization:** Reduce decoherence via gate scheduling and error correction.
- **Educational Deployment:** Use the demo for quantum learning in universities and hackathons.
- **Integration with Quantum Networks:** Explore entangled communication for distributed radar systems.

## References

- M. Lloyd, "Quantum illumination: Detecting the presence of an object using entanglement," *Science*, vol. 321, pp. 1463–1465, 2008.
- L. K. Grover, "A fast quantum mechanical algorithm for database search," *Proceedings of the 28th Annual ACM Symposium on Theory of Computing*, 1996.
- IBM Quantum Documentation — https://quantum.ibm.com
- OpenAI, ChatGPT (GPT-5) — assisted in generating technical documentation, optimization ideas, and simulation planning.
- Google DeepMind, Gemini — used for comparative reference in AI-assisted document synthesis and visualization methodology.
- RGUKT Srikakulam Official (YouTube) — lectures and workshops from IBM Qiskit Fall Fest 2025 at RGUKT Srikakulam: https://youtube.com/@rgukt_srikakulam_official
