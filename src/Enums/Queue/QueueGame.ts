import { SearchGameTypes } from "../Match/MatchTypes"

export type GameQueueData = {
    createdByPlayerId: number
    joinedPlayerId: number
    PlayerRank: number
    GameQueueId: number
    GameType: keyof typeof SearchGameTypes
    createAt: Date
}
