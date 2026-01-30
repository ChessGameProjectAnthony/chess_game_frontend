import { Button } from '@/components/ui/button';
import { SearchGameTypes } from '@/Enums/Match/MatchTypes';
import { SearchMatchResponses } from '@/Enums/Queue/QueueEvents';
import useAuth from '@/stores/AuthStore';
import useGameSocket from '@/stores/Match/MatchSocketStore';
import { createFileRoute, redirect, useRouter, useRouterState, useSearch } from '@tanstack/react-router'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/(authenticated)/match/queue')({
    component: RouteComponent,
})

function RouteComponent() {
    const { socketState, gameData } = useGameSocket()
    function fetchMatch() {
        socketState!.sendMessage({
            Event: SearchMatchResponses.SearchMatch,
            Data: {
                GameType: SearchGameTypes.Any,
                PlayerId: useAuth.getState().profileData?.id,
                PlayerRank: 10,
            }
        });
    }
    useEffect(() => {
        const socket = socketState?.socket;
        if (!socket) return;


        socket.addEventListener('open', fetchMatch)
        return () => socket.removeEventListener('open', fetchMatch);
    }, [socketState?.socket]);

    return <div className='flex items-center justify-center'>
        Procurando partida procê
        <button onClick={fetchMatch}>Test</button>
    </div>
}
