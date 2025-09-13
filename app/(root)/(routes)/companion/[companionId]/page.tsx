import  prismadb  from "@/lib/prisma";
import CompanionForm from "./components/companion-Form";
import { auth, currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
interface CompanionIdPageProps {
    params:{
        companionId: string;
    };
};

const CompanionIdPage = async ({params}: CompanionIdPageProps) => {
    //TODO: check subscription


        const { userId } = await auth();

        if(!userId){
            return <RedirectToSignIn />
        }

       const companionId = await params.companionId
        
    const companion = await prismadb.companion.findUnique({
        where:{
            id: companionId, 
            userId
        }
    })
    

    const categories = await prismadb.category.findMany();

    return ( 
        
        <CompanionForm
            initialData={companion}
            categories={categories}
        />
     );
}
 
export default CompanionIdPage;