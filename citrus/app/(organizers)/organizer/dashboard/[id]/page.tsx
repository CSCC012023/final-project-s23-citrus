import EditEvent from "@/components/EditEvent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page( {params}: { params: {id: string }}) {
    const session = await getServerSession(authOptions);
    const res = await fetch(process.env.BASE_API_URL + 'api/experiences/' + params.id);
    const experience = await res.json();
    if (experience.org_id !== session?.user?.name) {
        return <h1>You are not authorized to edit this event.</h1>
    }
    return <EditEvent experience={experience} />
}