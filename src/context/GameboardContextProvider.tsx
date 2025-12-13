import { ReactNode, useState } from "react";
import { BoardCellData, fillBoardToStartMatch, mountBoard } from "../helpers/board";
import { GameboardContext, GameboardContextProps } from "./GameboardContext";

type GameboardProviderProps = {
    children: ReactNode;
};

export function GameboardProvider({ children }: GameboardProviderProps) {
    const [board, setBoard] = useState<BoardCellData[][]>(
        fillBoardToStartMatch(mountBoard())
    );
    const [CapturedPieces, setCapturedPieces] = useState<BoardCellData['piece'][]>([])

    const value: GameboardContextProps = {
        board,
        update: setBoard,
        CapturedPieces,
        updateCapturedPieces: setCapturedPieces
    }
    return (
        <GameboardContext.Provider value={value}>
            {children}
        </GameboardContext.Provider>
    );
}
