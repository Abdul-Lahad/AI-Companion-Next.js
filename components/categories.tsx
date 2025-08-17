"use client"
import { Category } from "@/lib/generated/prisma"
import qs from "query-string"

import { cn } from "@/lib/utils";
import { useRouter,useParams, useSearchParams } from "next/navigation";

interface CategoryProps {
  data: Category[];
}

export const Categories = ({ data }: CategoryProps) => {
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId"); 
    const categoryOnclick = (id: number| undefined)=>{
        const query = {
                categoryId: id,
            }
            const url = qs.stringifyUrl({
                url: window.location.href,
                query
            },{skipNull: true})
            router.push(url);

    }
    

    
    return(
        <div className="w-full overflow-x-auto space-x-2 flex p-1">
            <button 
            onClick={()=>categoryOnclick(undefined)}
            className={cn(`
                flex
                items-center 
                text-center 
                text-xs 
                md:text-sm
                px-2
                md:px-4
                py-2
                md:py-3
                rounded-md
                bg-primary/10
                hover:opacity-75
                transition
                `,!categoryId? "bg-primary/25" : "bg-primary/10")}>
                Newest
            </button>
            {
                data.map((item)=>(
                    
                    <button
                    key={item.id}
                    onClick={()=>categoryOnclick(item.id)}
                    className={cn(`
                flex
                items-center 
                text-center 
                text-xs 
                md:text-sm
                px-2
                md:px-4
                py-2
                md:py-3
                rounded-md
                bg-primary/10
                hover:opacity-75
                transition
                `,item.id === Number(categoryId) ? "bg-primary/25" : "bg-primary/10")}>
                {item.name}
            </button>
                ))
            }


        </div>
    )

}
