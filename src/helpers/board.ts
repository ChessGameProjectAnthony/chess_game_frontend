import { Bishop, King, Knight, Pawn, Pieces, Queen, Rook } from "./pieces/Pieces"

export type BoardCellData = {
    cell: string,
    cellMatrizIndex: [row: number, column: number],
    piece?: Pieces[keyof Pieces] | null
}

export function mountBoard(): BoardCellData[][] {
    const alphabetRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const numberColumns = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse()

    return Array.from(numberColumns, (letter, rowIndex) =>
        Array.from(alphabetRows.map((num, columnIndex) => ({
            cell: `${letter}${num}`,
            cellMatrizIndex: [rowIndex, columnIndex],
            piece: null
        } as BoardCellData)))
    )
}

export function fillBoardToStartMatch(board: BoardCellData[][]): BoardCellData[][] {
    board[1].map(cell => cell.piece = {
        icon: Pawn.icon,
        moveset: Pawn.moveset,
        owner: 'black'
    })
    board[0] = [
        {
            cell: board[0][0].cell,
            cellMatrizIndex: [0, 0],
            piece: {
                icon: Rook.icon,
                moveset: Rook.moveset,
                owner: 'black'
            }
        },
        {
            cell: board[0][1].cell,
            cellMatrizIndex: [0, 1],
            piece: {
                icon: Knight.icon,
                moveset: Knight.moveset,
                owner: 'black'
            }
        },
        {
            cell: board[0][2].cell,
            cellMatrizIndex: [0, 2],
            piece: {
                icon: Bishop.icon,
                moveset: Bishop.moveset,
                owner: 'black'
            }
        },
        {
            cell: board[0][3].cell,
            cellMatrizIndex: [0, 3],


            piece: {
                icon: King.icon,
                moveset: King.moveset,
                owner: 'black'
            }
        }, {
            cell: board[0][4].cell,
            cellMatrizIndex: [0, 4],

            piece: {
                icon: Queen.icon,
                moveset: Queen.moveset,
                owner: 'black'
            }
        },
        {
            cell: board[0][5].cell,
            cellMatrizIndex: [0, 5],

            piece: {
                icon: Bishop.icon,
                moveset: Bishop.moveset,
                owner: 'black'
            }
        },
        {
            cell: board[0][6].cell,
            cellMatrizIndex: [0, 6],

            piece: {
                icon: Knight.icon,
                moveset: Knight.moveset,
                owner: 'black'
            }
        },
        {
            cell: board[0][7].cell,
            cellMatrizIndex: [0, 7],

            piece: {
                icon: Rook.icon,
                moveset: Rook.moveset,
                owner: 'black'
            }
        }

    ]


    board[6].map(cell => cell.piece = {
        icon: Pawn.icon,
        moveset: Pawn.moveset,
        owner: 'white'
    })
    board[7] = [{
        cell: board[7][0].cell,
        cellMatrizIndex: [7, 0],
        piece: {
            icon: Rook.icon,
            moveset: Rook.moveset,
            owner: 'white'
        }
    },
    {
        cell: board[7][1].cell,
        cellMatrizIndex: [7, 1],

        piece: {
            icon: Knight.icon,
            moveset: Knight.moveset,
            owner: 'white'
        }
    },
    {
        cell: board[7][2].cell,
        cellMatrizIndex: [7, 2],

        piece: {
            icon: Bishop.icon,
            moveset: Bishop.moveset,
            owner: 'white'
        }
    },
    {
        cell: board[7][3].cell,
        cellMatrizIndex: [7, 3],

        piece: {
            icon: Queen.icon,
            moveset: Queen.moveset,
            owner: 'white'
        }
    },
    {
        cell: board[7][4].cell,
        cellMatrizIndex: [7, 4],

        piece: {
            icon: King.icon,
            moveset: King.moveset,
            owner: 'white'
        }
    },
    {
        cell: board[7][5].cell,
        cellMatrizIndex: [7, 5],

        piece: {
            icon: Bishop.icon,
            moveset: Bishop.moveset,
            owner: 'white'
        }
    },
    {
        cell: board[7][6].cell,
        cellMatrizIndex: [7, 6],

        piece: {
            icon: Knight.icon,
            moveset: Knight.moveset,
            owner: 'white'
        }
    },
    {
        cell: board[7][7].cell,
        cellMatrizIndex: [7, 7],

        piece: {
            icon: Rook.icon,
            moveset: Rook.moveset,
            owner: 'white'
        }
    }]
    return board
}