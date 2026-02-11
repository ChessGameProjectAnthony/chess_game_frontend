import { useGameboardContext } from "@/hooks/useGameboardContext";
import { BoardCellData } from "../board";
import { transformPawnKey } from "../keyMaker";
import useGameSocket from "@/stores/Match/MatchSocketStore";
import { PlayerType } from "@/Enums/Match/PlayerType";
import { MoveSetRegistry } from "./Pieces";
import { clearMovesShowing } from "./ShowMove";

export function handleDisplayPromotePawnOptions(cell: string, isDisplay = true) {
    const transformContainer = document.getElementById(transformPawnKey(cell))

    transformContainer?.setAttribute("data-transform-available", isDisplay ? "true" : "false")

}

export function sendTransformPawnMessage(piece: BoardCellData) {


}

export function handlePromotePawn(piece: BoardCellData, owner: PlayerType) {
    useGameSocket.setState
}