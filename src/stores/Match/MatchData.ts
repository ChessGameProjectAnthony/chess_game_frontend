import { SearchGameTypes } from "@/Enums/Match/MatchTypes"
import { PlayerType } from "@/Enums/Match/PlayerType"
import { BoardCellData } from "@/helpers/board"
import { Pieces } from "@/helpers/pieces/Pieces"
import { BaseSocketMessage, QueueSocketMessage } from "./MatchSocketEventsRegister"
import { StoreMutators } from 'zustand'
import { MoveEventData } from "@/Enums/Match/MoveEvent"

export type MoveData =
    {
        OwnerId: number
        Piece: keyof Pieces
        originCell: string
        DestinationCell: string
        MovedAt: Date
    }
export type EnterQueueEvent = {
    MatchType: keyof typeof SearchGameTypes
}
export type GameEventsType = {
    type: "queue" | "play"
    payload: MoveData | EnterQueueEvent
}
export type OponnentData = {
    profilePic?: Base64URLString
    Name: string
}

export type GameData =
    {
        isPlayerTurn: boolean
        OponnetIs: PlayerType
        PlayerIs: PlayerType
        BlackPlayer: PlayerType
        WhitePlayer: PlayerType
        MatchId: string
        OponentData: OponnentData
        BlackPlayerId: number
        WhitePlayerId: number
    }

export type SearchMatchDto =
    {
        PlayerRank: number
        PlayerId: number
        MatchType: keyof typeof SearchGameTypes
    }

export type CapturedPieces = {
    [key: number]: BoardCellData['piece'][]
}
export type MatchEndedReason = {
    message: string
    playerWon: boolean

}
export type SocketState = {
    socket: WebSocket | null
    messages: object[]
    onMessage: (msg: object) => void
    connect: () => void
    sendMessage: (msg: object) => void
    disconnect: () => void
    joinMatch: () => void
    isMatchFound: boolean
    isMatchEnded: boolean
    matchEnded: (msg: MatchEndedReason) => void,
    matchEndendMessage: MatchEndedReason | null
    drawProposed: boolean
}

export type GameboardContextProps = {
    socketState: SocketState | null
    gameData: GameData
    update: () => void
    CapturedPieces: CapturedPieces,
    fetchOponnetData: () => void
    updateCapturedPieces: (value: BoardCellData['piece']) => void,
    mountPlayerBoard: (playerType: PlayerType) => void
    board: BoardCellData[][] | null
    handleSendPiecesMovement: (move: Pick<MoveEventData, 'DestinationCell' | 'Piece' | 'OwnerType'>) => void
    handleReceivePieceMovement: (move: Pick<MoveEventData, 'DestinationCell' | 'Piece' | 'OwnerType'>) => void
    updateBoard: (value: BoardCellData[][]) => void
    setGameData: (data: Partial<GameData>) => void

};
