import * as db from '@/lib/db'
import { NextResponse } from 'next/server';

const prisma = db.getClient();

/**
 * @api {get} /users/:id Get user named ID
 * @apiName GetUser
 * @apiGroup Users
 * 
 * @apiSuccess {String} username The username of the user
 * @apiSuccess {String} email The email of the user
 * @apiSuccess {Boolean} premium Whether the user is a premium user
 * @apiSuccess {Object[]} experiences The experiences of the user
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *     {
 *         "username": "sampleUsername",
 *         "email": "sampleEmail@mail.com",
 *         "phone_number": "16471234567",
 *         "instagram": "https://www.instagram.com/sampleUsername/",
 *         "facebook": "https://www.facebook.com/sampleUsername/"
 *         "premium": true,
 *         "experiences": []
 *     }
 */ 
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const username = params.id;

    let select = {
        username: true,
        email: true,
        instagram: true,
        facebook: true,
        premium: true,
        experiences: true
    };

    var user = await prisma.users.findUnique({
        where: { username: username },
        select: select
    });
    
    return NextResponse.json( user );
}

/**
 * @api {delete} /users/:id Delete user named ID
 * @apiName DeleteUser
 * @apiGroup Users
 * 
 * @apiSuccess {String} username The username of the user
 * @apiSuccess {String} message The message
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
 *          "error": "record not found"
 *     }
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const username = params.id;

    try {
        await prisma.users.delete({
            where: { username: username }
        });
    } catch (e) {
        return db.handleError(e);
    }
    return NextResponse.json({ username: username, message: "SUCCESS" });
}