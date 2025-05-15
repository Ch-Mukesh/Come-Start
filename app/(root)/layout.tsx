import React from "react";
import Navbar from "../components/Navbar";
import { SanityLive } from "@/sanity/lib/live";

export default function LayOut({children}:Readonly<{children : React.ReactNode}>){
    return (
        <main className="font-work-sans">
            <SanityLive />
            
            {children}
        </main>
    )
}