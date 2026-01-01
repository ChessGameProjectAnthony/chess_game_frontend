import { PlayerTypes } from "@/components/Gameboard/Gameboard";
import { DIAGONAL_DIRECTIONS_TUPPLE, VERTICAL_AND_HORIZONTAL_DIRECTIONS_TUPPLE } from "../../basicMovements";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";
import { detectCheck } from "@/helpers/detectCheckAndCheckMate";
import { MoveSetAction } from "../Pieces";

export function KingMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes, action: MoveSetAction) {
    const valids: BoardCellData[] = []

    for (const [direction_row, direction_column] of VERTICAL_AND_HORIZONTAL_DIRECTIONS_TUPPLE) {
        let row = currentPosition[0] + direction_row;
        let column = currentPosition[1] + direction_column;

        while (row >= 0 && row < 8 && column >= 0 && column < 8) {
            const cell = board[row][column];

            if (!cell.piece) {
                valids.push(cell);
            } else {
                if (cell.piece.owner !== playerRole) {
                    valids.push(cell);
                }
                break;
            }
            break
        }
        for (const [direction_row, direction_column] of DIAGONAL_DIRECTIONS_TUPPLE) {
            let row = currentPosition[0] + direction_row;
            let column = currentPosition[1] + direction_column;

            while (row >= 0 && row < 8 && column >= 0 && column < 8) {
                const cell = board[row][column];

                if (!cell.piece) {
                    valids.push(cell);
                } else {
                    if (cell.piece.owner !== playerRole) {
                        valids.push(cell);
                    }
                    break;
                }
                break
            }
        }
    }
    if (action === 'show') {
        ShowMove(valids, isValidPiece, playerRole)
    } else {
        detectCheck(valids)
    }
}