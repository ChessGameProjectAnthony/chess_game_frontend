import { SetStateAction } from "react";
import { BoardCellData } from "../board";
import { CellActions } from "../../components/PieceControl";

let prev: BoardCellData[] | null;

export function ShowMove(cells: BoardCellData[], isToActivate: boolean) {
    cells = cells.filter(Boolean)
    prev?.forEach(cell => {
        document.getElementById(cell.cell)?.setAttribute("data-possible", CellActions['unavailable'])
    })

    if (!isToActivate) return

    cells.forEach(cell => {
        let action: keyof typeof CellActions
        if (cell.piece?.owner == 'black') action = "attack"
        else if (cell.piece?.owner == 'white') action = "unavailable"
        else action = 'move'

        document.getElementById(cell.cell)?.setAttribute("data-possible", action)
    })
    prev = cells
}

export function HandleMovePiece(
    update: React.Dispatch<SetStateAction<BoardCellData[][]>>,
    updateCapturedPieces: React.Dispatch<SetStateAction<BoardCellData['piece'][]>>,
    DesiredPos: BoardCellData, currentPiece?: BoardCellData | null) {
    if (currentPiece == null) return
    console.log(DesiredPos, currentPiece)

    let newCapture: BoardCellData['piece'] = null

    update(prev => (
        prev.map(row =>
            row.map(cell => {
                if (cell.cell == DesiredPos.cell) {
                    if (cell.piece && cell.piece.owner == 'black') {
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
        )

    ))
    if (!newCapture) return
    updateCapturedPieces(prev => [...prev, newCapture])
}