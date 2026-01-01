import { routeTree } from "@/routeTree.gen"
import { Link, Navigate, redirect } from "@tanstack/react-router"
import { Flag, House, User } from "lucide-react"

type NavigationPagesType = {
    url: string
    icon: React.ReactNode
}

const pages: NavigationPagesType[] = [
    {
        url: "/home",
        icon: <House />
    },
    {
        url: "/play",
        icon: <Flag />
    },
    {
        url: "/profile",
        icon: <User />
    },
]
export default function Navigator() {


    return (
        <div className="fixed bottom-0  w-full h-18 flex items-center justify-center 
        backdrop-blur-md
           bg-gradient-to-t
           from-white/60
           via-white/30
           to-transparent
        ">

            <nav className="bg-accent-foreground w-1/2 left-1/4 right-1/4 rounded-full py-2">
                <ul className="flex justify-center items-center gap-72">
                    {pages.map(page => (
                        <li>
                            <Link
                                to={page.url}
                                className="cursor-pointer [&>svg]:size-6"
                                activeProps={
                                    {
                                        className: "text-white"
                                    }
                                }
                            >
                                {page.icon}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )


}