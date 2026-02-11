import { SearchGameTypes } from "@/Enums/Match/MatchTypes"
import useGameSocket from "./MatchSocketStore"
import { SearchMatchResponses } from "@/Enums/Queue/QueueEvents"
import { GameQueueData } from "@/Enums/Queue/QueueGame"
import { MatchEvents } from "@/Enums/Match/MatchEvents"
import { JoinEvent, MoveEvent, MoveEventData } from "@/Enums/Match/MoveEvent"
import { GameboardContextProps, GameData } from "./MatchData"
import { PlayerType } from "@/Enums/Match/PlayerType"
import useAuth from "../AuthStore"
import { MatchPlayerEvents } from "@/Enums/Match/MatchPlayerEvents"
import { ChatEvents } from "@/Enums/Chat/ChatEvents"

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
    if (Object.values(MatchPlayerEvents).includes(eventName)) {
        handleMatchPlayerEventsResponse(msg)
    }
    if (Object.values(SearchMatchResponses).includes(eventName)) {
        handleQueueResponse(msg)
        return
    }
    if (Object.values(ChatEvents).includes(eventName)) {
        handleChatResponse(msg)
    }
}
function handleMatchPlayerEventsResponse(msg: MessageEvent) {
    const parsed = JSON.parse(msg.data)
    const ctx = useGameSocket.getState();
    if (parsed.Event == MatchPlayerEvents.OfferDraw && parsed.Data.PlayerType !== ctx.gameData.PlayerIs) {
        useGameSocket.setState(state => ({ socketState: { ...state.socketState, drawProposed: true } } as GameboardContextProps))
        return
    }
    if (parsed.Event == MatchPlayerEvents.DrawDenied) {

        return
    }
    const playerWon = parsed.Data.PlayerId !== useAuth.getState().profileData?.id
    let message;

    switch (parsed.Event) {
        case MatchPlayerEvents.GiveUp:
            message = "Player gave up"
            break
        case MatchPlayerEvents.DrawAccepted:
            message = "Draw"
            break
        case MatchPlayerEvents.OponnetExited:
            message = "Player quited"
            break
        default:
            message = "Match ended"
            break
    }

    ctx.socketState?.matchEnded({
        message: message,
        playerWon
    })

}

function handleMatchResponse(msg: MessageEvent) {
    const parsed = JSON.parse(msg.data)
    const ctx = useGameSocket.getState();

    if (parsed.Event == MatchEvents.MoveMade) {

        // useGameSocket.setState(state => ({ gameData: { ...state.gameData, isPlayerTurn: parsed.Data.OwnerType !== ctx.gameData.PlayerIs } }))

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
            isPlayerTurn: true,
            PlayerIs: useAuth.getState()!.profileData!.id == parsed.Data.WhitePlayerId ? PlayerType.White : PlayerType.Black,
        })

        // useGameSocket.setState(state => ({ gameData: { ...state.gameData, isPlayerTurn: ctx.gameData.PlayerIs === PlayerType.White } }))
    }
    if (parsed.Event == MatchEvents.PawnPromoted) {
        useGameSocket.getState().handleReceivePromotePawnMessage(parsed.Data.Piece)
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

function handleChatResponse(msg: MessageEvent) {

    const parsed = JSON.parse(msg.data)
    if (parsed.Event == ChatEvents.MessageReceived) {
        useGameSocket.getState().handleReceiveChatMessage(parsed.Data)
    }
}