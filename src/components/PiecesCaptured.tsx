import { cn } from "../helpers/cn"
import { useGameboardContext } from "../hooks/useGameboardContext"

type Props = {
    isWhite?: boolean
}

export default function PiecesCaptured({ isWhite }: Props) {
    const { CapturedPieces } = useGameboardContext()

    return <div className="w-full border-b border-white">
        <p>
            {isWhite ? "Peças pretas capturadas" : "Peças brancas capturadas"}
        </p>
        <div className="w-full h-8 flex justify-start gap-2">
            {
                CapturedPieces.filter(p => isWhite ? p?.owner == 'black' : p?.owner == 'white').map(p => (
                    <div className="">
                        <p className={cn("[&>svg]:size-8 transition-all duration-500  ease-in-out",
                            !isWhite ? "text-white" : "text-black")} >{p?.icon}</p>
                    </div>
                ))
            }
        </div>
    </div>
}