import { create } from "zustand"
import { CapturedPieces, GameboardContextProps, GameData, GameEventsType, MatchEndedReason, MoveData, OponnentData, SocketState } from "./MatchData"
import { BoardCellData, fillBoardToStartMatch, mountBoard } from "@/helpers/board"
import { MatchSocketEventsRegister, QueueSocketMessage } from "./MatchSocketEventsRegister"
import axios from "axios"
import { MoveEventData } from "@/Enums/Match/MoveEvent"
import { HandleMovePiece } from "@/helpers/pieces/ShowMove"
import { Pieces } from "@/helpers/pieces/Pieces"
import { MatchEvents } from "@/Enums/Match/MatchEvents"
import { PlayerType } from "@/Enums/Match/PlayerType"
import useAuth from "../AuthStore"
import { Navigate } from "@tanstack/react-router"

const useGameSocket = create<GameboardContextProps>((set, get) => ({
    update: () => set,
    board: null,
    updateBoard: (value: BoardCellData[][]) => {
        set({
            board: value
        } as GameboardContextProps)
    },
    mountPlayerBoard: (playerType) => {
        set(
            {
                board: fillBoardToStartMatch(mountBoard(playerType)),
            }
        )
    },

    CapturedPieces: {} as CapturedPieces,
    updateCapturedPieces: (value: BoardCellData['piece']) => {
        set(state => (
            {
                CapturedPieces: {
                    ...state.CapturedPieces,
                    [value!.owner!]: [...state.CapturedPieces[value?.owner!] ?? [], value]
                }
            }
        ))
        console.log(get().CapturedPieces)
    },
    handleReceivePieceMovement: (move: Pick<MoveEventData, 'DestinationCell' | 'Piece' | 'OwnerType'>) => {
        console.log("top")
        HandleMovePiece(
            get().updateBoard,
            get().updateCapturedPieces,
            get().board!,
            move.OwnerType,
            move.DestinationCell,
            move.Piece
        )
    },
    handleSendPiecesMovement: (move: Pick<MoveEventData, 'DestinationCell' | 'Piece'>) => {
        // enviar pro servidor 
        if (!get().socketState?.socket || !move.Piece.piece?.moveset) return

        const payload: MoveEventData = {
            DestinationCell: move.DestinationCell,
            MovedAt: new Date(),
            OwnerId: useAuth.getState()!.profileData!.id,
            OwnerType: get().gameData.PlayerIs,
            Piece: move.Piece,
            RoomId: get().gameData.MatchId,

        }
        get().socketState?.sendMessage({
            Event: MatchEvents.MakeMove,
            Data: payload
        })
    },
    socketState: {
        isMatchEnded: false,
        matchEndendMessage: null,
        matchEnded: (message: MatchEndedReason) => {
            set(state => ({ socketState: { ...state.socketState, matchEndendMessage: message, isMatchEnded: true } } as GameboardContextProps))
        },
        drawProposed: false,
        isMatchFound: false,
        socket: null,
        connect: () => {
            if (get().socketState?.socket?.readyState === WebSocket.OPEN) return
            const socket = new WebSocket(`ws://localhost:5050/ws/play`)
            console.log(socket)
            set(state => ({
                socketState: {
                    ...state.socketState,
                    socket,
                }
            } as GameboardContextProps));
            MatchSocketEventsRegister(socket);
        },
        disconnect: () => {
            console.log("fkafkakfa")
            get().socketState?.socket?.close()
            set({ socketState: null })
        },
        onMessage: (msg: object) => {
            set(state => ({
                socketState: {
                    ...state.socketState,
                    messages: [...state.socketState?.messages ?? [], msg]
                }
            } as GameboardContextProps))
        },
        joinMatch: () => {
            set(state => ({ ...state, socketState: { ...state.socketState, isMatchFound: true } } as GameboardContextProps))
        },
        messages: [] as object[],
        sendMessage: (msg: object) => {
            const socket = get().socketState?.socket;
            console.log(socket)
            const parsed = JSON.stringify(msg)
            console.log(parsed)
            if (socket?.readyState !== WebSocket.OPEN) {
                console.warn("Socket not open");
                return;
            }
            socket.send(parsed)
        }
    },
    fetchOponnetData: async () => {
        // const user = await axios.get(`fodase ${get().gameData!.!}`) as OponnentData;
        // set(state => ({
        //     gameData: {
        //         ...state.gameData,
        //         OponentData: user
        //     }
        // }))
    },
    gameData: {} as GameData,
    setGameData: (data: Partial<GameData>) => {
        console.log("setting game data")
        set(state => ({
            gameData: {
                ...state.gameData,
                ...data
            }
        }))
    }
}))



export default useGameSocket