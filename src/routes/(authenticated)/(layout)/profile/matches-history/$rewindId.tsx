import { ChessBoard } from "@/components/gameBVo";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Flag, MessageCircle, RotateCcw } from "lucide-react";

export const Route = createFileRoute(
  "/(authenticated)/(layout)/profile/matches-history/$rewindId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { rewindId } = useParams({
    from: "/(authenticated)/(layout)/profile/matches-history/$rewindId",
  });
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 animate-fade-in">
        <Link
          to="/"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-muted/80"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-soft" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-muted/80">
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>

      {/* Opponent Info */}
      <div
        className="mx-auto max-w-md px-6 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-nav-foreground">
            ♚
          </div>
          <div>
            <p className="font-semibold text-foreground">Magnus</p>
            <p className="text-xs text-muted-foreground">Rating: 2,847</p>
          </div>
          <div className="ml-auto rounded-lg bg-card px-3 py-1 card-shadow">
            <span className="font-mono text-lg font-bold text-foreground">
              4:32
            </span>
          </div>
        </div>
      </div>

      {/* Chess Board */}
      <div
        className="flex justify-center px-4 animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <ChessBoard matchId="XYZ789" playerName="You vs Magnus" />
      </div>

      {/* Player Info */}
      <div
        className="mx-auto max-w-md px-6 mt-4 animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            ♔
          </div>
          <div>
            <p className="font-semibold text-foreground">You</p>
            <p className="text-xs text-muted-foreground">Rating: 1,542</p>
          </div>
          <div className="ml-auto rounded-lg bg-card px-3 py-1 card-shadow">
            <span className="font-mono text-lg font-bold text-foreground">
              5:00
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="mx-auto max-w-md px-6 mt-6 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1">
            <RotateCcw className="h-4 w-4" />
            Draw
          </Button>
          <Button variant="destructive" size="sm" className="flex-1">
            <Flag className="h-4 w-4" />
            Resign
          </Button>
        </div>
      </div>
    </div>
  );
}
