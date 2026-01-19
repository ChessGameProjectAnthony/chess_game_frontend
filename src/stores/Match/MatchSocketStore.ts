import { create } from "zustand"
import { CapturedPieces, GameboardContextProps, GameData, GameEventsType, MoveData, SocketState } from "./MatchData"
import { fillBoardToStartMatch, mountBoard } from "@/helpers/board"
import { MatchSocketEventsRegister, QueueSocketMessage } from "./MatchSocketEventsRegister"
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
            console.log(socket)
            set(state => ({
                ...state,
                socketState: {
                    ...state.socketState,
                    socket,
                }
            } as GameboardContextProps));
            MatchSocketEventsRegister(socket);
            return get().socketState as SocketState
        },
        disconnect: () => {
            console.log("fkafkakfa")
            get().socketState?.socket?.close()
            set({ socketState: null })
        },
        onMessage: (msg: object) => {
            set(state => ({ ...state, socketState: { ...state.socketState, messages: [msg, ...state.socketState?.messages ?? []] } } as GameboardContextProps))
        },
        joinMatch: (matchData: QueueSocketMessage) => {
            console.log("trying to join")
            console.log(matchData)

        },
        messages: [],
        sendMessage: (msg: object) => {
            const socket = get().socketState?.socket;
            console.log(socket)
            if (!socket || socket.readyState !== WebSocket.OPEN) {
                console.warn("Socket not open");
                return;
            }
            console.log(socket)
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