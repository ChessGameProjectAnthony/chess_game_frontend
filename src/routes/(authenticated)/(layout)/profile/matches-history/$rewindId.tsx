import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated)/(layout)/profile/matches-history/$rewindId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { rewindId } = useParams({
    from: "/_layout/profile/matches-history/$rewindId",
  });
  return <div className="text-[12rem]">Fodase: {rewindId} </div>;
}
