import { SearchGameTypes } from "@/Enums/Match/MatchTypes"
import { PlayerType } from "@/Enums/Match/PlayerType"
import { BoardCellData } from "@/helpers/board"
import { Pieces } from "@/helpers/pieces/Pieces"

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

export type GameData =
    {
        OponnetId: number
        OponnetIs: keyof typeof PlayerType
        PlayerIs: keyof typeof PlayerType
        MatchId: number
        OponentData: {
            profilePic?: Base64URLString
            Name: string
        }
    }

export type SearchMatchDto =
    {
        PlayerRank: number
        PlayerId: number
        MatchType: keyof typeof SearchGameTypes
    }

export type CapturedPieces = {
    [key: string]: BoardCellData['piece'][]
}

export type SocketState = {
    socket: WebSocket | null
    message: string
    connect: (isQueue: boolean, matchId?: number) => void
    sendMessage: (msg: object) => void
    disconnect: () => void
}

export type GameboardContextProps = {
    socketState: SocketState | null
    gameData: GameData
    update: () => void
    CapturedPieces: CapturedPieces
    fetchOponnetData: () => void
    updateCapturedPieces: () => void

    mountPlayerBoard: (playerType: keyof typeof PlayerType) => void
    board: BoardCellData[][] | null
};
