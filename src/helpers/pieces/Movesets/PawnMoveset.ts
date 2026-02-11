import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";
import { detectCheck } from "@/helpers/detectCheckAndCheckMate";
import { MoveSetAction } from "../Pieces";
import { PlayerType } from "@/Enums/Match/PlayerType";
import useGameSocket from "@/stores/Match/MatchSocketStore";
import { handleDisplayPromotePawnOptions } from "../tranformPawn";


export function PawnMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerType, action: MoveSetAction) {
    const valids: BoardCellData[] = []
    if (currentPosition[0] == 6) {
        if (board[currentPosition[0] - 1][currentPosition[1]].piece) return
        valids.push(board[currentPosition[0] - 1][currentPosition[1]],
            board[currentPosition[0] - 2][currentPosition[1]])
        if (board[currentPosition[0] - 1][currentPosition[1] + 1]?.piece) {
            valids.push(board[currentPosition[0] - 1][currentPosition[1] + 1])
        }
        if (board[currentPosition[0] - 1][currentPosition[1] - 1]?.piece) {
            valids.push(board[currentPosition[0] - 1][currentPosition[1] - 1])
        }

        ShowMove(valids, isValidPiece, playerRole)
        return
    }
    if (currentPosition[0] == 0 && board[currentPosition[0]][currentPosition[1]].piece?.moveset == "PawnMoveset" && board[currentPosition[0]][currentPosition[1]].piece?.owner === useGameSocket.getState().gameData.PlayerIs) {
        handleDisplayPromotePawnOptions(board[currentPosition[0]][currentPosition[1]].cell)
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