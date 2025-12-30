import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/profile/matches-history/rewind/$rewindId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { rewindId } = useParams({
    from: "/profile/matches-history/rewind/$rewindId",
  });
  return <div className="text-[12rem]">Fodase: {rewindId} </div>;
}
