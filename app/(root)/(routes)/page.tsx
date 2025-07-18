import { UserButton } from "@clerk/nextjs";
const RootPage = () => {
    return (
        <div>
        <UserButton/>
        <div className="flex items-center justify-center h-full">
            <h1>Welcome to the Root Page</h1>
            
        </div>
        </div>
    );
}
 
export default RootPage;