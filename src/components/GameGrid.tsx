import { cn } from "@/lib/utils";
import { Ship, Target, Zap } from "lucide-react";

interface GameGridProps {
  gridSize: number;
  shipPositions: Set<string>;
  selectedCells: Set<string>;
  hitCells: Set<string>;
  missCells: Set<string>;
  onCellClick: (i: number, j: number) => void;
  gameOver: boolean;
  showShips?: boolean;
}

export const GameGrid = ({
  gridSize,
  shipPositions,
  selectedCells,
  hitCells,
  missCells,
  onCellClick,
  gameOver,
  showShips = false,
}: GameGridProps) => {
  const getCellState = (i: number, j: number) => {
    const key = `${i},${j}`;
    if (hitCells.has(key)) return "hit";
    if (missCells.has(key)) return "miss";
    if (showShips && shipPositions.has(key)) return "ship";
    if (selectedCells.has(key)) return "selected";
    return "empty";
  };

  const getCellClassName = (state: string) => {
    const baseClasses = "aspect-square rounded-lg border-2 transition-all duration-300 cursor-pointer flex items-center justify-center relative overflow-hidden";
    
    switch (state) {
      case "hit":
        return cn(baseClasses, "bg-success/20 border-success shadow-quantum animate-pulse");
      case "miss":
        return cn(baseClasses, "bg-muted/30 border-muted-foreground/30");
      case "ship":
        return cn(baseClasses, "bg-secondary/20 border-secondary shadow-[0_0_15px_hsl(var(--secondary)/0.3)]");
      case "selected":
        return cn(baseClasses, "bg-primary/10 border-primary/50");
      default:
        return cn(baseClasses, "bg-quantum-grid border-border hover:border-primary hover:shadow-quantum hover:scale-105");
    }
  };

  const getCellIcon = (state: string) => {
    switch (state) {
      case "hit":
        return <Zap className="w-6 h-6 text-success animate-bounce" />;
      case "miss":
        return <Target className="w-5 h-5 text-muted-foreground/50" />;
      case "ship":
        return <Ship className="w-6 h-6 text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="grid gap-3 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20"
      style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: gridSize }).map((_, i) =>
        Array.from({ length: gridSize }).map((_, j) => {
          const state = getCellState(i, j);
          return (
            <button
              key={`${i}-${j}`}
              onClick={() => !gameOver && onCellClick(i, j)}
              disabled={gameOver || hitCells.has(`${i},${j}`) || missCells.has(`${i},${j}`)}
              className={getCellClassName(state)}
            >
              {getCellIcon(state)}
              <div className="absolute inset-0 bg-gradient-quantum opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          );
        })
      )}
    </div>
  );
};
