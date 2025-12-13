import { diagonalMovement, verticalAndHorizontalMovement } from "../../basicMovements";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";

export function QueenMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean) {
    console.log(board)
    console.log(currentPosition)
    const horizontalAndVertical = verticalAndHorizontalMovement(board, currentPosition)
    const diagonal = diagonalMovement(board, currentPosition)
    ShowMove([...diagonal, ...horizontalAndVertical], isValidPiece)
}
