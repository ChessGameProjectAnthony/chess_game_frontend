import DefaultPageContainer from "@/components/Commons/DefaultPageContainer";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Swords, Trophy, Zap, Play, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(authenticated)/(layout)/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="container mx-auto max-w-6xl px-6 pt-8 lg:pt-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Crown className="h-6 w-6 text-nav-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Chess Arena
                </h1>
                <p className="text-sm text-muted-foreground">
                  Play. Compete. Conquer.
                </p>
              </div>
            </div>

            <h1 className="hidden lg:block text-4xl xl:text-5xl font-bold text-foreground mb-4 leading-tight">
              Master the Game of
              <br />
              <span className="text-accent">Kings & Queens</span>
            </h1>
            <p className="hidden lg:block text-lg text-muted-foreground mb-8">
              Challenge players worldwide, improve your skills, and climb the
              ranks in our competitive chess platform.
            </p>

            {/* Quick Actions - Desktop */}
            <div className="hidden lg:flex gap-4">
              <Link to="/match/queue">
                <Button variant="game" size="lg" className="gap-3">
                  <Play className="h-5 w-5" />
                  Find a Game
                </Button>
              </Link>
              <Link to="/match/queue">
                <Button variant="outline" size="lg" className="gap-3">
                  <Users className="h-5 w-5" />
                  Invite Friend
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div
            className="grid grid-cols-3 gap-3 lg:gap-4 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {[
              {
                icon: Trophy,
                label: "Wins",
                value: "24",
                color: "text-accent",
              },
              {
                icon: Swords,
                label: "Games",
                value: "42",
                color: "text-accent",
              },
              { icon: Zap, label: "Streak", value: "5", color: "text-accent" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 lg:gap-3 rounded-xl bg-card p-4 lg:p-6 card-shadow hover:scale-105 transition-transform"
              >
                <Icon className={`h-5 w-5 lg:h-6 lg:w-6 ${color}`} />
                <span className="text-2xl lg:text-3xl font-bold text-foreground">
                  {value}
                </span>
                <span className="text-xs lg:text-sm text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Mobile */}
        <div
          className="flex lg:hidden gap-3 mb-8 animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          <Link to="/match/queue" className="flex-1">
            <Button variant="game" className="w-full gap-2">
              <Play className="h-4 w-4" />
              Play Now
            </Button>
          </Link>
          <Link to="/match/queue" className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Users className="h-4 w-4" />
              Invite
            </Button>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">
              Recent Games
            </h2>
            <Link
              to="/profile/matches-history"
              className="text-sm text-accent hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
            {[
              {
                opponent: "Magnus",
                result: "Win",
                rating: "+12",
                time: "5 min ago",
              },
              {
                opponent: "Hikaru",
                result: "Loss",
                rating: "-8",
                time: "1 hour ago",
              },
              {
                opponent: "Levy",
                result: "Draw",
                rating: "0",
                time: "2 hours ago",
              },
              {
                opponent: "Fabiano",
                result: "Win",
                rating: "+15",
                time: "3 hours ago",
              },
              {
                opponent: "Anish",
                result: "Win",
                rating: "+10",
                time: "Yesterday",
              },
              {
                opponent: "Wesley",
                result: "Loss",
                rating: "-12",
                time: "Yesterday",
              },
            ].map((game, i) => (
              <Link
                key={i}
                to="/profile/matches-history/$rewindId"
                params={{ rewindId: game.opponent }}
                className="flex items-center justify-between rounded-xl bg-card p-4 card-shadow transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-semibold text-foreground">
                      {game.opponent[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {game.opponent}
                    </p>
                    <p className="text-xs text-muted-foreground">{game.time}</p>
                  </div>
                </div>
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
              </Link>
            ))}
          </div>
        </div>

        {/* Online Players Banner - Desktop */}
        <div
          className="hidden lg:flex items-center justify-center gap-3 mt-12 py-4 rounded-xl bg-card card-shadow animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse-soft" />
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">2,847</span> players
            online right now
          </span>
          <Link
            to="/match/queue"
            className="ml-4 text-accent font-medium hover:underline"
          >
            Join a game →
          </Link>
        </div>
      </div>
    </div>
  );
}
