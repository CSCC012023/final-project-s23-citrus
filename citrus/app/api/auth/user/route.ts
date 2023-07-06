import * as db from '@/lib/db'
import { NextResponse } from 'next/server';
import '@/lib/patch'

const bcrypt = require('bcrypt');

const prisma = db.getClient();

/**
 * @api {post} /api/auth/user Login a user
 * @apiName LoginUser
 * @apiGroup Authentication
 * 
 * @apiBody {String} username The username of the user
 * @apiBody {String} password The password of the user
 * 
 * @apiSuccess {String} username The username of the user
 * @apiSuccess {String} email The email of the user
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *      "username": "sampleUsername",
 *      "email": "test@email.com"
 *   }
 * 
 * 
 */

export async function POST(request: Request) {
    const body = await request.json();
    console.log("AUTHENTICATING USER...")

    const username = body.username;
    const password = body.password;

    const user = await prisma.users.findUnique({
        where: { username: username }
    });

    if (!user) {
        return NextResponse.next();
    }

    const match = await bcrypt.compare(password, user.pass);

    if (!match) {
        return NextResponse.next();
    }

    return NextResponse.json({
        name: user.username,
        email: user.email,

    });
}