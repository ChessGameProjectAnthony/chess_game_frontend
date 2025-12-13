import { useContext } from "react";
import { GameboardContext } from "../context/GameboardContext";

export function useGameboardContext() {
    const context = useContext(GameboardContext);

    if (!context) {
        throw new Error('GameboardProvider is missing');
    }

    return context;
}
