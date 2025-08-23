import  prismadb  from "@/lib/prisma";
import CompanionForm from "./components/companion-Form";
interface CompanionIdPageProps {
    params:{
        companionId: string;
    };
};

const CompanionIdPage = async ({params}: CompanionIdPageProps) => {
    //TODO: check subscription

    const companion = await prismadb.companion.findUnique({
        where:{
            id: params.companionId
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