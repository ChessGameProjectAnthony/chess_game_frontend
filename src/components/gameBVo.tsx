import { cn } from "@/lib/utils";

const pieces: Record<string, string> = {
  "8A": "♜",
  "8B": "♞",
  "8C": "♝",
  "8D": "♛",
  "8E": "♚",
  "8F": "♝",
  "8G": "♞",
  "8H": "♜",
  "7A": "♟",
  "7B": "♟",
  "7C": "♟",
  "7D": "♟",
  "7E": "♟",
  "7F": "♟",
  "7G": "♟",
  "7H": "♟",
  "2A": "♙",
  "2B": "♙",
  "2C": "♙",
  "2D": "♙",
  "2E": "♙",
  "2F": "♙",
  "2G": "♙",
  "2H": "♙",
  "1A": "♖",
  "1B": "♘",
  "1C": "♗",
  "1D": "♕",
  "1E": "♔",
  "1F": "♗",
  "1G": "♘",
  "1H": "♖",
};

const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
const rows = [8, 7, 6, 5, 4, 3, 2, 1];

interface ChessBoardProps {
  matchId?: string;
  playerName?: string;
}

export const ChessBoard = ({
  matchId = "ABC123",
  playerName = "Player",
}: ChessBoardProps) => {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{playerName}</h2>
        <p className="text-sm text-muted-foreground">Match ID: {matchId}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">Captured pieces</p>

        <div className="rounded-xl bg-card p-2 chess-board-shadow overflow-hidden">
          <div className="grid grid-cols-8 gap-0">
            {rows.map((row) =>
              columns.map((col) => {
                const position = `${row}${col}`;
                const isLight =
                  (rows.indexOf(row) + columns.indexOf(col)) % 2 === 0;
                const piece = pieces[position];
                const isWhitePiece =
                  piece && ["♔", "♕", "♖", "♗", "♘", "♙"].includes(piece);

                return (
                  <div
                    key={position}
                    className={cn(
                      "relative flex items-center justify-center aspect-square w-10 sm:w-12 transition-colors duration-200",
                      isLight ? "bg-chess-light" : "bg-chess-dark",
                      "hover:brightness-110 cursor-pointer"
                    )}
                  >
                    <span className="absolute top-0.5 left-1 text-[8px] font-medium opacity-40">
                      {position}
                    </span>
                    {piece && (
                      <span
                        className={cn(
                          "text-2xl sm:text-3xl select-none transition-transform duration-150 hover:scale-110",
                          isWhitePiece
                            ? "text-white drop-shadow-md"
                            : "text-gray-900"
                        )}
                      >
                        {piece}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">Captured pieces</p>
      </div>
    </div>
  );
};
