"use client"

import { useCompletion } from "@ai-sdk/react";
import ChatHeader from "@/components/chat-header";
import { Companion, Message } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import ChatForm from "@/components/chat-form";
import ChatMessages from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";



interface ChatClientProps{
    companion: Companion & {
        messages: Message[],
        _count: {
            messages: number
        }
    }
}


const ChatClient = ({companion}:ChatClientProps) => {
    const route = useRouter();
    const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages);


    const {
        input,
        isLoading,
        handleInputChange,
        handleSubmit,
        setInput,
    } = useCompletion({
        api: `/api/chat/${companion.id}`,
        onFinish(prompt,completion){

            console.log("Completion received: ", completion);
            console.log("Prompt sent: ", prompt);

            const systemMessage: ChatMessageProps = {
                role: "system",
                content: completion
            }

            setMessages((current) => [...current, systemMessage]);
            

            // route.refresh()

        }
    })

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const message: ChatMessageProps = {
            role: 'user',
            content: input
        }

        setMessages((current) => [...current, message]);
        setInput("");
        handleSubmit(e);

    }

    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader companion={companion} />
            <ChatMessages 
                messages={messages}
                companion={companion}
                isLoading={isLoading}
                />
            <ChatForm
                input={input}
                isLoading={isLoading}
                onInputChange={handleInputChange}
                onSubmit={onSubmit}
            />
        </div>
      );
}
 
export default ChatClient;