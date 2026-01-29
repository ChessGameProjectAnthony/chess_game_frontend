import { SetStateAction } from "react";
import { BoardCellData } from "../board";
import { CellActions } from "../../components/Gameboard/PieceControl";
import { PlayerType } from "@/Enums/Match/PlayerType";
import useGameSocket from "@/stores/Match/MatchSocketStore";
import { MoveSetRegistry } from "./Pieces";

let prev: BoardCellData[] | null;

export function ShowMove(cells: BoardCellData[], isToActivate: boolean, playerRole: PlayerType) {
    cells = cells.filter(Boolean)
    prev?.forEach(cell => {
        document.getElementById(cell.cell)?.setAttribute("data-possible", CellActions['unavailable'])
    })

    if (!isToActivate) return
    cells.forEach(cell => {

        let action: keyof typeof CellActions
        if (cell.piece != null && cell.piece.owner !== playerRole) {
            if (cell.piece.moveset == "KingMoveset") action = 'check'
            else action = 'attack'
        }
        else if (cell.piece?.owner === playerRole) action = "unavailable"
        else action = 'move'

        document.getElementById(cell.cell)?.setAttribute("data-possible", action)
    })
    prev = cells
}

export function HandleMovePiece(
    update: (value: BoardCellData[][]) => void,
    updateCapturedPieces: (captured: BoardCellData['piece']) => void,
    currentBoard: BoardCellData[][],
    playerRole: PlayerType,
    DesiredPos: BoardCellData,
    currentPiece?: BoardCellData | null,
) {
    if (currentPiece == null) return

    let newCapture: BoardCellData['piece'] = null

    if (DesiredPos.piece?.moveset == "KingMoveset") return
    update(currentBoard.map(row =>
        row.map(cell => {
            if (cell.cell == DesiredPos.cell) {
                if (cell.piece && cell.piece.owner !== playerRole) {
                    newCapture = cell.piece
                }
                return {
                    ...cell,
                    piece: currentPiece.piece
                }
            }
            if (cell.cell == currentPiece.cell) {
                return {
                    ...cell,
                    piece: null
                }
            }
            return {
                ...cell
            }

        })
    ))
    MoveSetRegistry[currentPiece.piece?.moveset!](currentBoard, DesiredPos.cellMatrizIndex, true, playerRole, 'detectCheck')

    if (!newCapture) return
    console.log(newCapture)
    updateCapturedPieces(newCapture)
}