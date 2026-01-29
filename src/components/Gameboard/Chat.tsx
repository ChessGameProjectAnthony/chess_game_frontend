import { PlayerType } from "@/Enums/Match/PlayerType";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/helpers/cn";
import { useRef, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { ScrollArea, ScrollBarRefProps } from "../ui/scroll-area";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";
export type MessageData = {
    from: PlayerType
    message: string
}

export function Chat() {
    const [messages, setMessage] = useState<MessageData[]>(() => {
        return Array.from<MessageData>(Array<string>(51).fill("Fodafafafafafafafase").map((msg, i) => ({
            from: i % 2 == 0 ? PlayerType.White : PlayerType.Black,
            message: msg
        })))
    })
    const scrollRef = useRef<ScrollBarRefProps>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    inputRef.current?.addEventListener('keydown', (key) => {
        if (key.key == 'Enter' && inputRef.current?.value) handleSendMessage()
    })


    function handleSendMessage() {
        if (!inputRef.current?.value) return
        setMessage(prev => [...prev, {
            from: PlayerType.Black,
            message: inputRef.current!.value
        }])
        inputRef.current!.value = ""
        scrollRef.current?.scrollToBottom()
    }


    return <section className="grid grid-rows-[1fr_.1fr] h-screen relative">
        <div className="flex items-end">
            <ScrollArea
                ref={scrollRef}
                className="h-[850px] w-full px-4 pt-4 relative bg-red-300" aria-orientation="vertical" >
                <button
                    onClick={() => scrollRef.current?.scrollToBottom()}
                    className="bg-blue-300 flex items-center justify-center absolute bottom-0 p-2 rounded-2xl cursor-pointer"><MessageSquare /> +1</button>

                <ul className=" w-full h-fit flex flex-col gap-y-1.5 ">
                    {messages.map((message, i) => (

                        <li key={i} className={cn("p-1 rounded-md  w-fit bg-sidebar-accent  flex", message.from == PlayerType.White ? "mr-auto rounded-tl-none" : "ml-auto rounded-tr-none")}>
                            {message.message}
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