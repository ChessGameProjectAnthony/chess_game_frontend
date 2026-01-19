import { Profile } from '@/Types/ProfileData'
import { create } from 'zustand'
type UserAuthData = {
    username?: string | null
    token?: string | null,
}
type AuthProps = UserAuthData & {
    isUserLogged: () => boolean
    setAuthData: ({ token, username }: UserAuthData) => void
    setProfileData: (payload: Profile) => void
    profileData: Profile | null
}

const useAuth = create<AuthProps>((set) => ({
    username: null,
    token: null,
    profileData: null,
    setProfileData: (payload: Profile) => {
        set({ profileData: payload })
    },
    isUserLogged: () => {
        let user: string | null | UserAuthData = sessionStorage.getItem("token")
        if (!user) {
            return false
        }
        user = JSON.parse(user) as UserAuthData
        set({
            token: user.token,
            username: user.username
        })
        return true
    },
    setAuthData: ({ token, username }: UserAuthData) => {
        sessionStorage.setItem("token", JSON.stringify({ token, username }))
        set({
            token,
            username
        })

    }
}))



export default useAuth