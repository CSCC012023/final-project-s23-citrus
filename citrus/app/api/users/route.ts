import * as db from '../../../lib/db'
import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client'
import '../../../lib/patch.ts'

const prisma = new PrismaClient()

const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

// Retrieve a paginated list of all users in the database
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const next_id = searchParams.get('next_cursor');
    const prev_id = searchParams.get('prev_cursor');
    const limit = Number(searchParams.get('limit')) || 10;

    let where_clause: any = {
        username: {
            gt: next_id != null ? next_id : undefined,
            lt: prev_id != null ? prev_id : undefined
        }
    };

    let select = {
        username: true,
        email: true,
        premium: true,
        experiences: true,
    }

    if (next_id && prev_id) {
        // If both cursors are provided, indicate an error
        return NextResponse.json(
            { error: "You must provide either a next_cursor or a prev_cursor, but not both" },
            { status: 400 });
    }
    // Retrieve the users from the database
    // const res = await db.query(query, params);
    const res = await prisma.users.findMany({
        where: where_clause,
        take: limit,
        orderBy: {
            username: 'desc'
        },
        select: select
    });


    const users = res;
    // Set up the new cursors to return
    const next_cursor = users[users.length - 1].username;
    const prev_cursor = users[0].username;

    return NextResponse.json({
        "next_cursor": next_cursor || null,
        "prev_cursor": prev_cursor || null,
        "limit": limit,
        users
    });
}

// Endpoint to create a new user
export async function POST(request: Request) {
    const body = await request.json();
    const username:string = body.username;
    const password = body.password;
    const email:string = body.email;
    if (!schema.validate(password)) {
        return NextResponse.json({ error: "PASS_INVALID" }, { status: 400 });
    }

    bcrypt.hash(password, 10, async function (err: Error, hash: string) {
        if (err) {
            return NextResponse.json({ error: err }, { status: 500 });
        }
        try {
            await prisma.users.create({ data: { username: username, pass: hash, email: email } });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return NextResponse.json({ error: "Username already exists" }, { status: 400 });
                }
            }
        }
    });

    return NextResponse.json({ username: username, message: "SUCCESS" });
}

// Endpoint to update a user
export async function PUT(request: Request) {
    const body = await request.json();
    const username = body.username;
    const password = body.password;
    const email = body.email;
    const premium = body.premium;
    const phone_number = body.phone_number;
    const socials = body.socials;

    let update = {
        pass: password,
        email: email,
        premium: premium,
        phone_number: phone_number,
        socials: socials
    }

    try {
        await prisma.users.update({
            where: { username: username },
            data: update
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

// Endpoint to delete a user
export async function DELETE(request: Request) {
    const body = await request.json();
    const username = body.username;

    try {
        await prisma.users.delete({
            where: { username: username }
        });
        // return NextResponse.json({ username: username, message: "SUCCESS" });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2001') {
                return NextResponse.json({ error: "record not found" }, { status: 404 });
            }
        }
    }
    // return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    return NextResponse.json({ username: username, message: "SUCCESS" });

}