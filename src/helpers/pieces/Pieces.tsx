import { ChessBishop, ChessKing, ChessKnight, ChessPawn, ChessQueen, ChessRook } from "lucide-react"

export type Pieces = {
    King: PieceData
    Queen: PieceData
    Rook: PieceData
    Bishop: PieceData
    Knight: PieceData
    Pawn: PieceData
}

export type PieceData = {
    moveset: string
    owner: 'white' | 'black' | null
    icon: React.ReactNode
}


export const King: Pieces['King'] = {
    icon: <ChessKing />,
    owner: null,
    moveset: "fodase"
}
export const Queen: Pieces['Queen'] = {
    icon: <ChessQueen />,
    owner: null,
    moveset: "fodase"
}
export const Rook: Pieces['Rook'] = {
    icon: <ChessRook />,
    owner: null,
    moveset: "fodase"
}
export const Bishop: Pieces['Bishop'] = {
    icon: <ChessBishop />,
    owner: null,
    moveset: "fodase"
}
export const Knight: Pieces['Knight'] = {
    icon: <ChessKnight />,
    owner: null,
    moveset: "fodase"
}
export const Pawn: Pieces['Pawn'] = {
    icon: <ChessPawn />,
    owner: null,
    moveset: "fodase"
} 