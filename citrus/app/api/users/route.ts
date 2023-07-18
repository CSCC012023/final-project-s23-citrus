import * as db from '@/lib/db'
import { NextResponse } from 'next/server';
import '@/lib/patch'

import type { users } from '@prisma/client';

const prisma = db.getClient();

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
 * @apiParam {String} [search] The search query to use to filter results
 * @apiParam {Number} [limit=10] The maximum number of results to return
 *
 * @apiSuccess {String} next_cursor The cursor to use to get the next page of results
 * @apiSuccess {String} prev_cursor The cursor to use to get the previous page of results
 * @apiSuccess {Number} limit The maximum number of results to return
 * @apiSuccess {Object[]} users The users that match the query
 * @apiSuccess {String} users.username The username of the user
 * @apiSuccess {String} users.email The email of the user
 * @apiSuccess {String} users.phone_number The phone number of the user
 * @apiSuccess {String} users.instagram The instagram link of the user
 * @apiSuccess {String} users.facebook The facebook link of the user

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
 *                "instagram": "https://www.instagram.com/sampleUsername/",
 *                "facebook": "https://www.facebook.com/sampleUsername/"
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
    const search = searchParams.get('search');
    const limit = Number(searchParams.get('limit')) || 10;

    let where_clause: any = {};

    if (search) {
        where_clause = {
            ...where_clause,
            username: {
                contains: search
            }
        };
    }

    if (next_id && prev_id) {
        return NextResponse.json({ error: "You must provide either a next_cursor or a prev_cursor, but not both" }, { status: 400 });
    }

    var cursor = undefined;
    var take = limit;
    var skip = 1;
    if (next_id) {
        cursor = {
            username: next_id
        }
    } else if (prev_id) {
        cursor = {
            username: prev_id
        }
        take = -limit;
    } else {
        skip = 0;
    }

    var users: users[] = [];
    
    let select = {
        username: true,
        email: true,
        premium: true,
        instagram: true,
        facebook: true,
        experiences: true
    };

    try {
        users = await prisma.users.findMany({
            where: where_clause,
            take: take,
            select: select,
            cursor: cursor,
            skip: skip,
            orderBy: {
                username: 'asc'
            },
        });

    }
    catch (e) {
        return db.handleError(e);
    }

    var next_cursor = null;
    var prev_cursor = null;

    if (users.length > 0) {
        next_cursor = users[users.length - 1].username;
        prev_cursor = users[0].username;
    }

    return NextResponse.json({
        next_cursor: next_cursor,
        prev_cursor: prev_cursor,
        limit: limit,
        users,
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

    const hash = await bcrypt.hash(password, 10);

    try {
        await prisma.users.create({ data: { username: username, pass: hash, email: email } });
    } catch (e) {
        return db.handleError(e);
    }

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
 * @apiParam {String} instagram The instagram link of the user
 * @apiParam {String} facebook The facebook link of the user

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
export async function PUT(request: Request) {
    const body = await request.json();
    const username = body.username;
    var password = body.password;
    const email = body.email;
    const premium = body.premium;
    const phone_number = body.phone_number;
    const instagram = body.instagram;
    const facebook = body.facebook;

    if (password !== undefined) {
        if (!schema.validate(password)) {
            return NextResponse.json({ error: "Password is invalid." }, { status: 400 });
        } else {
            const hash = await bcrypt.hash(password, 10);
            password = hash;
        }
    }

    let update = {
        pass: password,
        email: email,
        premium: premium,
        phone_number: phone_number,
        instagram: instagram,
        facebook: facebook
    }

    try {
        await prisma.users.update({
            where: { username: username },
            data: update
        });
    } catch (e) {
        return db.handleError(e);
    }

    return NextResponse.json({ username: username, message: "SUCCESS" });
}
