import { verticalAndHorizontalMovement } from "../../basicMovements";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";

export function RookMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean) {
    ShowMove(verticalAndHorizontalMovement(board, currentPosition), isValidPiece)
}
