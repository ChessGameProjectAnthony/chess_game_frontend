import { PlayerTypes } from "../components/Gameboard";
import { BoardCellData } from "./board"

export const DIAGONAL_DIRECTIONS_TUPPLE = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
] as const

export const VERTICAL_AND_HORIZONTAL_DIRECTIONS_TUPPLE = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
] as const

export function verticalAndHorizontalMovement(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], playerRole: PlayerTypes): BoardCellData[] {
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

            row += direction_row;
            column += direction_column;
        }
    }

    return valids;
}

export function diagonalMovement(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], playerRole: PlayerTypes): BoardCellData[] {
    const valids: BoardCellData[] = []

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

            row += direction_row;
            column += direction_column;
        }
    }

    return valids;
}
