import { useMemo, useState } from "react"

import PiecesCaptured from "./PiecesCaptured"
import PieceControl from "./PieceControl"
import { BoardCellData } from "@/helpers/board"
import { useGameboardContext } from "@/hooks/useGameboardContext"
import { cn } from "@/helpers/cn"
import useGameSocket from "@/stores/Match/MatchSocketStore"
import { PlayerType } from "@/Enums/Match/PlayerType"
import { Bishop, King, Knight, MoveSetRegistry, Queen, Rook } from "@/helpers/pieces/Pieces"
import { Button } from "../ui/button"
import { PlayerInfo } from "./PlayerInfo"
import { Chat } from "./Chat"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { transformPawnKey } from "@/helpers/keyMaker"
import { handleDisplayPromotePawnOptions } from "@/helpers/pieces/tranformPawn"


export default function Gameboard() {
    const [currentSelected, setCurrentSelected] = useState<BoardCellData | null>()
    const { mountPlayerBoard, update: updateBoard, updateCapturedPieces, board, gameData } = useGameSocket()

    useMemo(() => mountPlayerBoard(gameData.PlayerIs), [gameData.PlayerIs])

    function shouldBeWhite(column: number, row: number): boolean {
        if (column % 2 == 0) {
            return row % 2 == 0 ? true : false
        }
        return row % 2 == 0 ? false : true
    }

    function handleDisplayMove(current: BoardCellData) {
        if (current.cell == currentSelected?.cell || current.piece == null || current.piece.owner != gameData.PlayerIs || !gameData.isPlayerTurn) {
            MoveSetRegistry[currentSelected?.piece?.moveset!](board!, current.cellMatrizIndex, false, gameData.PlayerIs, 'show')

            setCurrentSelected(null)
            return
        }
        setCurrentSelected(current)

        MoveSetRegistry[current.piece?.moveset!](board!, current.cellMatrizIndex, true, gameData.PlayerIs, 'show')
    }

    return (
        <div className="flex flex-col justify-center items-center" id="board-container">
            {board?.map((column, columnIndex) => (
                <div
                    key={columnIndex}
                    className="flex">
                    {column.map((cell, cellIndex) => (
                        <div
                            key={cell.cell}
                            className={cn(`w-22 h-22 relative flex`,
                                shouldBeWhite(columnIndex, cellIndex) ? "bg-white" : "bg-gray-600"
                            )} >

                            <PieceControl
                                onClick={() => handleDisplayMove(cell)}
                                isSelected={cell.cell == currentSelected?.cell && cell.piece?.owner == gameData.PlayerIs}
                                currentPiece={currentSelected}
                                cellData={cell}
                                board={board!}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div >
    )
}