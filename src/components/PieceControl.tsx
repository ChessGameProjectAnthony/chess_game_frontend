import { BoardCellData } from "../helpers/board";
import { cn } from "../helpers/cn";

type Props = {
    cellData: BoardCellData
}

export default function PieceControl({ cellData }: Props) {


    return (
        <div className={cn("group flex w-full h-full  items-center justify-center", cellData?.piece && true ? "cursor-pointer" : '')}>
            <p className="absolute top-1 left-1 text-purple-700">{cellData?.cell}</p>
            <p className={cn("[&>svg]:size-8 transition-all duration-500  ease-in-out",
                "group-hover:[&>svg]:size-12"
                , cellData?.piece?.owner == 'white' ? "text-gray-500" : "text-red-500")} >{cellData?.piece?.icon}</p>
        </div>
    )
}