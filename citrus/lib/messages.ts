import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import * as db from "@/lib/db"
import "@/lib/patch"

const prisma = db.getClient()

export async function getGroupsForUser() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return "Unauthorized"
    }

    const user = await prisma.users.findUnique({
        where: {
            username: session.user.name
        },
        include: {
            groups: true
        }
    })

    const groups = user.groups
    console.log(groups)

    return groups
}

export async function getUsersForGroup(groupID: string) {

}