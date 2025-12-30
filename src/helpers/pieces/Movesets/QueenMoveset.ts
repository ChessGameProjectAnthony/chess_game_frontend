import { PlayerTypes } from "../../../components/Gameboard";
import { diagonalMovement, verticalAndHorizontalMovement } from "../../basicMovements";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";

export function QueenMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes) {
    console.log(board)
    console.log(currentPosition)
    const horizontalAndVertical = verticalAndHorizontalMovement(board, currentPosition, playerRole)
    const diagonal = diagonalMovement(board, currentPosition, playerRole)
    ShowMove([...diagonal, ...horizontalAndVertical], isValidPiece, playerRole)
}
