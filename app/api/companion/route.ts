import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";



export async function POST(req: Request) {
    try {
        
        const body = await req.json();
        const user = await currentUser();
        const {src, name, description, CategoryId, instruction, seed} = body;
        
        if(!user || !user.firstName || !user.id) {
            return new Response("Unauthorized", { status: 401 });
        }
        
        if(!src || !name || !description || !CategoryId || !instruction || !seed) {
            return new Response("Missing fields", { status: 400 });
        }
        
        //TODO: check for subscription

        const companion = await prismadb.companion.create({
            data: {
                src,
                name,
                description,
                categoryId: CategoryId,
                instructions: instruction,
                seed,
                userId: user.id,
                userName: user.firstName,
            }
        })

        return NextResponse.json(companion);
        
    } catch (error) {
        console.log("[COMPANION_POST]",error)
        return new NextResponse("Internal error", { status: 500 });
    }
    
}   