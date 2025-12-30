import { PlayerTypes } from "../../../components/Gameboard";
import { VERTICAL_AND_HORIZONTAL_DIRECTIONS_TUPPLE } from "../../basicMovements";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";

const KNIGHT_MOVEMENTS_TUPPLE = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
] as const

export function KnightMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes) {
    const valids: BoardCellData[] = []

    for (const [direction_row, direction_column] of KNIGHT_MOVEMENTS_TUPPLE) {
        const row = currentPosition[0] + direction_row;
        const column = currentPosition[1] + direction_column;

        const cell = board[row]?.[column];
        if (!cell) continue;

        if (!cell.piece || cell.piece.owner != playerRole) {
            valids.push(cell);
        }
    }

    ShowMove(valids, isValidPiece, playerRole)
}