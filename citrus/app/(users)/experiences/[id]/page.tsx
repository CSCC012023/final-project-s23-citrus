import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faLocationDot, faUser, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import EventButton from '@/components/EventButton';

async function getEventData(id: string) {
    const res = await fetch(process.env.BASE_API_URL + `api/experiences/${id}`, { next: {revalidate: 0}});
    const data = await res.json();
    return data;
}

async function getOrganizerData(id: string, isUser: boolean) {;
    if (isUser) {
        const res = await fetch(process.env.BASE_API_URL + `api/users/${id}`);
        const data = await res.json();
        return data;
    } else {
        const res = await fetch(process.env.BASE_API_URL + `api/organizers/${id}`);
        const data = await res.json();
        return data;
    }
}

function OrganizerCard( {organizer, isUser}: {organizer: any, isUser: boolean} ) {
    if (isUser) {
        return (
            <div>
                <p className='font-bold text-2xl'><FontAwesomeIcon icon={faCircleInfo} className='text-3xl text-blue-600' /> Organized by</p>
                <p>This event was organized by the user {organizer.username}.</p>
            </div>
        )
    }
    return (
        <div>
            <p className='font-bold text-2xl'><FontAwesomeIcon icon={faCircleInfo} className='text-3xl text-blue-600' /> Organized by</p>
            <p>This event was organized by the {organizer.org_id}.</p>
        </div>
    )
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getEventData(params.id);
    const start_time = new Date(data.start);
    const end_time = new Date(data.end);
    const map_url = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${data.location}`;
    const organizer = await getOrganizerData(data.user_id || data.org_id, data.user_id != null);
    const attendees = data.attendees;
    const attendee = (n: any) => <li> {n} </li>;

    return (
        <div className="w-9/12 m-auto">
            <h1 className="text-5xl text-bold">{data.name}</h1>
            <div id="tags" className="flex my-5">
                <p className="flex-none bg-blue-600 rounded-lg border-blue-200 border-2 px-4 mr-2 text-center">{data.category}</p>
                {data.tags.map((tag: string) => (
                    <p key={tag} className="flex-none bg-violet-600 rounded-lg border-violet-200 border-2 px-4 mx-2 text-center">{tag}</p>
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
            <div className='flex flex-row space-x-20 justify-center my-5'>
                <div>
                    <p className='font-bold text-2xl'><FontAwesomeIcon icon={faCalendar} className='text-3xl text-blue-600' /> When</p>
                    <p className=''>{start_time.toLocaleString([], {dateStyle: 'long', timeStyle: 'short'})} to <br></br>{end_time.toLocaleString([], {dateStyle: 'long', timeStyle: 'short'})}</p>
                </div>
                <div>
                    <p className='font-bold text-2xl'><FontAwesomeIcon icon={faLocationDot} className='text-3xl text-blue-600' /> Where </p>
                    <p className=''>{data.location}</p>
                </div>
                <div>
                    <p className='font-bold text-2xl'><FontAwesomeIcon icon={faUser} className='text-3xl text-blue-600' /> Spots left </p>
                    <p className=''>There are {data.capacity - data.attendees.length} spots left. </p>
                    <p>This event can host up to {data.capacity} people.</p>
                </div>
                <OrganizerCard organizer={organizer} isUser={data.user_id != null} />
            </div>
            <div>
                <h2 className="text-3xl text-bold">Description</h2>
                <p className="indent-8">{data.description}</p>
            </div>
            <div>
                <h2 className="text-3xl text-bold">Users Attending</h2>

                {
                    data.attendees == null || data.attendees.length == 0 ? (
                        <p className="indent-8">There seem to be no users currently attending this event.</p>
                    ) : (
                        <ul className="indent-8">
                            {data.attendees.map((attendee: string) => <li> {attendee} </li>)}
                        </ul>
                    )
                }

            </div>
            <div>
                {/* @ts-expect-error Server Component */}
                <EventButton eventID={params.id} />
            </div>
        </div>
    );
}