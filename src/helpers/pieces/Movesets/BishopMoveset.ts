import { diagonalMovement } from "../../basicMovements"
import { BoardCellData } from "../../board"
import { ShowMove } from "../ShowMove"
import { MoveSetAction } from "../Pieces"
import { detectCheck } from "@/helpers/detectCheckAndCheckMate"
import { PlayerType } from "@/Enums/Match/PlayerType"

export function BishopMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerType, action: MoveSetAction) {
    const valids = diagonalMovement(board, currentPosition, playerRole)
    if (action === 'show') {
        ShowMove(valids, isValidPiece, playerRole)
    } else {
        detectCheck(valids)
    }
}
