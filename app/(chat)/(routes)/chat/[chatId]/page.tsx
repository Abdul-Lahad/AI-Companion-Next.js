import { RedirectToSignIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

import prismadb from "@/lib/prisma"
import { redirect } from "next/navigation"
import ChatClient from "./components/client"

interface ChatIdPageProps {
    params:{
        chatId: string
    }
}


const ChatIdPage = async ({params}:ChatIdPageProps) =>{


    const {chatId} = await params; 
   const { userId } = await auth()

   if (!userId){
        return <RedirectToSignIn />;

   }

   const companion = await prismadb.companion.findUnique({
    where:{
        id: chatId,
    },
    include:{
        messages:{
            orderBy:{
                createdAt: "asc"
            },
            where:{
                userId
            }
        },
        _count:{
            select:{
                messages:true
            }
        }
    }
   })

   if(!companion){
    return redirect('/')
   }

    return (
        <ChatClient companion={companion}/>
    )
}

export default ChatIdPage;