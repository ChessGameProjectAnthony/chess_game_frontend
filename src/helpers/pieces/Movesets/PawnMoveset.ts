import { PlayerTypes } from "@/components/Gameboard/Gameboard";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";
import { detectCheck } from "@/helpers/detectCheckAndCheckMate";
import { MoveSetAction } from "../Pieces";


export function PawnMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes, action: MoveSetAction) {
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
    if (action === 'show') {
        ShowMove(valids, isValidPiece, playerRole)
    } else {
        detectCheck(valids)
    }
}