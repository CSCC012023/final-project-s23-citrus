"use client";
import { useRouter } from "next/navigation";

async function onUninterestHandler(username: string | null | undefined, eventID: string){
    const res = await fetch(`/api/experiences/${eventID}`);
    const data = await res.json();
    const attendees = data.attendees;
    const index = attendees.indexOf(username);
    if (index > -1) {
        attendees.splice(index, 1);
        const res2 = await fetch(`/api/experiences/${eventID}?addUser=false`, {
            method: 'PUT',
            body: JSON.stringify({"attendees": attendees}),
        });
    }

    const res3 = await fetch(`/api/statuses?event_id=${eventID}`, {
        method: 'DELETE'
    });    
}

export default function UninterestButton({username, eventID}: {username: string | null | undefined, eventID: string}){
    const router = useRouter();
    return (
        <div className="m-20 flex items-center justify-center">
                <button className="text-center text-white font-semibold z-10 i h-16 w-64 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center 
            rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 
            hover:scale-y-105 transition duration-300 ease-out" 
                onClick={async () => {await onUninterestHandler(username, eventID); router.refresh()}}>I&apos;m no longer interested</button>
        </div>
    )

}