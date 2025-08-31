import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";



export async function PATCH(
    req: Request,
    { params }: { params: { companionId: string } }
    ) {
    try {
        
        const body = await req.json();
        const user = await currentUser();
        const {src, name, description, CategoryId, instruction, seed} = body;
        
        if(!params.companionId){
            return new NextResponse("Companion ID is required", { status: 400 });
        }
        
        if(!user || !user.firstName || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        if(!src || !name || !description || !CategoryId || !instruction || !seed) {
            return new NextResponse("Missing fields", { status: 400 });
        }
        
        //TODO: check for subscription

        const companion = await prismadb.companion.update({
            where: {
                id: params.companionId
            },
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

export async function DELETE(
    req: Request,
    { params }: { params: { companionId: string } }
    ) {

    try {
        const user = await currentUser();
        const {companionId} = await params;

        if(!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const companion = await prismadb.companion.delete({
            where: {
                userId: user.id,
                id: companionId
            }
        })

        return NextResponse.json(companion);

    } catch (error) {
        console.log("[COMPANION_DELETE]",error)
        return new NextResponse("Internal error", { status: 500 });
    }
}