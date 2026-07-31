import { cn } from "@/lib/utils";
import { Trophy, Target, Zap, Crosshair } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GameStatusProps {
  gameStarted: boolean;
  gameOver: boolean;
  victory: boolean;
  shotsRemaining: number;
  totalShots: number;
  shipsRemaining: number;
  totalShips: number;
  lastAction?: "hit" | "miss" | null;
}

export const GameStatus = ({
  gameStarted,
  gameOver,
  victory,
  shotsRemaining,
  totalShots,
  shipsRemaining,
  totalShips,
  lastAction,
}: GameStatusProps) => {
  const getStatusMessage = () => {
    if (!gameStarted) {
      return { text: "Configure parameters and start scan", icon: Crosshair, color: "text-muted-foreground" };
    }
    if (victory) {
      return { text: "VICTORY - All ships detected!", icon: Trophy, color: "text-success" };
    }
    if (gameOver) {
      return { text: "GAME OVER - Shots depleted", icon: Target, color: "text-destructive" };
    }
    if (lastAction === "hit") {
      return { text: "HIT - Direct quantum detection!", icon: Zap, color: "text-success" };
    }
    if (lastAction === "miss") {
      return { text: "MISS - No target detected", icon: Target, color: "text-muted-foreground" };
    }
    return { text: "Active scan in progress...", icon: Crosshair, color: "text-primary" };
  };

  const status = getStatusMessage();
  const StatusIcon = status.icon;

  return (
    <div className="space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold quantum-text">Mission Status</h3>
        {gameStarted && (
          <Badge variant={gameOver ? "destructive" : victory ? "default" : "outline"} className="text-xs">
            {gameOver ? "ENDED" : victory ? "SUCCESS" : "ACTIVE"}
          </Badge>
        )}
      </div>

      <div className={cn(
        "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300",
        victory && "border-success bg-success/10 shadow-[0_0_20px_hsl(var(--success)/0.3)]",
        gameOver && !victory && "border-destructive bg-destructive/10",
        !gameOver && !victory && gameStarted && "border-primary bg-primary/5",
        !gameStarted && "border-muted bg-muted/20"
      )}>
        <StatusIcon className={cn("w-8 h-8", status.color, victory && "animate-bounce")} />
        <span className={cn("text-lg font-semibold", status.color)}>
          {status.text}
        </span>
      </div>

      {gameStarted && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Shots Remaining</div>
            <div className="text-2xl font-bold font-mono text-primary">
              {shotsRemaining}/{totalShots}
            </div>
            <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-hero transition-all duration-300"
                style={{ width: `${(shotsRemaining / totalShots) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Ships Remaining</div>
            <div className="text-2xl font-bold font-mono text-secondary">
              {shipsRemaining}/{totalShips}
            </div>
            <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary transition-all duration-300"
                style={{ width: `${(shipsRemaining / totalShips) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
