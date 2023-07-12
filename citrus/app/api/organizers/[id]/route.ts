import * as db from '@/lib/db'
import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = db.getClient();

/**
 * @api {get} /users/:id Get organizer named ID
 * @apiName GetOrganizer
 * @apiGroup Organizers
 *
 * @apiSuccess {String} org_id The organizer ID
 * @apiSuccess {String} display_name The organizer name
 * @apiSuccess {String} organizer_description The description for the organizer
 * @apiSuccess {String} email The email of the organizer
 * @apiSuccess {String} phone_number The phone number of the organizer
 * @apiSuccess {String[]} socials The social media links of the organizer
 * @apiSuccess {Boolean} premium Whether the user is a premium organizer
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *     {
 *         "org_id": "sampleOrgId",
 *         "display_name": "Sample Organizer",
 *         "organizer_description": "This is a sample organizer",
 *         "email": "sampleEmail@mail.com",
 *         "phone_number": "16471234567",
 *         "socials": [
 *             "https://www.instagram.com/sampleUsername/",
 *             "https://www.facebook.com/sampleUsername/"
 *         ],
 *         "premium": true,
 *         "experiences": []
 *     }
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const org_id = params.id;

    let select = {
        org_id: true,
        display_name: true,
        organizer_description: true,
        email: true,
        socials: true,
        premium: true,
    };

    var organizer = await prisma.organizers.findUnique({
        where: { org_id: org_id },
        select: select
    });

    return NextResponse.json( organizer );
}

/**
 * @api {delete} /users/:id Delete organizer named ID
 * @apiName DeleteOrganizer
 * @apiGroup Organizers
 *
 * @apiSuccess {String} org_id The organizer id of the deleted orangizer
 * @apiSuccess {String} message The message
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
 *          "error": "Organizer not found."
 *     }
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const org_id = params.id;

    try {
        await prisma.organizers.delete({
            where: { org_id: org_id }
        });
    } catch (e) {
        return db.handleError(e);
    }
    return NextResponse.json({ org_id: org_id, message: "SUCCESS" });
}
