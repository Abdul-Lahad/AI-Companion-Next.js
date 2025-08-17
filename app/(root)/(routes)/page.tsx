import { Categories } from "@/components/categories";
import prismadb from "@/lib/prisma";
import { SearchInput } from "@/components/searchInput";
import { UserButton } from "@clerk/nextjs";
const RootPage = async () => {
    const categories = await prismadb.category.findMany();
    return (
        <div className="h-full p-4 space-y-2">
        <SearchInput/>
        <Categories data={categories}/>
        
        </div>
    );
}
 
export default RootPage;