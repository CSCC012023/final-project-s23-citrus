import Ably from "ably/promises";
import { NextResponse } from "next/server";
import * as db from "@/lib/db"
import "@/lib/patch"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = db.getClient();

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const follows = await prisma.Follows.create({
            data: {
                follower_username: session.user.name,
                following_username: body.username
            }
        })

        const group = await prisma.Group.create({
            data: {
                name: `${session.user.name} & ${body.username}`,
                users: {
                    connect: [
                        { username: session.user.name },
                        { username: body.username }
                    ]
                }
            }
        })
        return NextResponse.json(
            { follows, group, success: true },
            { status: 200 }
        )
    } catch (e) {
        return db.handleError(e);
    }
}
