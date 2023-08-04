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

/*     if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } */

    try {
        const follows = await prisma.Follows.create({
            data: {
                follower_username: body.username1,
                following_username: body.username
            }
        })

        const group = await prisma.Group.create({
            data: {
                name: `${body.username1} & ${body.username}`,
                users: {
                    connect: [
                        { username: body.username1 },
                        { username: body.username }
                    ]
                }
            }
        })
        return NextResponse.json(
            { follows, group },
            { status: 200 }
        )
    } catch (e) {
        return db.handleError(e);
    }
}
