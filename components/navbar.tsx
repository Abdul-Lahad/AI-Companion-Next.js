"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { MobileSidebar } from "./mobileSidebar";

const font = Poppins({
    weight: '600',
    subsets: ['latin'],
});

export const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-primary/10 bg-secondary h-16">
           <div className="flex items-center">
            <MobileSidebar/>
            </div> 
            <Link href='/'>
                <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)}>Companion.ai</h1>
            </Link>
            <div className="flex items-center gap-x-3">
                <Button variant={'premium'} size={"sm"}>
                    Upgrade
                    <Sparkles className=" ml-2 h-4 w-4 fill-white text-white" />
                </Button>
                <ModeToggle />
                <UserButton />

            </div>
        </div>
    );
}