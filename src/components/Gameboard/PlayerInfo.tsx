import { PlayerType } from "@/Enums/Match/PlayerType";
import PiecesCaptured from "./PiecesCaptured";
import useGameSocket from "@/stores/Match/MatchSocketStore";

type Props = {
    isPlayer?: boolean
}

export function PlayerInfo({ isPlayer }: Props) {
    const { gameData } = useGameSocket()

    return (
        <div
            className="animate-fade-in my-2 mx-6 flex items-center justify-center p-2 rounded-2xl border border-accent-foreground"
            style={{ animationDelay: "0.1s" }}
        >
            <div className="flex items-center gap-8 w-full h-full ">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-nav-foreground">
                    ♚
                </div>
                <div>
                    <p className="font-semibold text-foreground">Magnus</p>
                    <p className="text-xs text-muted-foreground">Rating: 2,847</p>
                </div>
                <div className="rounded-lg bg-card px-3 py-1 card-shadow">
                    <span className="font-mono text-lg font-bold text-foreground">
                        4:32
                    </span>
                </div>
                <PiecesCaptured capituredFrom={isPlayer ? gameData.OponnetIs : gameData.PlayerIs} />
            </div>
        </div>

    )
}