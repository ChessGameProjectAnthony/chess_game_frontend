import { PlayerTypes } from "@/components/Gameboard/Gameboard";
import { diagonalMovement, verticalAndHorizontalMovement } from "../../basicMovements";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";
import { detectCheck } from "@/helpers/detectCheckAndCheckMate";
import { MoveSetAction } from "../Pieces";

export function QueenMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes, action: MoveSetAction,) {
    const horizontalAndVertical = verticalAndHorizontalMovement(board, currentPosition, playerRole)
    const diagonal = diagonalMovement(board, currentPosition, playerRole)
    const possibleCells = [...diagonal, ...horizontalAndVertical]
    if (action === 'show') {
        ShowMove(possibleCells, isValidPiece, playerRole)
    } else {
        detectCheck(possibleCells)
    }
}
