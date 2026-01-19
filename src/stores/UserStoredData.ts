import { create } from 'zustand'

type UserStoredData = {
    rating?: number | null
    profilePic?: Base64URLString | null
    statistics: {
        wins?: number | null
        losses?: number | null
        winRate?: number | null
        games?: number | null
        rating?: number | null
        ratingProgress: {
            progress?: number[] | null
            lastGameDate?: Date | null
        }
    }
}
const useUserData = create<UserStoredData>((set) => ({
    rating: null,
    profilePic: null,
    statistics: {
        ratingProgress: {
            lastGameDate: null,
            progress: null
        },
        games: null,
        losses: null,
        rating: null,
        winRate: null,
        wins: null,
    },
    updateUserData: (update: Partial<UserStoredData>) => {

        set((state) => ({
            ...state,
            ...update
        }))
    }
}))


export default useUserData