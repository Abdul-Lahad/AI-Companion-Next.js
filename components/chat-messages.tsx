"use client";

import { Companion } from "@/lib/generated/prisma";
import ChatMessage, { ChatMessageProps } from "@/components/chat-message";
import { useEffect, useRef } from "react";



interface ChatMessagesProps{
    messages: ChatMessageProps[];
    companion: Companion;
    isLoading: boolean;
}

const ChatMessages = ({ messages, companion, isLoading }: ChatMessagesProps) => {

    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return ( 
        <div className="flex-1 overflow-y-auto pr-4">
            {messages.map((message,id) => (
                <ChatMessage
                    key={id}
                    src={companion.src}
                    role={message.role}
                    isLoading={isLoading}
                    content={message.content}
                />
            ))}
            {isLoading &&
                <ChatMessage
                role="system"
                src={companion.src}
                isLoading
                />
            }
            {/* self closing tag for scrolling */}
            <div ref={scrollRef} /> 
        </div>
     );
}
 
export default ChatMessages;