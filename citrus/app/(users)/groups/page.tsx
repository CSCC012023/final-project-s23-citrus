import GroupChatHolder from "@/components/GroupChatHolder"
import { use } from "react";
import { getGroupsForUser } from "@/lib/messages"
export const dynamic = "force-dynamic"

function GroupCard({ group }: { group: any }) {
    return (
            <li className="bg-blue-600 p-2 rounded-lg my-2 border-white border-2">
                <a href={`/groups/${group.id}`}>{group.name}</a>
            </li>
    )
}

export default function Page() {
    const groups = use(getGroupsForUser())
    if (groups === "Unauthorized") {
        return <div>loading...</div>
    }
    return (
        <div className="text-center">
            <h1 className="text-3xl mx-auto">Groups</h1>
            <div className='flex flex-row flex-wrap'>
                <ul className="mx-auto">
                    {groups.map((group: any) => <GroupCard group={group} key={group.id}/>)}
                </ul>
            </div>
        </div>
    )
}