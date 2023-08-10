import ChatContainer from './JSXStyleComponent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { isUserInGroup, getGroup } from '@/lib/messages';
export const dynamic = "force-dynamic"

export default async function Home({ params }: { params: { group: string } }) {
    const groupID = params.group;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return <div>loading...</div>
    }

    const inGroup = await isUserInGroup(session.user.name as string, groupID)
    if (!inGroup) {
      return <div>loading...</div>
    }

    const group = await getGroup(groupID);

    return (
      <ChatContainer groupID={groupID} groupName={group.name}/>
    )
  }