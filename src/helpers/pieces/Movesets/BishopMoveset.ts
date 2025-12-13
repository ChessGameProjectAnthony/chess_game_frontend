import { diagonalMovement } from "../../basicMovements"
import { BoardCellData } from "../../board"
import { ShowMove } from "../ShowMove"

export function BishopMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean) {
    ShowMove(diagonalMovement(board, currentPosition), isValidPiece)
}
