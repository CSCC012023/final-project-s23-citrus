import GroupChatHolder from "@/components/GroupChatHolder"
import { use } from "react";
import { getGroupsForUser } from "@/lib/messages"

function GroupCard({ group }: { group: any }) {
    return (
        <div>
            <h1><a href={`/groups/${group.id}-${group.name}`}>{group.name}</a></h1>
        </div>
    )
}

export default function Page() {
    const groups = use(getGroupsForUser())
    return (
        <div className="text-center">
            <h1 className="text-3xl mx-auto">Groups</h1>
            <div className='flex flex-row flex-wrap'>
                {groups.map((group: any) => <GroupCard group={group} key={group.id}/>)}
            </div>
        </div>
    )
}