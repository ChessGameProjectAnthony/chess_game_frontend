import { BoardCellData } from "./board";

export function detectCheck(cells: BoardCellData[]) {
    if (cells.find(cell => cell.piece?.owner !== "white" && cell.piece?.moveset.name === "KingMoveset")) {
        console.log("Check")
    }
}

function detectCheckmate() { }