import { PlayerTypes } from "@/components/Gameboard/Gameboard"
import { diagonalMovement } from "../../basicMovements"
import { BoardCellData } from "../../board"
import { ShowMove } from "../ShowMove"
import { MoveSetAction } from "../Pieces"
import { detectCheck } from "@/helpers/detectCheckAndCheckMate"

export function BishopMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes, action: MoveSetAction) {
    const valids = diagonalMovement(board, currentPosition, playerRole)
    if (action === 'show') {
        ShowMove(valids, isValidPiece, playerRole)
    } else {
        detectCheck(valids)
    }
}
