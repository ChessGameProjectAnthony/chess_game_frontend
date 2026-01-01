import { createFileRoute, useParams } from "@tanstack/react-router";
import { GameboardProvider } from "../../../context/GameboardContextProvider";
import Gameboard from "@/components/Gameboard/Gameboard";

export const Route = createFileRoute("/(authenticated)/match/$matchId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { matchId } = useParams({ from: "/(authenticated)/match/$matchId" });

  return (
    <div className="">
      <GameboardProvider>
        <div>Fodase, id do match: {matchId}</div>
        <Gameboard playerRole="white" />
      </GameboardProvider>
    </div>
  );
}
