import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Zap, Sparkles } from "lucide-react";

interface ModeComparisonProps {
  classicalProb: number;
  quantumProb: number;
  hybridProb: number;
  noise: number;
}

export const ModeComparison = ({
  classicalProb,
  quantumProb,
  hybridProb,
  noise,
}: ModeComparisonProps) => {
  const advantage = useMemo(() => {
    return {
      quantumVsClassical: ((quantumProb - classicalProb) / classicalProb * 100).toFixed(1),
      hybridVsQuantum: ((hybridProb - quantumProb) / quantumProb * 100).toFixed(1),
      hybridVsClassical: ((hybridProb - classicalProb) / classicalProb * 100).toFixed(1),
    };
  }, [classicalProb, quantumProb, hybridProb]);

  const modes = [
    {
      name: "Classical",
      prob: classicalProb,
      icon: TrendingUp,
      color: "text-muted-foreground",
      bgColor: "bg-muted/30",
      description: "Random search with noise",
    },
    {
      name: "Quantum Illumination",
      prob: quantumProb,
      icon: Zap,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Entangled photon detection",
    },
    {
      name: "Hybrid (Grover)",
      prob: hybridProb,
      icon: Sparkles,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Quantum + amplitude amplification",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-2 quantum-text">Detection Mode Comparison</h3>
        <p className="text-sm text-muted-foreground">
          Average detection probability at noise level {noise.toFixed(2)}
        </p>
      </div>

      <div className="grid gap-3">
        {modes.map((mode, index) => (
          <Card key={mode.name} className={`p-4 ${mode.bgColor} border-2 border-border hover:border-primary/50 transition-all duration-300`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <mode.icon className={`w-5 h-5 ${mode.color}`} />
                <span className="font-semibold text-foreground">{mode.name}</span>
              </div>
              <span className={`text-2xl font-bold font-mono ${mode.color}`}>
                {(mode.prob * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{mode.description}</p>
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  index === 0 ? 'bg-muted-foreground' : 
                  index === 1 ? 'bg-gradient-to-r from-primary to-primary-glow' :
                  'bg-gradient-to-r from-secondary to-accent'
                }`}
                style={{ width: `${mode.prob * 100}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-gradient-quantum border-2 border-primary/30">
        <h4 className="font-semibold text-sm mb-3 text-foreground">Quantum Advantage</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantum vs Classical:</span>
            <span className="font-mono font-bold text-primary">+{advantage.quantumVsClassical}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hybrid vs Quantum:</span>
            <span className="font-mono font-bold text-secondary">+{advantage.hybridVsQuantum}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hybrid vs Classical:</span>
            <span className="font-mono font-bold text-accent">+{advantage.hybridVsClassical}%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
