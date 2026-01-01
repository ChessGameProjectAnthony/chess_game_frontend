import { PlayerTypes } from "@/components/Gameboard/Gameboard";
import { verticalAndHorizontalMovement } from "../../basicMovements";
import { BoardCellData } from "../../board";
import { ShowMove } from "../ShowMove";
import { MoveSetAction } from "../Pieces";
import { detectCheck } from "@/helpers/detectCheckAndCheckMate";

export function RookMoveset(board: BoardCellData[][], currentPosition: BoardCellData['cellMatrizIndex'], isValidPiece: boolean, playerRole: PlayerTypes, action: MoveSetAction) {
    const valids = verticalAndHorizontalMovement(board, currentPosition, playerRole)
    if (action === 'show') {
        ShowMove(valids, isValidPiece, playerRole)
    } else {
        detectCheck(valids)
    }
}
