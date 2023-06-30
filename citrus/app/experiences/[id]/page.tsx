async function getEventData(id: string) {
    const res = await fetch(`http://localhost:3000/api/experiences/${id}`);
    const data = await res.json();
    return data;
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getEventData(params.id);
    const start_time = new Date(data.event_start);
    const end_time = new Date(data.event_end);
    const map_url = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${data.event_location}`;
    return (
        <div>
            <h1>{data.event_name}</h1>
            <p>Description: {data.event_description}</p>
            <p>Event start time: {start_time.toDateString()}</p>
            <p>Event end time: {end_time.toDateString()}</p>
            <p>Event location: {data.event_location}</p>
            <p>Capacity: {data.capacity}</p>
            <div id="tags">
                {data.tags.map((tag: string) => (
                    <p key={tag}>Tag: {tag}</p>
                ))}
            </div>
            <iframe id = "map"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={map_url}>
            </iframe>
        </div>
    );
}
