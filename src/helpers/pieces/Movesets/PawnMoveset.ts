import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";


export function PawnMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean) {
    const valids: BoardCellData[] = []
    if (currentPosition[0] == 6) {
        ShowMove([
            board[currentPosition[0] - 1][currentPosition[1]],
            board[currentPosition[0] - 2][currentPosition[1]],
        ], isValidPiece)
        return
    }
    if (currentPosition[0] == 0) {
        // transformar rainha ou qlqr merda
    }
    if (board[currentPosition[0] - 1][currentPosition[1] + 1]?.piece) {
        valids.push(board[currentPosition[0] - 1][currentPosition[1] + 1])
    }
    if (board[currentPosition[0] - 1][currentPosition[1] - 1]?.piece) {
        valids.push(board[currentPosition[0] - 1][currentPosition[1] - 1])
    }
    if (!board[currentPosition[0] - 1][currentPosition[1]]?.piece) {
        valids.push(board[currentPosition[0] - 1][currentPosition[1]])
    }
    ShowMove(valids, isValidPiece)

}