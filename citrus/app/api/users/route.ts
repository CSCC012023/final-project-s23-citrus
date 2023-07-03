import * as db from '../../../lib/db'
import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client'
import '../../../lib/patch'

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

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiParam {String} [next_cursor] The cursor to use to get the next page of results
 * @apiParam {String} [prev_cursor] The cursor to use to get the previous page of results
 * @apiParam {Number} [limit=10] The maximum number of results to return
 *
 * @apiSuccess {String} next_cursor The cursor to use to get the next page of results
 * @apiSuccess {String} prev_cursor The cursor to use to get the previous page of results
 * @apiSuccess {Number} limit The maximum number of results to return
 * @apiSuccess {Object[]} users The users that match the query
 * @apiSuccess {String} users.username The username of the user
 * @apiSuccess {String} users.email The email of the user
 * @apiSuccess {String} users.phone_number The phone number of the user
 * @apiSuccess {String[]} users.socials The social media links of the user
 * @apiSuccess {Boolean} users.premium Whether the user is a premium user
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "next_cursor": "sampleUsername",
 *        "prev_cursor": null,
 *        "limit": 10,
 *        "users": [
 *            {
 *                "username": "sampleUsername",
 *                "email": "sampleEmail@mail.com",
 *                "phone_number": "16471234567",
 *                "socials": [
 *                    "https://www.instagram.com/sampleUsername/",
 *                    "https://www.facebook.com/sampleUsername/"
 *                ],
 *                "premium": true
 *            }
 *        ]
 *    }
 *
 * @apiError {String} error The error message
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *   "error": "You must provide either a next_cursor or a prev_cursor, but not both"
 *  }
 */export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const next_id = searchParams.get('next_cursor');
    const prev_id = searchParams.get('prev_cursor');
    const limit = Number(searchParams.get('limit')) // || 10;

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
        socials: true,
        experiences: true
    };

    if (next_id && prev_id) {
        // If both cursors are provided, indicate an error
        return NextResponse.json(
            { error: "You must provide either a next_cursor or a prev_cursor, but not both" },
            { status: 400 });
    }
    // Retrieve the users from the database
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
    const next_cursor = users.length != 0 ? users[users.length - 1].username : null;
    const prev_cursor = users.length != 0 ? users[0].username : null;

    return NextResponse.json({
        "next_cursor": next_cursor,
        "prev_cursor": prev_cursor,
        "limit": limit,
        users
    });
}

/**
 * @api {post} /users Create a user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {String} username The username of the user
 * @apiParam {String} password The password of the user
 * @apiParam {String} email The email of the user
 *
 * @apiSuccess {String} username The username of the user
 * @apiSuccess {String} message The message indicating the success of the request
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *         "username": "sampleUsername",
 *         "message": "SUCCESS"
 *     }
 *
 * @apiError {String} error The error message
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "error": "Password is invalid."
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "error": "Username already exists"
 *     }
 */export async function POST(request: Request) {
    const body = await request.json();
    const username:string = body.username;
    const password = body.password;
    const email:string = body.email;
    if (!schema.validate(password)) {
        return NextResponse.json({ error: "Password is invalid." }, { status: 400 });
    }

    // TODO! fix incorrect response return caused by bcrypt running callback
    // function which does not return in the main function.
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

/**
 * @api {put} /users Update a user
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiParam {String} username The username of the user
 * @apiParam {String} password The password of the user
 * @apiParam {String} email The email of the user
 * @apiParam {Boolean} premium Whether the user is a premium user
 * @apiParam {String} phone_number The phone number of the user
 * @apiParam {String[]} socials The social media links of the user
 *
 * @apiSuccess {String} username The username of the user
 * @apiSuccess {String} message The message indicating the success of the request
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "username": "sampleUsername",
 *         "message": "SUCCESS"
 *     }
 *
 * @apiError {String} error The error message
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "error": "User not found."
 *     }
 */
// TODO! implement password hashing on update
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
                return NextResponse.json({ error: "User not found." }, { status: 404 });
            }
        }
    }

    return NextResponse.json({ username: username, message: "SUCCESS" });
}
