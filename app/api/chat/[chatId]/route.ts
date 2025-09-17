import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { ratelimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prisma";
import { MemoryManager } from "@/lib/memory";
import { GoogleGenAI } from "@google/genai";


export async function POST(
    req: Request,
    { params }: { params: { chatId: string } }
){

    try {

        const { chatId } = await params;

        const { prompt } = await req.json();

        const user = await currentUser();

        if(!user || !user.id || !user.firstName) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const identifier = req.url+'-'+user.id;

        const { success } = await ratelimit(identifier);

        if(!success) {
            return new NextResponse('Too Many Requests', { status: 429 });
        }

        const companion = await prismadb.companion.update({
            where:{
                id: chatId,
            },
            data:{
                messages:{
                    create:{
                        content: prompt,
                        role: "user",
                        userId: user.id,
                    }
                }

            }
        })

        if(!companion) {
            return new NextResponse('Companion not found', { status: 404 });
        }

        const name = companion.id;
        const companion_file_name = name+'.txt';

        const companionKey = {
            companionName: name,
            userId: user.id,
            modelName: ''
        }

        const memoryManager = MemoryManager.getInstance();

        const chatHistory = await memoryManager.readLatestHistory(companionKey);

        if (chatHistory.length ==  0){
            await memoryManager.seedChatHistory(companion.seed,"\n",companionKey);

        }

        await memoryManager.writeToHistory("User: "+prompt+"\n",companionKey)

        const recentChatHistory = await memoryManager.readLatestHistory(companionKey)

        const similarDocs = await memoryManager.vectorSearch(
            recentChatHistory,
            companion_file_name
        )

        let relevantHistory = "";

        if (!!similarDocs && similarDocs.length > 0) {
            relevantHistory = similarDocs.map(doc => doc.pageContent).join("\n");
        }

        const content = `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 

        ${companion.instructions}

        Below are relevant details about ${companion.name}'s past and the conversation you are in.
        ${relevantHistory}


        ${recentChatHistory}\n${companion.name}:` 

        console.log("Content sent to Google GenAI: ", content);
        
        const ai = new GoogleGenAI({});

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: content,
            config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        }
    }); 


    console.log("Response : ", response.text);
    

    return NextResponse.json(
         { completion: response.text });

        
    } catch (error) {

        console.log("[CHAT_POST]",error);
        return new NextResponse("Internal error", { status: 500 });
        
        
    }


}