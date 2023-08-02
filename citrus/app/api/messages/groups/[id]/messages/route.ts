import * as db from "@/lib/db"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = db.getClient();

// Return messages in a group 200 at a time, starting from the most recent
export async function GET(request:Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url)
    const prevCursor = searchParams.get("cursor")
    const nextCursor = searchParams.get("cursor")
    var take = 200
    var cursor = undefined
    var skip = 1

    if (prevCursor) {
        cursor = {
            id: prevCursor
        }
        take = -200
    } else if (nextCursor) {
        cursor = {
            id: nextCursor
        }
    } else {
        skip = 0
    }

    if (!session || !session.user) {
        return NextResponse.json("Unauthorized", { status: 401 })
    }

    try {
        const messages = await prisma.Message.findMany({
            where: {
                group_id: params.id
            },
            orderBy: {
                created_at: "desc"
            },
            take: take,
            skip: skip,
            cursor: cursor
        })

        const nextCursor = messages[messages.length - 1]?.id
        const prevCursor = messages[0]?.id

        return NextResponse.json(
            { messages: messages,
              nextCursor: nextCursor,
              prevCursor: prevCursor },
            { status: 200 }
        )
    } catch(e) {
        return db.handleError(e)
    }
}

export async function POST(request: Request,
    { params }: { params: { id: string } }) {
    console.log("POST REQUESTED")
    const body = await request.json();
    const { text } = body;
    const session = await getServerSession(authOptions);

    console.log(text)
    console.log(session)
    console.log(params.id)

    if (!session || !session.user) {
        return NextResponse.json("Unauthorized", { status: 401 })
    }

    try {
        await prisma.Message.create({
            data: {
                text: text,
                user_id: session.user?.name,
                group_id: params.id
            }
        })
    } catch (e) {
        return db.handleError(e)
    }

    return NextResponse.json(
        { message: "Message sent" },
        { status: 200 }
    )
}
