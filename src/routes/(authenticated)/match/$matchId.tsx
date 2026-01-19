import { createFileRoute, useParams } from "@tanstack/react-router";
import Gameboard from "@/components/Gameboard/Gameboard";
import useGameSocket from "@/stores/Match/MatchSocketStore";
import { useEffect } from "react";

export const Route = createFileRoute("/(authenticated)/match/$matchId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { matchId } = useParams({ from: "/(authenticated)/match/$matchId" });
  const { gameData, socketState } = useGameSocket();

  useEffect(() => {
    // socketState?.connect(Number(matchId))
    return () => {
      socketState?.disconnect()
    }
  }, [])

  return (
    <div className="">
      <div>Fodase, id do match: {matchId}</div>
      <Gameboard playerRole="Black" />
    </div>
  );
}
