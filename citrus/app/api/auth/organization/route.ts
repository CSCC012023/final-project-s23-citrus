import * as db from '@/lib/db'
import { NextResponse } from 'next/server';
import '@/lib/patch'

const bcrypt = require('bcrypt');

const prisma = db.getClient();

/**
 * @api {post} /api/auth/organization Login a user
 * @apiName LoginOrganization
 * @apiGroup Authentication
 * 
 * @apiBody {String} username The username of the organization
 * @apiBody {String} password The password of the organization
 * 
 * @apiSuccess {String} username The display name of the organization
 * @apiSuccess {String} email The email of the organization
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

    const email = body.email;
    const password = body.password;

    const organization = await prisma.organizers.findUnique({
        where: { email: email }
    });

    if (!organization) {
        return NextResponse.next();
    }

    const match = await bcrypt.compare(password, organization.pass);

    if (!match) {
        return NextResponse.next();
    }

    return NextResponse.json({
        userType: "organizer",
        name: organization.org_id,
        email: organization.email,
    });
}