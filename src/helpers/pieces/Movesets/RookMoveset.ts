import { PlayerTypes } from "../../../components/Gameboard";
import { verticalAndHorizontalMovement } from "../../basicMovements";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";

export function RookMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes) {
    ShowMove(verticalAndHorizontalMovement(board, currentPosition, playerRole), isValidPiece, playerRole)
}
