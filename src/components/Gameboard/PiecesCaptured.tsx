import useGameSocket from "@/stores/Match/MatchSocketStore";
import { cn } from "../../helpers/cn";
import { PlayerType } from "@/Enums/Match/PlayerType";
import { Bishop, Pawn } from "@/helpers/pieces/Pieces";

type Props = {
  capituredFrom: PlayerType;
};

export default function PiecesCaptured({ capituredFrom }: Props) {
  const { CapturedPieces } = useGameSocket();
  const isWhite = capituredFrom === PlayerType.White
  return (
    <div className="w-fit h-full flex justify-center  items-center">
      <div className="w-fit flex justify-start gap-1 items-center ">
        {(CapturedPieces[capituredFrom as keyof typeof CapturedPieces])?.map((p) => (
          <div className="">
            <p
              className={cn(
                "transition-all duration-500  ease-in-out font-bold text-[1.8rem]",
                isWhite ? "text-gray-500" : "text-black"
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
