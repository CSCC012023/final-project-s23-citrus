import * as db from '../../../../lib/db'
import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// Retrieve a paginated list of all users in the database
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const username = params.id;

    let select = {
        username: true,
        email: true,
        premium: true,
        experiences: true,
    };

    var user = await prisma.users.findUnique({
        where: { username: username },
        select: select
    });
    
    return NextResponse.json( user );
}

// Endpoint to delete a user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const username = params.id;

    try {
        await prisma.users.delete({
            where: { username: username }
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2001') {
                return NextResponse.json({ error: "record not found" }, { status: 404 });
            }
        }
    }
    return NextResponse.json({ username: username, message: "SUCCESS" });

}