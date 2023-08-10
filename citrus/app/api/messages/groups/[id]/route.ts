import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import * as db from "@/lib/db";

const prisma = db.getClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json("Unauthorized", { status: 401 })
    }

    try {
        const group = await prisma.Group.findUnique({
            where: {
                id: params.id
            },
            select: {
                users: {
                    select: {
                        username: true
                    }
                }
            },
        })

        const users = group.users.map((user: any) => {
            return user.username
        })

        if (users.includes(session.user.name)) {
            return NextResponse.json(
                group,
                { status: 200 }
            )
        } else {
            return NextResponse.json("Unauthorized", { status: 401 })
        }
    } catch (e) {
        return db.handleError(e)
    }
}

export async function PUT(request: Request,
    { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 })
    }

    const body = await request.json();
    const { toAdd, name } = body;

    try {
        const group = await prisma.groups.update({
            where: {
                id: params.id
            },
            data: {
                name: name,
                users: {
                    connect: toAdd.map((username: string) => {
                        return { username: username }
                    }
                    )
                }
            }
        })

        return NextResponse.json(
            group,
            { status: 200 }
        )
    } catch (e) {
        return db.handleError(e)
    }
}

export async function DELETE(request: Request,
    { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 })
    }

    try {
        const group = await prisma.groups.delete({
            where: {
                id: params.id,
                users: {
                    some: {
                        username: session.user.name
                    }
                }
            }
        })
        return NextResponse.json(
            group,
            { status: 200 }
        )
    } catch (e) {
        return db.handleError(e)
    }
}