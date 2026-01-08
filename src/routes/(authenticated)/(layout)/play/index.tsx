import DefaultPageContainer from "@/components/Commons/DefaultPageContainer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { Clock, Search, Timer, Users, Zap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(authenticated)/(layout)/play/")({
  component: RouteComponent,
});

const timeControls = [
  { icon: Zap, label: "Bullet", time: "1 min", id: "bullet" },
  { icon: Clock, label: "Blitz", time: "5 min", id: "blitz" },
  { icon: Timer, label: "Rapid", time: "15 min", id: "rapid" },
];

function RouteComponent() {
  const [foundMatch, setFoundMatch] = useState(false);
  // const { navigate } = useRouter();
  // setTimeout(() => {
  //   setFoundMatch(true);
  // }, 2000);
  // setTimeout(() => {
  //   navigate({
  //     to: `/match/$matchId`,
  //     params: {
  //       matchId: "Fodase kfakfka",
  //     },
  //   });
  // }, 3000);

  const [selectedTime, setSelectedTime] = useState("blitz");

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="container mx-auto max-w-4xl px-6 pt-8 lg:pt-12">
        {/* Header */}
        <div className="mb-8 lg:mb-12 text-center animate-fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Find a Game
          </h1>
          <p className="text-muted-foreground lg:text-lg">
            Challenge players worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Time Controls */}
          <div>
            {/* Time Controls */}
            <div
              className="mb-8 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Time Control
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {timeControls.map(({ icon: Icon, label, time, id }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedTime(id)}
                    className={`flex flex-col items-center gap-2 rounded-xl p-4 lg:p-6 transition-all duration-200 ${
                      selectedTime === id
                        ? "bg-primary text-primary-foreground scale-105 card-shadow"
                        : "bg-card text-foreground hover:bg-muted card-shadow"
                    }`}
                  >
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                    <span className="font-semibold">{label}</span>
                    <span className="text-xs lg:text-sm opacity-70">
                      {time}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Time - Desktop */}
            <div
              className="hidden lg:block mb-8 animate-fade-in"
              style={{ animationDelay: "0.15s" }}
            >
              <h2 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Custom Time
              </h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Minutes
                  </label>
                  <input
                    type="number"
                    defaultValue={10}
                    min={1}
                    max={60}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Increment (sec)
                  </label>
                  <input
                    type="number"
                    defaultValue={5}
                    min={0}
                    max={60}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div>
            {/* Main Actions */}
            <div
              className="space-y-4 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="hidden lg:block mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Start Playing
              </h2>
              <Button variant={"game"} className="w-full" size="lg">
                <Link
                  to="/match/$matchId"
                  params={{
                    matchId: "lfaklfkakfa",
                  }}
                >
                  <Search className="h-5 w-5" />
                  Procurar partida
                </Link>
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" size="lg">
                    <Users className="h-5 w-5" />
                    Convidar amigo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Rating Range - Desktop */}
            <div
              className="hidden lg:block mt-8 animate-fade-in"
              style={{ animationDelay: "0.25s" }}
            >
              <h2 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Rating Range
              </h2>
              <div className="rounded-xl bg-card p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Min: 1200
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Max: 1800
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full relative">
                  <div className="absolute left-[20%] right-[20%] h-full bg-accent rounded-full" />
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full border-2 border-card" />
                  <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full border-2 border-card" />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Your rating:{" "}
                  <span className="font-semibold text-foreground">1,542</span>
                </p>
              </div>
            </div>

            {/* Online Players */}
            <div
              className="mt-8 lg:mt-12 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center justify-center gap-2 py-4 rounded-xl bg-card card-shadow">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-soft" />
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">2,847</span>{" "}
                  players online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
