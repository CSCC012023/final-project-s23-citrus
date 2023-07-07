"use client";
import { useRouter } from "next/router";

async function onInterestHandler(username: string | null | undefined, eventID: string){
    const res = await fetch(`/api/experiences/${eventID}`, {
        method: 'PUT',
        body: JSON.stringify({"id" : eventID, "attendees" : [username] }),
    });
    // Figure out how to make the page reload, or make this component reload
    const router = useRouter();
    router.replace(router.asPath); 
}

export default function InterestButton({username, eventID}: {username: string | null | undefined, eventID: string}){
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="i h-16 w-64 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center 
            rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 
            hover:scale-y-105 transition duration-300 ease-out">
            </div>
                <button className="text-center text-white font-semibold z-10 pointer-events-none" 
                onClick={async () => await onInterestHandler(username, eventID)}>I'm interested</button>
        </div>
    )

}