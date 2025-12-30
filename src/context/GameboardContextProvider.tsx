import { ReactNode, useState } from "react";
import { BoardCellData, fillBoardToStartMatch, mountBoard } from "../helpers/board";
import { GameboardContext, GameboardContextProps } from "./GameboardContext";

type GameboardProviderProps = {
    children: ReactNode;
};

export function GameboardProvider({ children }: GameboardProviderProps) {
    const [board, setBoard] = useState<BoardCellData[][]>([]);
    function generateFilledGameBoard(userRole: string) {
        const user = userRole == 'white'
        setBoard(fillBoardToStartMatch(mountBoard(user), user))
    }

    const [CapturedPieces, setCapturedPieces] = useState<BoardCellData['piece'][]>([])


    const value: GameboardContextProps = {
        board,
        update: setBoard,
        CapturedPieces,
        generateFilledGameBoard,
        updateCapturedPieces: setCapturedPieces,
    }
    return (
        <GameboardContext.Provider value={value}>
            {children}
        </GameboardContext.Provider>
    );
}
