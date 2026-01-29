import { PlayerType } from "@/Enums/Match/PlayerType"
import { Bishop, King, Knight, Pawn, Pieces, Queen, Rook } from "./pieces/Pieces"
import useGameSocket from "@/stores/Match/MatchSocketStore"

export type BoardCellData = {
    cell: string,
    cellMatrizIndex: [row: number, column: number],
    piece?: Pieces[keyof Pieces] | null
}

export function mountBoard(playerRole: PlayerType): BoardCellData[][] {
    let alphabetRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    let numberColumns = ['8', '7', '6', '5', '4', '3', '2', '1']
    if (playerRole == PlayerType.Black) {
        alphabetRows = alphabetRows.reverse()
        numberColumns = numberColumns.reverse()
    }
    return Array.from(numberColumns, (letter, rowIndex) =>
        Array.from(alphabetRows.map((num, columnIndex) => ({
            cell: `${letter}${num}`,
            cellMatrizIndex: [rowIndex, columnIndex],
            piece: null
        } as BoardCellData)))
    )
}

export function fillBoardToStartMatch(board: BoardCellData[][]): BoardCellData[][] {
    const oponentRole = useGameSocket.getState().gameData.OponnetIs
    const playerRole = useGameSocket.getState().gameData.PlayerIs
    board[1].map(cell => cell.piece = {
        icon: Pawn.icon,
        moveset: Pawn.moveset,
        owner: oponentRole
    })


    board[0] = [
        {
            cell: board[0][0].cell,
            cellMatrizIndex: [0, 0],
            piece: {
                icon: Rook.icon,
                moveset: Rook.moveset,
                owner: oponentRole
            }
        },
        {
            cell: board[0][1].cell,
            cellMatrizIndex: [0, 1],
            piece: {
                icon: Knight.icon,
                moveset: Knight.moveset,
                owner: oponentRole
            }
        },
        {
            cell: board[0][2].cell,
            cellMatrizIndex: [0, 2],
            piece: {
                icon: Bishop.icon,
                moveset: Bishop.moveset,
                owner: oponentRole
            }
        },
        {
            cell: board[0][3].cell,
            cellMatrizIndex: [0, 3],

            piece: {
                icon: Queen.icon,
                moveset: Queen.moveset,
                owner: oponentRole
            }
        },
        {
            cell: board[0][4].cell,
            cellMatrizIndex: [0, 4],
            piece: {
                icon: King.icon,
                moveset: King.moveset,
                owner: oponentRole
            }
        },
        {
            cell: board[0][5].cell,
            cellMatrizIndex: [0, 5],

            piece: {
                icon: Bishop.icon,
                moveset: Bishop.moveset,
                owner: oponentRole
            }
        },
        {
            cell: board[0][6].cell,
            cellMatrizIndex: [0, 6],

            piece: {
                icon: Knight.icon,
                moveset: Knight.moveset,
                owner: oponentRole
            }
        },
        {
            cell: board[0][7].cell,
            cellMatrizIndex: [0, 7],

            piece: {
                icon: Rook.icon,
                moveset: Rook.moveset,
                owner: oponentRole
            }
        }

    ]


    board[6].map(cell => cell.piece = {
        icon: Pawn.icon,
        moveset: Pawn.moveset,
        owner: playerRole
    })
    board[7] = [{
        cell: board[7][0].cell,
        cellMatrizIndex: [7, 0],
        piece: {
            icon: Rook.icon,
            moveset: Rook.moveset,
            owner: playerRole
        }
    },
    {
        cell: board[7][1].cell,
        cellMatrizIndex: [7, 1],

        piece: {
            icon: Knight.icon,
            moveset: Knight.moveset,
            owner: playerRole
        }
    },
    {
        cell: board[7][2].cell,
        cellMatrizIndex: [7, 2],

        piece: {
            icon: Bishop.icon,
            moveset: Bishop.moveset,
            owner: playerRole
        }
    },
    {
        cell: board[7][3].cell,
        cellMatrizIndex: [7, 3],

        piece: {
            icon: King.icon,
            moveset: King.moveset,
            owner: playerRole
        }
    },
    {
        cell: board[7][4].cell,
        cellMatrizIndex: [7, 4],

        piece: {
            icon: Queen.icon,
            moveset: Queen.moveset,
            owner: playerRole
        }
    },

    {
        cell: board[7][5].cell,
        cellMatrizIndex: [7, 5],

        piece: {
            icon: Bishop.icon,
            moveset: Bishop.moveset,
            owner: playerRole
        }
    },
    {
        cell: board[7][6].cell,
        cellMatrizIndex: [7, 6],

        piece: {
            icon: Knight.icon,
            moveset: Knight.moveset,
            owner: playerRole
        }
    },
    {
        cell: board[7][7].cell,
        cellMatrizIndex: [7, 7],

        piece: {
            icon: Rook.icon,
            moveset: Rook.moveset,
            owner: playerRole
        }
    }]
    return board
}