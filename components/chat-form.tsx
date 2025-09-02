'use client'

import { ChatRequestOptions } from "ai";
import { ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";

interface ChatFormProps  {  
        input: string,
        isLoading: boolean,
        onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
        onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void
}

const ChatForm = ({
    input,
    isLoading,
    onInputChange,
    onSubmit
}: ChatFormProps) => {


    return ( 
        <form
         onSubmit={onSubmit}
         className="border-t border-primary/10 py-4 flex items-center gap-x-2"
        >
            <Input
                value={input}
                onChange={onInputChange}
                placeholder="Type your message..."
                disabled={isLoading}
                className="rounded-lg bg-primary/10"
            />
            <Button variant="ghost" disabled={isLoading}>
                <SendHorizonal className="h-6 w-6"/>
            </Button>


        </form>
     );
}
 
export default ChatForm;