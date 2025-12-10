import { board, defaultBoard, mountBoard } from "../helpers/board"
import { cn } from "../helpers/cn"
import PieceControl from "./PieceControl"

export default function Gameboard() {
    function shouldBeWhite(column: number, row: number): boolean {
        if (column % 2 == 0) {
            return row % 2 == 0 ? true : false
        }
        return row % 2 == 0 ? false : true
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                {defaultBoard.map((column, columnIndex) => (
                    <div className="flex">
                        {column.map((cell, cellIndex) => (
                            <div id={(columnIndex).toString()} className={cn(`w-24 h-24 relative flex`,
                                shouldBeWhite(columnIndex, cellIndex) ? "bg-white" : "bg-black"
                            )} >
                                <PieceControl cellData={cell} />
                            </div>

                        ))}
                    </div>
                ))}
            </div >
        </>
    )



}