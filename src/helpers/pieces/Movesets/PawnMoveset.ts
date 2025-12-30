import { PlayerTypes } from "../../../components/Gameboard";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";


export function PawnMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes) {
    const valids: BoardCellData[] = []
    if (currentPosition[0] == 6) {
        if (board[currentPosition[0] - 1][currentPosition[1]].piece) return
        ShowMove([
            board[currentPosition[0] - 1][currentPosition[1]],
            board[currentPosition[0] - 2][currentPosition[1]],
        ], isValidPiece, playerRole)
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
    ShowMove(valids, isValidPiece, playerRole)

}