import { Categories } from "@/components/categories";
import prismadb from "@/lib/prisma";
import { SearchInput } from "@/components/searchInput";
import { CompanionPage } from "@/components/companions";


interface RootPageProps{
   searchParams:{
    categoryId: string;
    name: string;
   } 
}

const RootPage = async ({searchParams}:RootPageProps) => {

    const params = await searchParams;

    const data = await prismadb.companion.findMany({
        where:{
            ...( params.categoryId && {
                categoryId: Number(params.categoryId)
            }),
            
        ...( params.name && {
            name:{
                search: params.name
            }
        })

        },
        orderBy:{
            createdAt: "desc"
        },
        include:{
            _count:{
                select:{
                    messages: true
                }
            }
        }
    }
    )
    
    const categories = await prismadb.category.findMany();
    
    return (
        <div className="h-full p-4 space-y-2">
        <SearchInput/>
        <Categories data={categories}/>
        <CompanionPage data={data}/>

        </div>
    );
}
 
export default RootPage;