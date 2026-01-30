import useGameSocket from "@/stores/Match/MatchSocketStore";
import { createFileRoute, Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/(authenticated)/match")({
    component: RouteComponent,
    beforeLoad: () => {
        useGameSocket.getState().socketState?.connect()
    }
});

function RouteComponent() {
    const { socketState, gameData } = useGameSocket()
    const { navigate } = useRouter()

    useEffect(() => {
        if (socketState?.isMatchFound) {
            navigate({ to: '/match/$matchId', params: { matchId: gameData.MatchId } })
        }
    }, [socketState?.isMatchFound])

    // divRef.current?.addEventListener

    return <Outlet />
}
