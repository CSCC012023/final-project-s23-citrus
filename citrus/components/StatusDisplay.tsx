
async function getUserStatusData(user_id: string | null | undefined, event_id: string){
    const res = await fetch(process.env.BASE_API_URL + `api/statuses/${event_id}?user_id=${user_id}`);
    const data = await res.json();
    return data;
}

export default async function StatusDisplay({username, event_id, flag}: {username: string | null | undefined, event_id: string, 
flag: string}){
    const status_data = await getUserStatusData(username, event_id);

    if(status_data.prepaid_tickets == '0' || status_data.prepaid_tickets == null){
        return(
            <div>
                <p className="indent-8">has no extra tickets.</p>
            </div>
        )
    } else{
        return(
            <div>
                <p className="indent-8">has {status_data.prepaid_tickets} extra tickets.</p>
            </div>
        )
    }
}