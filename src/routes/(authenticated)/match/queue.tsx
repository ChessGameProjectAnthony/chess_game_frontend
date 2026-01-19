import { Button } from '@/components/ui/button';
import { SearchGameTypes } from '@/Enums/Match/MatchTypes';
import useGameSocket from '@/stores/Match/MatchSocketStore';
import { createFileRoute, redirect, useRouter, useSearch } from '@tanstack/react-router'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/(authenticated)/match/queue')({
    component: RouteComponent,
    beforeLoad: async (ctx) => {
        await useGameSocket.getState()?.socketState?.connect(true)

    },

})

function RouteComponent() {
    const { socketState, } = useGameSocket();
    const { navigate } = useRouter()

    useEffect(() => {
        console.log("top")
        if (socketState?.socket?.OPEN === 1) {
            console.log("top")

            socketState?.sendMessage({
                MatchType: SearchGameTypes['Any']
            })
        }
    }, [socketState?.socket?.readyState])

    useEffect(() => {
        const match = socketState?.messages[0]
        if (match) {
            navigate({ to: '/match/$matchId', params: { matchId: match.Data.GameQueueId.toString() } })

        }

    }, [socketState?.messages[0]?.Event])

    return <div className='flex items-center justify-center'>
        <Button onClick={() => {

        }}>
            fodase
        </Button>
        <Button onClick={() => {
            console.log(socketState?.socket?.readyState)
        }}>
            fodase
        </Button>

        <ul className='flex flex-col'>
            {socketState?.messages?.map(m => (
                <div className='flex flex-col'>

                    {Object.keys(m).map(z => (
                        <div>
                            {z}
                        </div>
                    ))}
                </div>
            ))}
        </ul>
    </div>
}
