import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faUser } from '@fortawesome/free-solid-svg-icons'

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
        <div className="w-9/12 m-auto">
            <h1 className="text-3xl">{data.event_name}</h1>
            <div id="tags" className="flex">
                <p className="flex-none bg-cyan-500 rounded-lg border-cyan-200 border-2 px-4 mr-2 text-center">{data.category}</p>
                {data.tags.map((tag: string) => (
                    <p key={tag} className="flex-none bg-violet-900 rounded-lg border-violet-400 border-2 px-4 mx-2 text-center">{tag}</p>
                ))}
            </div>
            <iframe id="map"
                className="
                w-full
                h-96
                border-none
                rounded-lg"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={map_url}>
            </iframe>
            <div>
                <h2 className="text-2xl">Details</h2>
                <FontAwesomeIcon icon={faCalendar} className='text-3xl' />
                <p>{start_time.toLocaleString()} to {end_time.toLocaleString()}</p>
                <FontAwesomeIcon icon={faLocationDot} className='text-3xl' />
                <p>Event location: {data.event_location}</p>
                <FontAwesomeIcon icon={faUser} className='text-3xl' />
                <p>Spots left: {data.capacity - data.attendees.length}</p>
            </div>
            <div>
                <h2 className="text-2xl">Description</h2>
                <p>{data.event_description}</p>
            </div>
        </div>
    );
}
