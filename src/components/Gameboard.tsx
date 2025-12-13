import { useState } from "react"
import { BoardCellData, mountBoard } from "../helpers/board"
import { cn } from "../helpers/cn"
import PieceControl from "./PieceControl"
import { HandleMovePiece } from "../helpers/pieces/ShowMove"
import { useGameboardContext } from "../hooks/useGameboardContext"
import PiecesCaptured from "./PiecesCaptured"

export default function Gameboard() {
    const [currentSelected, setCurrentSelected] = useState<BoardCellData | null>()
    const { board, update: updateBoard, updateCapturedPieces } = useGameboardContext()

    function shouldBeWhite(column: number, row: number): boolean {
        if (column % 2 == 0) {
            return row % 2 == 0 ? true : false
        }
        return row % 2 == 0 ? false : true
    }

    function handleDisplayMove(current: BoardCellData) {
        if (current.cell == currentSelected?.cell || current.piece == null || current.piece.owner != 'white') {
            currentSelected?.piece?.moveset!(board, currentSelected.cellMatrizIndex, false)
            setCurrentSelected(null)
            return
        }
        setCurrentSelected(current)

        current.piece!.moveset!(board, current.cellMatrizIndex, true)
    }


    return (
        <div className="flex flex-col justify-center gap-2">
            <PiecesCaptured />
            <div className="flex flex-col justify-center items-center" id="board-container">
                {board.map((column, columnIndex) => (
                    <div
                        key={columnIndex}
                        className="flex">
                        {column.map((cell, cellIndex) => (
                            <div
                                key={cell.cell}
                                className={cn(`w-24 h-24 relative flex`,
                                    shouldBeWhite(columnIndex, cellIndex) ? "bg-gray-400" : "bg-gray-900"
                                )} >

                                <PieceControl
                                    onClick={() => handleDisplayMove(cell)}
                                    isSelected={cell.cell == currentSelected?.cell && cell.piece?.owner == 'white'}
                                    currentPiece={currentSelected}
                                    update={updateBoard}
                                    updateCapturedPieces={updateCapturedPieces}
                                    cellData={cell} />
                            </div>

                        ))}
                    </div>
                ))}
            </div >
            <PiecesCaptured isWhite />
        </div>
    )



}