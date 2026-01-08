import {
  ChessBishop,
  ChessKing,
  ChessKnight,
  ChessPawn,
  ChessQueen,
  ChessRook,
} from "lucide-react";
import { BoardCellData } from "../board";
import { PawnMoveset } from "./Movesets/PawnMoveset";
import { QueenMoveset } from "./Movesets/QueenMoveset";
import { BishopMoveset } from "./Movesets/BishopMoveset";
import { RookMoveset } from "./Movesets/RookMoveset";
import { KingMoveset } from "./Movesets/KingMoveset";
import { KnightMoveset } from "./Movesets/KnightMoveset";
import { PlayerTypes } from "@/components/Gameboard/Gameboard";

export type Pieces = {
  King: PieceData;
  Queen: PieceData;
  Rook: PieceData;
  Bishop: PieceData;
  Knight: PieceData;
  Pawn: PieceData;
};
export type MoveSetAction = "show" | "detectCheck";
export type PieceData = {
  moveset: (
    board: BoardCellData[][],
    currentPosition: BoardCellData["cellMatrizIndex"],
    isValidPiece: boolean,
    playerRole: PlayerTypes,
    action: MoveSetAction
  ) => void;
  owner: "white" | "black" | null;
  icon: React.ReactNode;
};

export const King: Pieces["King"] = {
  icon: "♔",
  owner: null,
  moveset: KingMoveset,
};
export const Queen: Pieces["Queen"] = {
  icon: "♕",
  owner: null,
  moveset: QueenMoveset,
};
export const Rook: Pieces["Rook"] = {
  icon: "♖",
  owner: null,
  moveset: RookMoveset,
};
export const Bishop: Pieces["Bishop"] = {
  icon: "♗",
  owner: null,
  moveset: BishopMoveset,
};
export const Knight: Pieces["Knight"] = {
  icon: "♘",
  owner: null,
  moveset: KnightMoveset,
};
export const Pawn: Pieces["Pawn"] = {
  icon: "♙",
  owner: null,
  moveset: PawnMoveset,
};
