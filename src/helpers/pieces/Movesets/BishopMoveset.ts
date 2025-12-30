import { PlayerTypes } from "../../../components/Gameboard"
import { diagonalMovement } from "../../basicMovements"
import { BoardCellData } from "../../board"
import { ShowMove } from "../ShowMove"

export function BishopMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes) {
    ShowMove(diagonalMovement(board, currentPosition, playerRole), isValidPiece, playerRole)
}
