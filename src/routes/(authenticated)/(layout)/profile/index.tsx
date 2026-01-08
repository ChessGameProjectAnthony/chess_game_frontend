import { createFileRoute } from "@tanstack/react-router";
import {
  Settings,
  TrendingUp,
  History,
  Award,
  Target,
  ChevronRight,
  ArrowLeft,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/(layout)/profile/")({
  component: RouteComponent,
});
interface GameHistory {
  id: number;
  opponent: string;
  result: "Win" | "Loss" | "Draw";
  rating: string;
  date: string;
  moves: number;
  duration: string;
  opening: string;
}

const gameHistory: GameHistory[] = [
  {
    id: 1,
    opponent: "Magnus",
    result: "Win",
    rating: "+12",
    date: "Today",
    moves: 42,
    duration: "8:32",
    opening: "Sicilian Defense",
  },
  {
    id: 2,
    opponent: "Hikaru",
    result: "Loss",
    rating: "-8",
    date: "Today",
    moves: 28,
    duration: "5:15",
    opening: "Queen's Gambit",
  },
  {
    id: 3,
    opponent: "Levy",
    result: "Draw",
    rating: "0",
    date: "Yesterday",
    moves: 56,
    duration: "12:45",
    opening: "Italian Game",
  },
  {
    id: 4,
    opponent: "Fabiano",
    result: "Win",
    rating: "+15",
    date: "Yesterday",
    moves: 35,
    duration: "7:20",
    opening: "Ruy Lopez",
  },
  {
    id: 5,
    opponent: "Anish",
    result: "Win",
    rating: "+10",
    date: "2 days ago",
    moves: 48,
    duration: "9:10",
    opening: "English Opening",
  },
  {
    id: 6,
    opponent: "Wesley",
    result: "Loss",
    rating: "-12",
    date: "3 days ago",
    moves: 22,
    duration: "4:30",
    opening: "King's Indian",
  },
];

function RouteComponent() {
  const [selectedGame, setSelectedGame] = useState<GameHistory | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header with Avatar */}
        <div className="bg-profile-header px-6 pt-8 pb-6 lg:rounded-b-2xl animate-fade-in">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex h-20 w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary card-shadow">
              <span className="text-3xl lg:text-4xl text-nav-foreground">
                ♚
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Username
              </h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Rating: 1,542
              </p>
            </div>
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors card-shadow">
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
          <button className="mt-4 flex lg:hidden items-center gap-2 text-sm font-medium text-primary hover:underline">
            <Settings className="h-4 w-4" />
            Manage account
          </button>
        </div>

        {/* Stats Cards */}
        <div className="px-6 -mt-2 lg:mt-6">
          <div
            className="grid grid-cols-4 gap-2 lg:gap-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {[
              { icon: Award, value: "24", label: "Wins" },
              { icon: Target, value: "18", label: "Losses" },
              { icon: TrendingUp, value: "57%", label: "Win Rate" },
              { icon: History, value: "42", label: "Games" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 lg:gap-2 rounded-xl bg-card p-3 lg:p-4 card-shadow"
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5 text-accent" />
                <span className="text-lg lg:text-2xl font-bold text-foreground">
                  {value}
                </span>
                <span className="text-[10px] lg:text-xs text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div
          className="px-6 mt-6 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted rounded-xl p-1">
              <TabsTrigger
                value="performance"
                className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Performance
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="mt-6 space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="rounded-xl bg-card p-4 lg:p-6 card-shadow">
                  <h3 className="font-semibold text-foreground mb-3">
                    Rating Progress
                  </h3>
                  <div className="flex items-end gap-1 h-24 lg:h-32">
                    {[45, 52, 48, 61, 55, 70, 65, 78, 72, 85].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-accent/20 rounded-t transition-all duration-500"
                          style={{ height: `${height}%` }}
                        >
                          <div
                            className="w-full bg-accent rounded-t transition-all duration-700"
                            style={{
                              height: `${height}%`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>10 games ago</span>
                    <span>Now</span>
                  </div>
                </div>

                <div className="rounded-xl bg-card p-4 lg:p-6 card-shadow">
                  <h3 className="font-semibold text-foreground mb-3">
                    Best Opening
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Sicilian Defense", rate: 68 },
                      { name: "Italian Game", rate: 54 },
                      { name: "Queen's Gambit", rate: 48 },
                    ].map((opening) => (
                      <div key={opening.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">
                            {opening.name}
                          </span>
                          <span className="text-sm font-semibold text-green-500">
                            {opening.rate}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all duration-700"
                            style={{ width: `${opening.rate}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Recent Games</h3>
                <Link
                  to="/profile/matches-history"
                  className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                >
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              {gameHistory.slice(0, 4).map((game) => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="w-full flex items-center justify-between rounded-xl bg-card p-4 card-shadow transition-all duration-200 hover:scale-[1.02] hover:shadow-md text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <span className="text-sm font-semibold">
                        {game.opponent[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {game.opponent}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {game.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          game.result === "Win"
                            ? "text-green-500"
                            : game.result === "Loss"
                              ? "text-red-500"
                              : "text-muted-foreground"
                        }`}
                      >
                        {game.result}
                      </p>
                      <p
                        className={`text-xs ${
                          game.rating.startsWith("+")
                            ? "text-green-500"
                            : game.rating.startsWith("-")
                              ? "text-red-500"
                              : "text-muted-foreground"
                        }`}
                      >
                        {game.rating}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </button>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Game Detail Modal/Drawer */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedGame(null)}
          />
          <div className="relative w-full lg:max-w-lg bg-card rounded-t-2xl lg:rounded-2xl p-6 animate-scale-in card-shadow">
            <button
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                <span className="text-xl text-nav-foreground">
                  {selectedGame.opponent[0]}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  vs {selectedGame.opponent}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedGame.date}
                </p>
              </div>
              <div className="ml-auto">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedGame.result === "Win"
                      ? "bg-green-500/10 text-green-500"
                      : selectedGame.result === "Loss"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {selectedGame.result}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-muted p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  Rating Change
                </p>
                <p
                  className={`text-xl font-bold ${
                    selectedGame.rating.startsWith("+")
                      ? "text-green-500"
                      : selectedGame.rating.startsWith("-")
                        ? "text-red-500"
                        : "text-foreground"
                  }`}
                >
                  {selectedGame.rating}
                </p>
              </div>
              <div className="rounded-xl bg-muted p-4">
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="text-xl font-bold text-foreground">
                  {selectedGame.duration}
                </p>
              </div>
              <div className="rounded-xl bg-muted p-4">
                <p className="text-xs text-muted-foreground mb-1">Moves</p>
                <p className="text-xl font-bold text-foreground">
                  {selectedGame.moves}
                </p>
              </div>
              <div className="rounded-xl bg-muted p-4">
                <p className="text-xs text-muted-foreground mb-1">Opening</p>
                <p className="text-sm font-bold text-foreground">
                  {selectedGame.opening}
                </p>
              </div>
            </div>

            <Link
              to={`/profile/matches-history/$rewindId`}
              params={{
                rewindId: selectedGame.id as unknown as string,
              }}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              View Game Replay
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
