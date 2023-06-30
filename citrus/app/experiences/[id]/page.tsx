async function getEventData(id: string) {
    const res = await fetch(`http://localhost:3000/api/experiences/${id}`);
    const data = await res.json();
    return data;
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getEventData(params.id);
    console.log(data);
    return (
        <div>
            <h1>{data.event_name}</h1>
            <p>{data.event_description}</p>
        </div>
    );
}
