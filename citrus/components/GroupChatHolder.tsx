export default async function GroupChatHolder() {
    const res = await fetch('http://localhost:3000/api/messages/groups')
    const body = await res.json()
    const groups = body.groups
    return (
        <div>
            <h1>Groups</h1>
            <ul>
                {groups.map((group: any) => (
                    <li key={group.id}>
                        <a href={`/users/groups/${group.id}/messagehistory`}>{group.name}</a>
                    </li>
                ))}
            </ul>=
        </div>
    )
}