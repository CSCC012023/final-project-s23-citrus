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
 * @api {get} /users Get all organizers
 * @apiName GetOrganizers
 * @apiGroup Organizers
 *
 * @apiParam {String} [next_cursor] The cursor to use to get the next page of results
 * @apiParam {String} [prev_cursor] The cursor to use to get the previous page of results
 * @apiParam {Number} [limit=10] The maximum number of results to return
 *
 * @apiSuccess {String} next_cursor The cursor to use to get the next page of results
 * @apiSuccess {String} prev_cursor The cursor to use to get the previous page of results
 * @apiSuccess {Number} limit The maximum number of results to return
 * @apiSuccess {Object[]} users The organizers that match the query
 * @apiSuccess {String} organizers.org_id The organizer ID
 * @apiSuccess {String} organizers.display_name The organizer name
 * @apiSuccess {String} organizers.organizer_description The description for the organizer
 * @apiSuccess {String} organizers.email The email of the organizer
 * @apiSuccess {String} organizers.phone_number The phone number of the organizer
 * @apiSuccess {String[]} organizers.socials The social media links of the organizer
 * @apiSuccess {Boolean} organizers.premium Whether the user is a premium organizer
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "next_cursor": "sampleOrgId",
 *        "prev_cursor": null,
 *        "limit": 10,
 *        "organizers": [
 *            {
 *                "org_id": "sampleUsername",
 *                "display_name": "Sample Organizer",
 *                "organizer_description": "This is a sample organizer",
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
    const limit = Number(searchParams.get('limit')) || 10;

    let where_clause: any = {
        org_id: {
            gt: next_id != null ? next_id : undefined,
            lt: prev_id != null ? prev_id : undefined
        }
    };

    let select = {
        org_id: true,
        display_name: true,
        organizer_description: true,
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
    const res = await prisma.organizers.findMany({
        where: where_clause,
        take: limit,
        orderBy: {
            org_id: 'desc'
        },
        select: select
    });

    const organizers = res;
    // Set up the new cursors to return
    const next_cursor = organizers[organizers.length - 1].org_id;
    const prev_cursor = organizers[0].org_id;

    return NextResponse.json({
        "next_cursor": next_cursor || null,
        "prev_cursor": prev_cursor || null,
        "limit": limit,
        organizers
    });
}

/**
 * @api {post} /users Create an organizers
 * @apiName CreateOrganizers
 * @apiGroup Organizers
 * 
 * @apiParam {String} username The username of the organizers
 * @apiParam {String} password The password of the organizers
 * @apiParam {String} email The email of the organizers
 * 
 * @apiSuccess {String} username The username of the organizers
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
    const org_id:string = body.org_id;
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
            await prisma.organizers.create({ data: { org_id: org_id, pass: hash, email: email } });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return NextResponse.json({ error: "Organizer already exists" }, { status: 400 });
                }
            }
        }
    });

    return NextResponse.json({ org_id: org_id, message: "SUCCESS" });
}

/**
 * @api {put} /users Update an organizer
 * @apiName UpdateOrganizer
 * @apiGroup Organizer
 * 
 * @apiParam {String} org_id Organizer's ID
 * @apiParam {String} display_name The display name of the organizer
 * @apiParam {String} organizer_description The description for the organizer
 * @apiParam {String} password The password of the organizer
 * @apiParam {String} email The email of the organizer
 * @apiParam {Boolean} premium Whether the organizer is a premium organizer
 * @apiParam {String} phone_number The phone number of the organizer
 * @apiParam {String[]} socials The social media links of the organizer
 * 
 * @apiSuccess {String} username The username of the user
 * @apiSuccess {String} message The message indicating the success of the request
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "org_id": "sampleUsername",
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
    const org_id = body.org_id;
    const display_name = body.display_name;
    const organizer_description = body.organizer_description;
    const password = body.password;
    const email = body.email;
    const premium = body.premium;
    const phone_number = body.phone_number;
    const socials = body.socials;

    let update = {
        org_id: org_id,
        display_name: display_name,
        organizer_description: organizer_description,
        pass: password,
        email: email,
        premium: premium,
        phone_number: phone_number,
        socials: socials
    }

    try {
        await prisma.organizers.update({
            where: { org_id: org_id },
            data: update
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2001') {
                return NextResponse.json({ error: "User not found." }, { status: 404 });
            }
        }
    }

    return NextResponse.json({ org_id: org_id, message: "SUCCESS" });
}