import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";
import { detectCheck } from "@/helpers/detectCheckAndCheckMate";
import { MoveSetAction } from "../Pieces";
import { PlayerType } from "@/Enums/Match/PlayerType";

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

export function KnightMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerType, action: MoveSetAction) {
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
    if (action === 'show') {
        ShowMove(valids, isValidPiece, playerRole)
    } else {
        detectCheck(valids)
    }
}