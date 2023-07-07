import { getServerSession } from 'next-auth/next'
import type { Session } from 'next-auth';
import { use } from "react";
import InterestButton from '@/components/InterestButton'


async function eventInfo(eventID: string) {
    const res = await fetch(`http://localhost:3000/api/experiences/${eventID}`);
    const data = await res.json();
    return data;
}

export default async function EventButton({eventID}: {eventID: string}){
    
    const session = await getServerSession();
    if(!session){
        return <p>You're not signed in</p>;
    }

    const data = await eventInfo(eventID);

    if(data.attendees.includes(session.user?.name)) {
        return <p>You're already interested</p>;
    }

    return (
        <InterestButton eventID={eventID} username={session.user?.name}/>
    )

}