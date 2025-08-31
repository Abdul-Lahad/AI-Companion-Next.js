"use client"

import axios from "axios"
import { Companion, Message } from "@/lib/generated/prisma"
import { Button } from "@/components/ui/button"
import { ChevronLeft,
         Edit,
         MessageSquare,
         MoreHorizontal,
         Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import BotAvatar from "./bot-avatar"
import { useUser } from "@clerk/nextjs"
import { DropdownMenu, 
         DropdownMenuContent, 
         DropdownMenuItem, 
         DropdownMenuTrigger } from "./ui/dropdown-menu"
import { toast } from "sonner"


 interface ChatClientProps{
     companion: Companion & {
         messages: Message[],
         _count: {
             messages: number
         }
     }
 }

 const ChatHeader = ({companion}:ChatClientProps) => {
    const route = useRouter()
    const {user} = useUser()

    const onDelete = async () => {
        try {
            await axios.delete(`/api/companion/${companion.id}`)

            toast.success("Companion deleted")
            route.refresh()
            route.push('/')
            
        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    return (
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center"> 
                <Button onClick={() => route.back()} size={"icon"} variant="ghost" >
                    <ChevronLeft className="h-8 w-8"/>
                </Button>
                <BotAvatar src={companion.src} />
            
            <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                    <p className="font-bold">
                        {companion.name}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3 mr-1"/>
                        {companion._count.messages}
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                    Created By {companion.userName}
                </p>
            </div>
            </div>
            { user?.id === companion.userId &&(
               <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {route.push(`/companion/${companion.id}`)}}>
                            <Edit className="h-4 w-4 mr-2"/>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete}>
                            <Trash className="h-4 w-4 mr-2"/>
                            Delete
                        </DropdownMenuItem>

                    </DropdownMenuContent>
               </DropdownMenu> 
            
            )}
        </div>
      );
 }
  
 export default ChatHeader;