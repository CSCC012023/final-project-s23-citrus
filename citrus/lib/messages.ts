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

    return groups
}

export async function getGroup(groupID: string) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return "Unauthorized"
    }

    const group = await prisma.Group.findUnique({
        where: {
            id: groupID
        },
    })

    return group
}

export async function getUsersForGroup(groupID: string) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return "Unauthorized"
    }

    const group = await prisma.groups.findUnique({
        where: {
            id: groupID
        },
        include: {
            users: true
        }
    })

    const users = group.users
    return users
}

export async function isUserInGroup(username: string, groupID: string) {
    try {
        const group = await prisma.Group.findUnique({
            where: {
                id: groupID,
            },
            select: {
                users: {
                    select: {
                        username: true
                    } 
                }
            }
        }) 

        const usernames = group.users.map((user: any) => user.username)

        if (usernames.includes(username)) {
            return true
        }
        return false
    } catch (e) {
        return false
    }
}