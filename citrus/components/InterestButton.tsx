"use client";
import { useRouter } from "next/navigation";

async function onInterestHandler(username: string | null | undefined, eventID: string){
    const res = await fetch(`/api/experiences/${eventID}`, {
        method: 'PUT',
        body: JSON.stringify({"id" : eventID, "attendees" : [username] }),
    });
    // Figure out how to make the page reload, or make this component reload
    
}

export default function InterestButton({username, eventID}: {username: string | null | undefined, eventID: string}){
    const router = useRouter();
    return (
        <div className="m-20 flex items-center justify-center">
                <button className="text-center text-white font-semibold z-10 i h-16 w-64 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center 
            rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 
            hover:scale-y-105 transition duration-300 ease-out" 
                onClick={async () => {await onInterestHandler(username, eventID); router.refresh()}}>I&apos;m interested</button>
        </div>
    )

}