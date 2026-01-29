export type Profile = {
    name: string
    email: string
    profilePicBase64: string
    statistics: Statistics
    id: number
}

export type Statistics = {
    ratingProgress: RatingProgress
    games: number
    losses: number
    rating: number
    winRate: number
    wins: number
}

export type RatingProgress = {
    lastGameDate: string
    progress: number[]
}
