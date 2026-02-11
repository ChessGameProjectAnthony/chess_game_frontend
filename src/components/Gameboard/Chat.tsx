import { PlayerType } from "@/Enums/Match/PlayerType";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/helpers/cn";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { ScrollArea, ScrollBarRefProps } from "../ui/scroll-area";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";
import useGameSocket from "@/stores/Match/MatchSocketStore";
import useAuth from "@/stores/AuthStore";
export type MessageData = {
    from: PlayerType
    message: string
}

export function Chat() {
    const { chatMessages, handleSendChatMessage, gameData } = useGameSocket()
    const scrollRef = useRef<ScrollBarRefProps>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    inputRef.current?.addEventListener('keydown', (key) => {
        if (key.key == 'Enter' && inputRef.current?.value) handleSendMessage()
    })
    const playerId = useAuth.getState().profileData!.id
    useEffect(() => {
        scrollRef.current?.scrollToBottom()
    }, [chatMessages.length])
    function handleSendMessage() {
        if (!inputRef.current?.value) return
        handleSendChatMessage({
            Message: inputRef!.current!.value!,
            PlayerId: playerId,
            RoomId: gameData.MatchId
        })
        inputRef.current!.value = ""
        scrollRef.current?.scrollToBottom()
    }


    return <section className="grid grid-rows-[1fr_.1fr] h-screen relative">
        <div className="flex items-end">
            <ScrollArea
                ref={scrollRef}
                className="h-[850px] w-full px-4 pt-4 relative " aria-orientation="vertical" >
                <button
                    onClick={() => scrollRef.current?.scrollToBottom()}
                    className="bg-blue-300 flex items-center justify-center absolute bottom-0 p-2 rounded-2xl cursor-pointer"><MessageSquare /> +1</button>

                <ul className=" w-full h-fit flex flex-col gap-y-1.5 ">
                    {chatMessages.map((message, i) => (

                        <li key={i} className={cn("p-1 rounded-md  w-fit bg-sidebar-accent  flex", message.PlayerId !== playerId ? "mr-auto rounded-tl-none" : "ml-auto rounded-tr-none")}>
                            {message.Message}
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div>

        <div className="flex p-2 justify-center items-center">
            <Input ref={inputRef} />
            <Button className="[&.activated]:bg-accent" variant={'ghost'} onClick={handleSendMessage} ><Send /></Button>
        </div>

    </section>
}