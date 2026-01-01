import { cn } from "@/lib/utils"
import React, { JSX } from "react"

type Props = {
    children: React.ReactNode
} & JSX.IntrinsicElements['div']
export default function DefaultPageContainer({ children, ...rest }: Props) {
    return <div
        {...rest}
        className={cn(
            "bg-background w-12/20 mx-auto flex flex-col px-4 border-x border-foreground h-screen",
            rest.className
        )}>
        {children}
    </div>
}