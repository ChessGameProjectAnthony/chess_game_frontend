import { createFileRoute, useParams } from "@tanstack/react-router";
import Gameboard from "@/components/Gameboard/Gameboard";
import useGameSocket from "@/stores/Match/MatchSocketStore";
import { useEffect } from "react";
import { MatchEvents } from "@/Enums/Match/MatchEvents";
import { MoveEvent } from "@/Enums/Match/MoveEvent";
import { BoardCellData } from "@/helpers/board";
import useAuth from "@/stores/AuthStore";

export const Route = createFileRoute("/(authenticated)/match/$matchId")({
  component: RouteComponent,
});


function RouteComponent() {
  const { socketState, gameData } = useGameSocket()

  useEffect(() => {
    if (socketState?.socket?.OPEN) {
      socketState?.sendMessage({
        Event: MatchEvents.GetMatchData,
        Data: {
          RoomId: gameData.MatchId
        }

      })
    }
  }, [])
  return (
    <Gameboard />
  );
}
