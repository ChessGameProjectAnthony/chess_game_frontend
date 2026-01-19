import useGameSocket from "@/stores/Match/MatchSocketStore";
import { cn } from "../../helpers/cn";
import { PlayerType } from "@/Enums/Match/PlayerType";

type Props = {
  playerCapture?: keyof typeof PlayerType;
};

export default function PiecesCaptured({ playerCapture }: Props) {
  const { CapturedPieces } = useGameSocket();
  const isWhite = playerCapture == "White"
  return (
    <div className="w-full border-b border-white">
      <p>{isWhite ? "Peças pretas capturadas" : "Peças brancas capturadas"}</p>
      <div className="w-full h-8 flex justify-start gap-2">
        {CapturedPieces[playerCapture as keyof typeof CapturedPieces]?.map((p) => (
          <div className="">
            <p
              className={cn(
                "transition-all duration-500  ease-in-out",
                !isWhite ? "text-blue-500" : "text-purple-700"
              )}
            >
              {p?.icon}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
