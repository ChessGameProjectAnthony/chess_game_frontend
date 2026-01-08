import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Filter, Search } from "lucide-react";
import { useState } from "react";
export const Route = createFileRoute(
  "/(authenticated)/(layout)/profile/matches-history/"
)({
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

const allGames: GameHistory[] = [
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
  {
    id: 7,
    opponent: "Ding",
    result: "Win",
    rating: "+18",
    date: "4 days ago",
    moves: 55,
    duration: "11:20",
    opening: "Catalan",
  },
  {
    id: 8,
    opponent: "Ian",
    result: "Draw",
    rating: "0",
    date: "5 days ago",
    moves: 62,
    duration: "14:00",
    opening: "Nimzo-Indian",
  },
  {
    id: 9,
    opponent: "Maxime",
    result: "Loss",
    rating: "-6",
    date: "1 week ago",
    moves: 30,
    duration: "6:10",
    opening: "Sicilian Defense",
  },
  {
    id: 10,
    opponent: "Alireza",
    result: "Win",
    rating: "+20",
    date: "1 week ago",
    moves: 38,
    duration: "8:45",
    opening: "French Defense",
  },
];

function RouteComponent() {
  const [filter, setFilter] = useState<"all" | "Win" | "Loss" | "Draw">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = allGames.filter((game) => {
    const matchesFilter = filter === "all" || game.result === filter;
    const matchesSearch = game.opponent
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="lg:hidden flex items-center gap-4 px-6 py-4 border-b bg-card">
        <Link
          to="/profile"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-muted/80"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Game History</h1>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-6">
        {/* Desktop Title */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-muted/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Game History</h1>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search opponent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "Win", "Loss", "Draw"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>

        {/* Games List */}
        <div
          className="space-y-3 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          {filteredGames.map((game, i) => (
            <Link
              key={game.id}
              to={`/profile/matches-history/$rewindId`}
              params={{
                rewindId: game.id as unknown as string,
              }}
              className="flex items-center justify-between rounded-xl bg-card p-4 card-shadow transition-all duration-200 hover:scale-[1.01] hover:shadow-md group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <span className="text-lg font-semibold">
                    {game.opponent[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {game.opponent}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {game.opening}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {game.date} · {game.duration} · {game.moves} moves
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
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
                    className={`text-sm ${
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
            </Link>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No games found</p>
          </div>
        )}
      </div>
    </div>
  );
}
