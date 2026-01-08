import { cn } from "@/lib/utils";
import {
  Link,
  Navigate,
  redirect,
  RegisteredRouter,
  RouteContextParameter,
  Router,
  RouterState,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import { Flag, House, User } from "lucide-react";
import React from "react";

export type Routes = keyof RegisteredRouter["routesByPath"];

type NavigationPagesType = {
  url: Routes;
  icon: React.JSX.ElementType;
  label: string;
};

const pages: NavigationPagesType[] = [
  {
    url: "/",
    icon: House,
    label: "Home",
  },
  {
    url: "/play",
    icon: Flag,
    label: "Play",
  },
  {
    url: "/profile",
    icon: User,
    label: "Profile",
  },
];
export default function Navigator() {
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:block border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-foreground flex items-center gap-2"
          >
            <span className="text-accent">♚</span> Chess Arena
          </Link>
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-foreground font-medium">
              Home
            </Link>
            <Link
              to="/play"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Play
            </Link>
            <Link
              to="/profile"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 lg:hidden">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-around rounded-2xl bg-nav px-6 py-4 nav-shadow">
            {pages.map(({ icon: Icon, url, label }) => {
              return (
                <Link
                  key={url}
                  to={url}
                  activeProps={{
                    className: "text-nav-foreground scale-110",
                  }}
                  inactiveProps={{
                    className:
                      "text-nav-foreground/50 hover:text-nav-foreground/80",
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 transition-all duration-200 [data-active=true]:text-red-500"
                  )}
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.5} />
                  <div className="h-1 w-1 rounded-full bg-accent animate-scale-in" />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
