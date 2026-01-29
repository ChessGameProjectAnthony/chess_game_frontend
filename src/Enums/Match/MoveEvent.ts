import { BaseSocketMessage } from "@/stores/Match/MatchSocketEventsRegister"
import { MatchEvents } from "./MatchEvents"
import { MoveSetRegistry, Pieces } from "@/helpers/pieces/Pieces"
import { PlayerType } from "./PlayerType"
import { BoardCellData } from "@/helpers/board"
export type MoveEventData = {
    RoomId: string
    Piece: BoardCellData,
    OwnerId: number
    DestinationCell: BoardCellData
    MovedAt: Date
    OwnerType: PlayerType
}
export type JoinEventData = {
    MatchId: string
    BlackPlayer: WebSocket
    WhitePlayer: WebSocket
    WhitePlayerId: number
    BlackPlayerId: number
}

export type MoveEvent = BaseSocketMessage<MatchEvents, MoveEventData>

export type JoinEvent = BaseSocketMessage<MatchEvents, JoinEventData>