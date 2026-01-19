import { Button } from '@/components/ui/button';
import { SearchGameTypes } from '@/Enums/Match/MatchTypes';
import useGameSocket from '@/stores/Match/MatchSocketStore';
import { createFileRoute, useSearch } from '@tanstack/react-router'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/(authenticated)/match/queue')({
    component: RouteComponent,
    beforeLoad: async (ctx) => {
        await useGameSocket.getState().socketState?.connect(true);
    },
})

function RouteComponent() {
    const spanRef = useRef<HTMLSpanElement>(null);
    const { socketState } = useGameSocket();


    setInterval(async () => {
        setTimeout(() => {
            handleAnimation()
        }, 200)
    }, 200);

    async function handleAnimation() {
        if (spanRef.current!.innerText.length == 4) {
            spanRef.current!.innerText = ""
            return
        }
        const newText = Array(spanRef!.current!.innerText.length + 1).fill(".").toString().replaceAll(",", '')
        spanRef!.current!.innerText = newText
    }

    return <div className='flex items-center justify-center'>
        <Button onClick={() => {
            socketState?.sendMessage({
                MatchType: SearchGameTypes['Any']
            })
        }}>
            fodase
        </Button>
        <h1 className='text-52 relative'>ta caçando fi <span ref={spanRef} className='absolute right-[-13]'>{spanRef.current?.innerText}</span></h1>
    </div>
}
