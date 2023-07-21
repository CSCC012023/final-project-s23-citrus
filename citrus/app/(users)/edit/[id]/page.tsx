import EditEvent from "@/components/EditEvent";

export default async function Page( {params}: { params: {id: string }}) {
    const res = await fetch(process.env.BASE_API_URL + 'api/experiences/' + params.id);
    const experience = await res.json();
    return <EditEvent experience={experience} />
}