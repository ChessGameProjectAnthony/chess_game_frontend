import { SearchGameTypes } from "@/Enums/Match/MatchTypes"
import useGameSocket from "./MatchSocketStore"
import { SearchMatchResponses } from "@/Enums/Queue/QueueEvents"
import { GameQueueData } from "@/Enums/Queue/QueueGame"

export type BaseSocketMessage<Event, Data> = {
    Event: Event
    Data: Data
}
export type QueueSocketMessage = BaseSocketMessage<SearchMatchResponses, GameQueueData> & {
    GameType: keyof typeof SearchGameTypes

}

export function MatchSocketEventsRegister(socket: WebSocket) {
    socket.onmessage = (event) => {
        findHandler(event)
    }

}

function findHandler(msg: MessageEvent) {
    const eventName = JSON.parse(msg.data)["Event"] as SearchMatchResponses
    switch (eventName) {
        case SearchMatchResponses.CreatedAndWaiting:
        case SearchMatchResponses.Found:
            handleQueueResponse(msg)
            break;
    }
}
function handleQueueResponse(msg: MessageEvent) {
    console.log("chooseMethod")
    const parsed = JSON.parse(msg.data) as QueueSocketMessage
    useGameSocket.getState().socketState?.onMessage(parsed)
    useGameSocket.getState().socketState?.joinMatch(parsed)
}