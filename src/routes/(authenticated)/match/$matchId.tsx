import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";
import Gameboard from "@/components/Gameboard/Gameboard";
import useGameSocket from "@/stores/Match/MatchSocketStore";
import { useEffect } from "react";
import { MatchEvents } from "@/Enums/Match/MatchEvents";
import { MoveEvent } from "@/Enums/Match/MoveEvent";
import { BoardCellData } from "@/helpers/board";
import useAuth from "@/stores/AuthStore";
import { PlayerInfo } from "@/components/Gameboard/PlayerInfo";
import { Button } from "@/components/ui/button";
import { Chat } from "@/components/Gameboard/Chat";
import { MatchPlayerEvents } from "@/Enums/Match/MatchPlayerEvents";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { History } from "lucide-react";
import { GameboardContextProps } from "@/stores/Match/MatchData";

export const Route = createFileRoute("/(authenticated)/match/$matchId")({
  component: RouteComponent,
});


function RouteComponent() {
  const { socketState, gameData, CapturedPieces } = useGameSocket()
  const { navigate } = useRouter()
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
  function handleDrawOffer(accept: boolean) {
    if (socketState?.socket?.OPEN) {
      socketState?.sendMessage({
        Event: accept ? MatchPlayerEvents.AcceptDraw : MatchPlayerEvents.DenyDraw,
        Data: {
          RoomId: gameData.MatchId,
          PlayerId: useAuth.getState().profileData?.id,
          PlayerType: gameData.PlayerIs
        }
      })

      useGameSocket.setState(state => ({ socketState: { ...state.socketState, drawProposed: false } } as GameboardContextProps))
    }
  }

  function OfferDraw() {
    if (socketState?.socket?.OPEN) {
      socketState?.sendMessage({
        Event: MatchPlayerEvents.OfferDraw,
        Data: {
          RoomId: gameData.MatchId,
          PlayerId: useAuth.getState().profileData?.id,
          PlayerType: gameData.PlayerIs
        }
      })
    }
  }
  function GiveUp() {
    if (socketState?.socket?.OPEN) {
      socketState?.sendMessage({
        Event: MatchPlayerEvents.GiveUp,
        Data: {
          RoomId: gameData.MatchId,
          PlayerId: useAuth.getState().profileData?.id,
          PlayerType: gameData.PlayerIs
        }

      })
    }
  }
  function GoHome() {
    if (socketState?.isMatchEnded) {

      navigate({ to: "/home" })
    }

  }

  return (
    <div className="grid grid-cols-[.5fr_1.2fr_.5fr] h-screen">
      <Dialog open={socketState?.isMatchEnded}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{socketState?.matchEndendMessage?.message}</DialogTitle>
            <DialogDescription>
              {socketState?.matchEndendMessage?.playerWon ? "Congrats, you won" : "Oh no you lost"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={'ghost'} onClick={GoHome}><History /> Rewind</Button>
            <Button onClick={GoHome}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={socketState?.drawProposed}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Player offered draw</DialogTitle>
            <DialogDescription>
              Do you wanna accept the draw or keep playing
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'ghost'} onClick={() => handleDrawOffer(false)}>Deny</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={() => handleDrawOffer(true)}>Accept</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="">

      </div>
      <div className="flex flex-col w-full justify-center gap-2 ">
        {/* <PiecesCaptured playerCapture={PlayerType.White} /> */}
        <PlayerInfo />
        <Gameboard />
        <PlayerInfo isPlayer />


        <div className="flex gap-4 justify-center items-center">
          <Button onClick={OfferDraw}>
            Draw
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Give up
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Give up</DialogTitle>
                <DialogDescription>
                  Are you sure you want to give up?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={GiveUp}>Give up</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Chat />
    </div>
  );
}
