import { useMemo } from "react";

interface ProbabilityMapProps {
  probabilities: number[][];
  gridSize: number;
}

export const ProbabilityMap = ({ probabilities, gridSize }: ProbabilityMapProps) => {
  const maxProb = useMemo(() => {
    return Math.max(...probabilities.flat());
  }, [probabilities]);

  const getColorIntensity = (prob: number) => {
    const intensity = maxProb > 0 ? prob / maxProb : 0;
    // Create gradient from dark blue to cyan to purple
    if (intensity < 0.33) {
      const t = intensity / 0.33;
      return `rgba(0, 139, 139, ${0.2 + t * 0.3})`;
    } else if (intensity < 0.66) {
      const t = (intensity - 0.33) / 0.33;
      return `rgba(0, 191, 255, ${0.5 + t * 0.3})`;
    } else {
      const t = (intensity - 0.66) / 0.34;
      return `rgba(138, 43, 226, ${0.8 + t * 0.2})`;
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold quantum-text">Detection Probability Map</h3>
      <div 
        className="grid gap-2 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {probabilities.map((row, i) =>
          row.map((prob, j) => (
            <div
              key={`${i}-${j}`}
              className="aspect-square rounded-lg border border-primary/20 flex items-center justify-center text-xs font-mono relative overflow-hidden transition-all duration-300 hover:scale-110"
              style={{ 
                backgroundColor: getColorIntensity(prob),
                boxShadow: prob > 0.5 ? '0 0 15px rgba(0, 191, 255, 0.4)' : 'none'
              }}
            >
              <span className="relative z-10 font-bold text-foreground drop-shadow-lg">
                {(prob * 100).toFixed(0)}%
              </span>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
        <span>Low Probability</span>
        <div className="flex gap-1">
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((val) => (
            <div
              key={val}
              className="w-8 h-3 rounded"
              style={{ backgroundColor: getColorIntensity(val) }}
            />
          ))}
        </div>
        <span>High Probability</span>
      </div>
    </div>
  );
};
