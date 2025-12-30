import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/matches-history/list")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Fodase historico</div>;
}
