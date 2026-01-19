import { create } from "zustand"
import { CapturedPieces, GameboardContextProps, GameData, GameEventsType, MoveData, SocketState } from "./MatchData"
import { fillBoardToStartMatch, mountBoard } from "@/helpers/board"
import { MatchSocketEventsRegister } from "./MatchSocketEventsRegister"
import axios from "axios"

const useGameSocket = create<GameboardContextProps>((set, get) => ({
    update: () => set,
    board: null,
    mountPlayerBoard: (playerType) => {
        set(state => (
            {
                ...state,
                board: fillBoardToStartMatch(mountBoard(!playerType), !playerType),
            }
        ))
    },
    CapturedPieces: {} as CapturedPieces,
    updateCapturedPieces: () => {

    },
    socketState: {

        socket: null,
        connect: (isQueue: boolean, matchId?: number) => {
            const path = isQueue ? `ws://localhost:5050/ws/match/queue` : `ws://localhost:5050/ws/match/${matchId}`
            const socket = new WebSocket(path)
            set(state => ({
                ...state,
                socketState: {
                    ...state.socketState,
                    socket,
                }
            } as GameboardContextProps));
            MatchSocketEventsRegister(socket);
        },
        disconnect: () => {
            get().socketState?.socket?.close()
            set({ socketState: null })
        },
        message: "",
        sendMessage: (msg: object) => {
            const socket = get().socketState?.socket;
            if (!socket || socket.readyState !== WebSocket.OPEN) {
                console.warn("Socket not open");
                return;
            }
            socket.send(JSON.stringify({ msg }))
        }
    },
    fetchOponnetData: async () => {
        const user = await axios.get(`fodase ${get().gameData!.OponnetId!}`);
        set({
            gameData: {
                OponentData: {
                    user
                }
            }
        })
    },
    gameData: {} as GameData
}))



export default useGameSocket