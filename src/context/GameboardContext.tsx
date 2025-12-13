// context/MyContext.tsx
import { createContext, useContext, useState, ReactNode, SetStateAction } from 'react';
import { BoardCellData, fillBoardToStartMatch, mountBoard } from '../helpers/board';

export type GameboardContextProps = {
    update: React.Dispatch<SetStateAction<BoardCellData[][]>>
    CapturedPieces: BoardCellData['piece'][]

    updateCapturedPieces: React.Dispatch<SetStateAction<BoardCellData['piece'][]>>
    board: BoardCellData[][]
};

export const GameboardContext = createContext<GameboardContextProps | null>(null);
