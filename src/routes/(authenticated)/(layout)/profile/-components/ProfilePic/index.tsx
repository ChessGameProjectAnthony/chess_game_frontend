import { User } from "lucide-react";

export default function ProfilePic() {
    return (
        <div className="h-48 w-48 rounded-full flex items-center justify-center bg-accent-foreground ">
            <User className="size-22 text-white" />
        </div>
    )
}