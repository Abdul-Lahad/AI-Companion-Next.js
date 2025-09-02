"use client"

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import BotAvatar from "@/components/bot-avatar";
import { BeatLoader } from "react-spinners";
import UserAvatar from "@/components/user-avatar";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";


export interface ChatMessageProps {
    role: 'user' | 'system';
    content?: string;
    isLoading?: boolean;
    src?: string;
}

const ChatMessage  = ({
    role,
    content,
    isLoading,
    src
}: ChatMessageProps) => {

    const theme = useTheme();

    const onCopy = () => {
        if (content) {
            navigator.clipboard.writeText(content);
        }

        toast.success('Copied to clipboard')


        

    }

    return ( 
        <div 
            className={cn("group flex items-start gap-x-3 py-4 w-full",
                    role === 'user' && 'justify-end')}
        >
            {role === 'system' && src && <BotAvatar src={src} />}
            <div className="rounded-md py-4 px-2 max-w-sm text-sm bg-primary/10">
                {isLoading? 
                    <BeatLoader 
                        size={5}
                        color={theme.theme === 'dark' ? '#fff' : '#000'}
                    /> 
                    : 
                    content}

            </div>
            {role === 'user' && <UserAvatar />}
            
            {role === 'system' && !isLoading && 
            <Button onClick={onCopy} size="icon" variant={"ghost"} className="opacity-0 group-hover:opacity-100 transition">
                <Copy className="w-4 h-4"/>
                
            </Button>}

        </div>
     );
}
 
export default ChatMessage;