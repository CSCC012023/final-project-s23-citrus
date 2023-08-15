import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import InterestButton from '@/components/InterestButton'
import UninterestButton from './UninterestButton';


async function eventInfo(eventID: string) {
    const res = await fetch(process.env.BASE_API_URL + `api/experiences/${eventID}`);
    const data = await res.json();
    return data;
}

export default async function EventButton({eventID}: {eventID: string}){
    
    const session = await getServerSession(authOptions);
    if(!session){
        return <p>You&apos;re not signed in.</p>
    }

    const data = await eventInfo(eventID);

    if (data.user_id === session.user?.name) {
        return <div></div>
    }

    if(data.attendees.includes(session.user?.name)) {
        //return <p>You&apos;re already interested in this event.</p>
        return <UninterestButton username={session.user?.name} eventID={eventID}/>
    }

    return (
        <InterestButton eventID={eventID} username={session.user?.name}/>
    )

}