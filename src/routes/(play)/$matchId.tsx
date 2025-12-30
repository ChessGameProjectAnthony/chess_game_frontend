import { createFileRoute, useParams } from "@tanstack/react-router";
import Gameboard from "../../components/Gameboard";
import { GameboardProvider } from "../../context/GameboardContextProvider";

export const Route = createFileRoute("/(play)/$matchId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { matchId } = useParams({ from: "/(play)/$matchId" });

  return (
    <GameboardProvider>
      <div>Fodase, id do match: {matchId}</div>
      <Gameboard />
    </GameboardProvider>
  );
}
