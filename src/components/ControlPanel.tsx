import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RotateCcw, Play } from "lucide-react";

export type DetectionMode = "classical" | "quantum" | "hybrid";

interface ControlPanelProps {
  noise: number;
  shots: number;
  mode: DetectionMode;
  onNoiseChange: (value: number) => void;
  onShotsChange: (value: number) => void;
  onModeChange: (mode: DetectionMode) => void;
  onRestart: () => void;
  onScan: () => void;
  gameStarted: boolean;
}

export const ControlPanel = ({
  noise,
  shots,
  mode,
  onNoiseChange,
  onShotsChange,
  onModeChange,
  onRestart,
  onScan,
  gameStarted,
}: ControlPanelProps) => {
  return (
    <div className="space-y-6 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20">
      <div>
        <h3 className="text-xl font-bold mb-4 quantum-text">Quantum Controls</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="noise" className="text-sm font-medium text-foreground">
              Environmental Noise
            </Label>
            <span className="text-sm font-mono text-primary">{noise.toFixed(2)}</span>
          </div>
          <Slider
            id="noise"
            min={0}
            max={1}
            step={0.05}
            value={[noise]}
            onValueChange={(value) => onNoiseChange(value[0])}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Simulates quantum decoherence and environmental interference
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="shots" className="text-sm font-medium text-foreground">
              Measurement Shots
            </Label>
            <span className="text-sm font-mono text-primary">{shots}</span>
          </div>
          <Slider
            id="shots"
            min={128}
            max={2048}
            step={128}
            value={[shots]}
            onValueChange={(value) => onShotsChange(value[0])}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Number of quantum measurements for probability estimation
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Detection Mode</Label>
        <RadioGroup value={mode} onValueChange={(value) => onModeChange(value as DetectionMode)}>
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="classical" id="classical" />
            <Label htmlFor="classical" className="flex-1 cursor-pointer text-sm">
              Classical Detection
              <span className="block text-xs text-muted-foreground">Random search pattern</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="quantum" id="quantum" />
            <Label htmlFor="quantum" className="flex-1 cursor-pointer text-sm">
              Quantum Illumination
              <span className="block text-xs text-muted-foreground">Entangled photon pairs</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/30">
            <RadioGroupItem value="hybrid" id="hybrid" />
            <Label htmlFor="hybrid" className="flex-1 cursor-pointer text-sm">
              Hybrid (Quantum + Grover)
              <span className="block text-xs text-muted-foreground">Maximum quantum advantage</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onScan}
          disabled={gameStarted}
          className="flex-1 bg-gradient-hero hover:shadow-quantum-strong transition-all duration-300"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Scan
        </Button>
        <Button
          onClick={onRestart}
          variant="outline"
          className="border-primary/50 hover:bg-primary/10"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
