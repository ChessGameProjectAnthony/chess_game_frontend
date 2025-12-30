import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(play)/match/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-[32rem]">fodase</div>;
}
