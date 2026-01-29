import { SearchGameTypes } from "@/Enums/Match/MatchTypes"
import useGameSocket from "./MatchSocketStore"
import { SearchMatchResponses } from "@/Enums/Queue/QueueEvents"
import { GameQueueData } from "@/Enums/Queue/QueueGame"
import { MatchEvents } from "@/Enums/Match/MatchEvents"
import { JoinEvent, MoveEvent, MoveEventData } from "@/Enums/Match/MoveEvent"
import { GameData } from "./MatchData"
import { PlayerType } from "@/Enums/Match/PlayerType"
import useAuth from "../AuthStore"

export type BaseSocketMessage<Event, Data> = {
    Event: Event
    Data: Data
}
export type QueueSocketMessage = BaseSocketMessage<SearchMatchResponses, GameQueueData> & {
    GameType: keyof typeof SearchGameTypes

}

export function MatchSocketEventsRegister(socket: WebSocket) {
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data)
        useGameSocket.getState().socketState?.onMessage(message)
        findHandler(event)
    }

}

function findHandler(msg: MessageEvent) {
    const eventName = JSON.parse(msg.data)["Event"]
    console.log("Received")

    if (Object.values(MatchEvents).includes(eventName)) {
        handleMatchResponse(msg)
    }
    if (Object.values(SearchMatchResponses).includes(eventName)) {
        handleQueueResponse(msg)
        return
    }
}
function handleMatchResponse(msg: MessageEvent) {
    const parsed = JSON.parse(msg.data)
    const ctx = useGameSocket.getState();

    if (parsed.Event == MatchEvents.MoveMade) {
        ctx.handleReceivePieceMovement(
            {
                DestinationCell: parsed.Data.DestinationCell,
                Piece: parsed.Data.Piece,
                OwnerType: parsed.Data.OwnerType
            }
        )
    }
    if (parsed.Event == MatchEvents.GetMatchData) {

        useGameSocket.getState().setGameData({
            BlackPlayer: parsed.Data.BlackPlayer,
            WhitePlayer: parsed.Data.WhitePlayer,
            MatchId: parsed.Data.MatchId,
            BlackPlayerId: parsed.Data.BlackPlayerId,
            WhitePlayerId: parsed.Data.WhitePlayerId,
            OponnetIs: useAuth.getState()!.profileData!.id === parsed.Data.BlackPlayerId ? PlayerType.White : PlayerType.Black,
            PlayerIs: useAuth.getState()!.profileData!.id == parsed.Data.WhitePlayerId ? PlayerType.White : PlayerType.Black,

        })
    }
}

function handleQueueResponse(msg: MessageEvent) {
    console.log("chooseMethod")

    const parsed = JSON.parse(msg.data) as QueueSocketMessage
    if (parsed.Event == SearchMatchResponses.MatchCreated || parsed.Event == SearchMatchResponses.Found) {
        useGameSocket.getState().setGameData({
            MatchId: parsed.Data.GameId
        })
    }

    if (parsed.Event == SearchMatchResponses.Found) {
        useGameSocket.getState().socketState?.joinMatch()

    }

}