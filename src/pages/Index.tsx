import { useState, useEffect, useMemo } from "react";
import { GameGrid } from "@/components/GameGrid";
import { ProbabilityMap } from "@/components/ProbabilityMap";
import { ControlPanel, DetectionMode } from "@/components/ControlPanel";
import { GameStatus } from "@/components/GameStatus";
import { ModeComparison } from "@/components/ModeComparison";
import { classicalDetection, quantumIllumination, hybridGroverDetection } from "@/utils/quantumDetection";
import { useToast } from "@/hooks/use-toast";
import { Atom } from "lucide-react";

const GRID_SIZE = 4;
const INITIAL_SHIPS = 2;

const Index = () => {
  const { toast } = useToast();
  const [noise, setNoise] = useState(0.2);
  const [shots, setShots] = useState(512);
  const [mode, setMode] = useState<DetectionMode>("hybrid");
  const [shipPositions, setShipPositions] = useState<Set<string>>(new Set());
  const [probabilities, setProbabilities] = useState<number[][]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [hitCells, setHitCells] = useState<Set<string>>(new Set());
  const [missCells, setMissCells] = useState<Set<string>>(new Set());
  const [gameStarted, setGameStarted] = useState(false);
  const [shotsRemaining, setShotsRemaining] = useState(10);
  const [lastAction, setLastAction] = useState<"hit" | "miss" | null>(null);

  // Mode comparison probabilities
  const [classicalProb, setClassicalProb] = useState(0);
  const [quantumProb, setQuantumProb] = useState(0);
  const [hybridProb, setHybridProb] = useState(0);

  const initializeGame = () => {
    const ships = new Set<string>();
    while (ships.size < INITIAL_SHIPS) {
      const i = Math.floor(Math.random() * GRID_SIZE);
      const j = Math.floor(Math.random() * GRID_SIZE);
      ships.add(`${i},${j}`);
    }
    setShipPositions(ships);
    setProbabilities(Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0)));
    setSelectedCells(new Set());
    setHitCells(new Set());
    setMissCells(new Set());
    setGameStarted(false);
    setShotsRemaining(10);
    setLastAction(null);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const runDetection = () => {
    let result;
    
    switch (mode) {
      case "classical":
        result = classicalDetection(GRID_SIZE, shipPositions, noise);
        break;
      case "quantum":
        result = quantumIllumination(GRID_SIZE, shipPositions, noise, shots);
        break;
      case "hybrid":
        result = hybridGroverDetection(GRID_SIZE, shipPositions, noise, shots);
        break;
    }

    setProbabilities(result.probabilities);
    
    // Calculate comparison probabilities
    const classicalResult = classicalDetection(GRID_SIZE, shipPositions, noise);
    const quantumResult = quantumIllumination(GRID_SIZE, shipPositions, noise, shots);
    const hybridResult = hybridGroverDetection(GRID_SIZE, shipPositions, noise, shots);
    
    setClassicalProb(classicalResult.avgProbability);
    setQuantumProb(quantumResult.avgProbability);
    setHybridProb(hybridResult.avgProbability);

    setGameStarted(true);
    toast({
      title: "Quantum Scan Initiated",
      description: `Running ${mode} detection with ${shots} shots at ${(noise * 100).toFixed(0)}% noise`,
    });
  };

  const handleCellClick = (i: number, j: number) => {
    if (!gameStarted || shotsRemaining <= 0) return;

    const key = `${i},${j}`;
    if (hitCells.has(key) || missCells.has(key)) return;

    const newSelectedCells = new Set(selectedCells);
    newSelectedCells.add(key);
    setSelectedCells(newSelectedCells);

    const isHit = shipPositions.has(key);
    
    if (isHit) {
      const newHitCells = new Set(hitCells);
      newHitCells.add(key);
      setHitCells(newHitCells);
      setLastAction("hit");
      toast({
        title: "🎯 HIT!",
        description: "Quantum detection successful!",
        variant: "default",
      });
    } else {
      const newMissCells = new Set(missCells);
      newMissCells.add(key);
      setMissCells(newMissCells);
      setLastAction("miss");
      toast({
        title: "❌ MISS",
        description: "No target detected at this location",
        variant: "destructive",
      });
    }

    setShotsRemaining(shotsRemaining - 1);
  };

  const gameOver = useMemo(() => {
    return gameStarted && shotsRemaining <= 0;
  }, [gameStarted, shotsRemaining]);

  const victory = useMemo(() => {
    return gameStarted && hitCells.size === shipPositions.size && shipPositions.size > 0;
  }, [gameStarted, hitCells, shipPositions]);

  useEffect(() => {
    if (victory) {
      toast({
        title: "🏆 VICTORY!",
        description: "All ships detected successfully!",
        variant: "default",
      });
    } else if (gameOver) {
      toast({
        title: "💥 GAME OVER",
        description: "Shots depleted. Mission failed.",
        variant: "destructive",
      });
    }
  }, [victory, gameOver]);

  return (
    <div className="min-h-screen bg-background p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Atom className="w-12 h-12 text-primary animate-spin" style={{ animationDuration: '10s' }} />
            <h1 className="text-5xl font-bold quantum-text">
              Quantum Battleship
            </h1>
            <Atom className="w-12 h-12 text-secondary animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Harness quantum entanglement and Grover's algorithm to detect hidden ships.
            Experience the quantum advantage in action!
          </p>
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <ControlPanel
              noise={noise}
              shots={shots}
              mode={mode}
              onNoiseChange={setNoise}
              onShotsChange={setShots}
              onModeChange={setMode}
              onRestart={initializeGame}
              onScan={runDetection}
              gameStarted={gameStarted}
            />
            
            <ModeComparison
              classicalProb={classicalProb}
              quantumProb={quantumProb}
              hybridProb={hybridProb}
              noise={noise}
            />
          </div>

          {/* Center Column - Game Grid */}
          <div className="space-y-6">
            <GameStatus
              gameStarted={gameStarted}
              gameOver={gameOver}
              victory={victory}
              shotsRemaining={shotsRemaining}
              totalShots={10}
              shipsRemaining={shipPositions.size - hitCells.size}
              totalShips={shipPositions.size}
              lastAction={lastAction}
            />
            
            <GameGrid
              gridSize={GRID_SIZE}
              shipPositions={shipPositions}
              selectedCells={selectedCells}
              hitCells={hitCells}
              missCells={missCells}
              onCellClick={handleCellClick}
              gameOver={gameOver || victory}
              showShips={gameOver || victory}
            />
          </div>

          {/* Right Column - Probability Map */}
          <div>
            {gameStarted && probabilities.length > 0 && (
              <ProbabilityMap probabilities={probabilities} gridSize={GRID_SIZE} />
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground space-y-2 pt-6 border-t border-border">
          <p>
            Using quantum mechanics principles: superposition, entanglement, and amplitude amplification
          </p>
          <p className="text-xs">
            Classical &lt; Quantum Illumination &lt; Hybrid (Grover's Algorithm)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
