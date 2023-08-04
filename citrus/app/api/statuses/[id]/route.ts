import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import * as db from '@/lib/db';
import { NextResponse } from 'next/server';
import "@/lib/patch"


const prisma = db.getClient();

/**
 * @api {get} /attendingStatus:id Get the user_attending_status of a given user and event_id
 * @apiName GetUserAttendingStatus
 * @apiGroup UserAttendingStatus
 *
 * @apiParam {String} [user_id] The id of the user to get the user attending status from
 * @apiParam {String} [event_id] The id of the event to get the user attending status from
 *
 * @apiSuccess {String} user_id The id of the user to use to filter results
 * @apiSuccess {String} event_id The id of the event to get the user attending status from
 * @apiSuccess {String} attending The status of the user for a given event
 * @apiSuccess {Number} prepaid_tickets The amount of extra tickets a user has prepaid for this event
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *      "user_id": null,
 *      "event_id": "1",
 *      "attending": "interested"
 *      "prepaid_tickets": 0
 * 
 * @apiError UserAttendingStatusNotFound The UserAttendingStatus with the given ids was not found
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "UAS not found"
 * }
 *
 */

export async function GET(request: Request,
    { params }: { params: { id: string } }) {
    const { searchParams } = new URL(request.url);
    const event_id = params.id;
    const user_id = searchParams.get('user_id');

    try {
        const status = await prisma.user_attending_status.findFirstOrThrow({
            where: {
                username: user_id,
                event_id: event_id,
            },
        })
          
        return NextResponse.json(status);
    }
    catch (e) {
        return db.handleError(e);
    }
}

/**
 * @api {put} /attendingStatus:id Update the user_attending_status of a given user and event_id
 * @apiName UpdateUserAttendingStatus
 * @apiGroup UserAttendingStatus
 *
 * @apiParam {String} [user_id] The id of the user to get the user attending status from
 * @apiParam {String} [event_id] The id of the event to get the user attending status from
 *
 * @apiSuccess {String} user_id The id of the user to use to filter results
 * @apiSuccess {String} event_id The id of the event to get the user attending status from
 * @apiSuccess {String} attending The status of the user for a given event
 * @apiSuccess {Number} prepaid_tickets The amount of extra tickets a user has prepaid for this event
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *      "user_id": null,
 *      "event_id": "1",
 *      "attending": "interested"
 *      "prepaid_tickets": 0
 * 
 * @apiError UserAttendingStatusNotFound The UserAttendingStatus with the given ids was not found
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "UAS not found"
 * }
 *
 */

export async function PUT(request: Request,
    { params }: { params: { id: string } }) {
    const { searchParams } = new URL(request.url);
    const event_id = params.id;
    const user_id = searchParams.get('user_id');
    const ticketsAdded = searchParams.get('ticketsAdded');
      
    try {
        const status = await prisma.user_attending_status.update({
            where: {
                username: user_id,
                event_id: event_id,
            },
            data: {
                prepaid_tickets: ticketsAdded,
            },
        })
          
        return NextResponse.json(status);
    }
    catch (e) {
        return db.handleError(e);
    }
}
