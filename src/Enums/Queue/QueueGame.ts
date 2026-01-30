import { SearchGameTypes } from "../Match/MatchTypes"

export type GameQueueData = {
    createdByPlayerId: number
    joinedPlayerId: number
    PlayerRank: number
    GameId: string
    GameType: keyof typeof SearchGameTypes
    createAt: Date
}
