import { JSX, SetStateAction } from "react";
import { BoardCellData } from "../helpers/board";
import { cn } from "../helpers/cn";
import { HandleMovePiece } from "../helpers/pieces/ShowMove";

export enum CellActions {
    move = "move",
    attack = "attack",
    unavailable = "unavailable"
}


type Props = {
    cellData: BoardCellData,
    isSelected: boolean,
    currentPiece?: BoardCellData | null
    update: React.Dispatch<SetStateAction<BoardCellData[][]>>,
    updateCapturedPieces: React.Dispatch<SetStateAction<BoardCellData['piece'][]>>

} & JSX.IntrinsicElements['div']

export default function PieceControl({ cellData, isSelected, update, updateCapturedPieces, currentPiece, ...rest }: Props) {
    return (
        <div className="group flex w-full h-full  items-center justify-center"
            id={cellData.cell}
            data-possible={CellActions['unavailable']}
            {...rest}
        >
            <p className="absolute pointer-events-none top-1 left-1 text-purple-700">{cellData?.cell}</p>
            <div
                className={cn(`absolute rounded-full opacity-45 w-8 h-8 group-data-[possible=unavailable]:hidden`,
                    `group-data-[possible=move]:bg-blue-600`,
                    `group-data-[possible=attack]:bg-red-600`
                )}
                onClick={() => {
                    HandleMovePiece(update, updateCapturedPieces, cellData, currentPiece)
                }}
            />
            <p className={cn("[&>svg]:size-8 transition-all duration-500  ease-in-out",
                cellData.piece?.owner == 'white' && "group-hover:[&>svg]:size-12 cursor-pointer",
                isSelected && "[&>svg]:size-12",
                cellData?.piece?.owner == 'white' ? "text-white" : "text-black")} >{cellData?.piece?.icon}</p>
        </div >
    )
}