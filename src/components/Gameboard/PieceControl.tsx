import { JSX, SetStateAction } from "react";
import { BoardCellData } from "../../helpers/board";
import { cn } from "../../helpers/cn";
import { HandleMovePiece } from "../../helpers/pieces/ShowMove";
import { PlayerType } from "@/Enums/Match/PlayerType";
import useGameSocket from "@/stores/Match/MatchSocketStore";
import { Button } from "../ui/button";
import { transformPawnKey } from "@/helpers/keyMaker";
import { Bishop, Knight, MoveSetRegistry, Queen, Rook } from "@/helpers/pieces/Pieces";
import { handleDisplayPromotePawnOptions } from "@/helpers/pieces/tranformPawn";

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
  const { handleSendPiecesMovement, gameData, handleSendPromotePawnMessage } = useGameSocket()

  function handleSendPromotePawn(piece: BoardCellData['piece']) {
    handleSendPromotePawnMessage({
      ...cellData,
      piece: piece
    })
    handleDisplayPromotePawnOptions(cellData.cell, false)
    MoveSetRegistry[piece?.moveset!](board!, currentPiece?.cellMatrizIndex!, false, gameData.PlayerIs, 'show')

  }
  return (
    <>
      {cellData.cellMatrizIndex[0] === 0 && (
        <div
          id={transformPawnKey(cellData.cell)}
          data-transform-available={false}
          className="data-[transform-available=false]:hidden data-[transform-available=true]:flex  gap-12 bg-accent z-30 absolute   left-1/2 transform -translate-x-1/2 -top-20 w-max p-2 px-12 rounded-3xl">
          {[Queen, Rook, Bishop, Knight].map(piece => (
            <div className="flex text-center justify-center items-center h-24">
              <Button
                onClick={() => handleSendPromotePawn(piece)}
                variant={'ghost'} className="h-fit text-[3.8rem] hover:scale-140  hover:font-extrabold hover:brightness-80  bg-accent rounded-md cursor-pointer">
                {piece.icon}
              </Button>
            </div>
          ))}
        </div>
      )}
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
    </>

  );
}
