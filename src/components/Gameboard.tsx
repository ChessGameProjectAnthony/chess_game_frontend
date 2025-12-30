import { useMemo, useState } from "react"
import { BoardCellData } from "../helpers/board"
import { cn } from "../helpers/cn"
import { useGameboardContext } from "../hooks/useGameboardContext"
import PiecesCaptured from "./PiecesCaptured"
import PieceControl from "./PieceControl"

export type PlayerTypes = 'white' | 'black'
export type GameboarProps = {
    playerRole: PlayerTypes
}


export default function Gameboard({ playerRole }: GameboarProps) {
    const [currentSelected, setCurrentSelected] = useState<BoardCellData | null>()
    const { board, update: updateBoard, updateCapturedPieces, generateFilledGameBoard } = useGameboardContext()
    useMemo(() => generateFilledGameBoard(playerRole), [playerRole])

    function shouldBeWhite(column: number, row: number): boolean {
        if (column % 2 == 0) {
            return row % 2 == 0 ? true : false
        }
        return row % 2 == 0 ? false : true
    }

    function handleDisplayMove(current: BoardCellData) {
        if (current.cell == currentSelected?.cell || current.piece == null || current.piece.owner != playerRole) {
            currentSelected?.piece?.moveset(board, currentSelected.cellMatrizIndex, false, playerRole)
            setCurrentSelected(null)
            return
        }
        setCurrentSelected(current)

        current.piece!.moveset(board, current.cellMatrizIndex, true, playerRole)
    }


    return (
        <div className="flex flex-col justify-center gap-2">
            <PiecesCaptured isWhite={playerRole != 'white'} />
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
                                    isSelected={cell.cell == currentSelected?.cell && cell.piece?.owner == playerRole}
                                    currentPiece={currentSelected}
                                    update={updateBoard}
                                    updateCapturedPieces={updateCapturedPieces}
                                    playerRole={playerRole}
                                    cellData={cell} />
                            </div>

                        ))}
                    </div>
                ))}
            </div >
            <PiecesCaptured isWhite={playerRole == 'white'} />
        </div>
    )



}