"use client";


async function onInterestHandler(username: string | null | undefined, eventID: string){
    const res = await fetch(`/api/experiences/${eventID}`, {
        method: 'PUT',
        body: JSON.stringify({"id" : eventID, "attendees" : [username] }),
    });
    // Figure out how to make the page reload, or make this component reload
}

export default function InterestButton({username, eventID}: {username: string | null | undefined, eventID: string}){
    
    return (
        <button onClick={async () => await onInterestHandler(username, eventID)}>I'm interested</button>
    )

}