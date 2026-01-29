import { JSX, SetStateAction } from "react";
import { BoardCellData } from "../../helpers/board";
import { cn } from "../../helpers/cn";
import { HandleMovePiece } from "../../helpers/pieces/ShowMove";
import { PlayerType } from "@/Enums/Match/PlayerType";
import useGameSocket from "@/stores/Match/MatchSocketStore";

export enum CellActions {
  move = "move",
  attack = "attack",
  unavailable = "unavailable",
  check = "check",
}

type Props = {
  cellData: BoardCellData;
  isSelected: boolean;
  currentPiece?: BoardCellData | null;

  board: BoardCellData[][];
} & JSX.IntrinsicElements["div"];

export default function PieceControl({
  cellData,
  isSelected,
  board,
  currentPiece,
  ...rest
}: Props) {
  const { handleSendPiecesMovement, gameData } = useGameSocket()

  return (
    <div
      className="group flex w-full h-full  items-center justify-center"
      id={cellData.cell}
      data-possible={CellActions["unavailable"]}
      {...rest}
    >
      <p className="absolute pointer-events-none top-1 left-1 text-purple-700 select-none">
        {cellData?.cell}
      </p>
      <div
        className={cn(
          `absolute rounded-full opacity-45 w-8 h-8 group-data-[possible=unavailable]:hidden`,
          `group-data-[possible=move]:bg-blue-600`,
          `group-data-[possible=attack]:bg-red-600`,
          `group-data-[possible=check]:bg-orange-400`
        )}
        onClick={() => {
          if (!currentPiece) return
          handleSendPiecesMovement(
            {
              DestinationCell: cellData,
              Piece: currentPiece,
              OwnerType: gameData.PlayerIs
            }
          );
        }}
      />
      <p
        className={cn(
          "text-[3.5rem] font-extrabold transition-all duration-500  ease-in-out select-none",
          cellData.piece?.owner == gameData.PlayerIs &&
          "group-hover:[&>svg]:size-12 cursor-pointer",
          isSelected && "[&>svg]:size-12",
          cellData?.piece?.owner === PlayerType.White ? "text-gray-300" : "text-gray-900"
        )}
      >
        {cellData?.piece?.icon}
      </p>
    </div>
  );
}
