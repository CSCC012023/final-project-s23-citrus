import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import * as db from "@/lib/db"
import "@/lib/patch"

const prisma = db.getClient()
/*
    GET /api/messages/groups
    @desc Get all groups that the user is in
    @access Private
*/
export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json("Unauthorized", { status: 401 })
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

    return NextResponse.json(
        groups,
        { status: 200 }
    )
}

/*
*
*/
export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const toAdd = searchParams.get("toAdd")?.split(",") || []
    const name = searchParams.get("name") || "New Group"

    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 })
    }

    const group = await prisma.groups.create(
        {
            data: {
                name: name,
                users: {
                    connect: toAdd.map((username) => {
                        return { username: username }
                    })
                }
            }
        }
    )

    return NextResponse.json(
        group,
        { status: 200 }
    )
}