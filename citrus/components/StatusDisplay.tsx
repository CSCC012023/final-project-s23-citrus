
async function getUserStatusData(user_id: string | null | undefined, event_id: string){
    const res = await fetch(process.env.BASE_API_URL + `api/statuses/${event_id}?user_id=${user_id}`);
    const data = await res.json();
    return data;
}

export default async function StatusDisplay({username, event_id, flag}: {username: string | null | undefined, event_id: string, 
flag: string}){
    const status_data = await getUserStatusData(username, event_id);
    if(flag == "tickets"){
        return(
            <p className="indent-8">You have {status_data.prepaid_tickets} extra tickets.</p>
        )
    }
    return(
       status_data.prepaid_tickets
    )
}