import * as db from '@/lib/db';
import { NextResponse } from 'next/server';
import '@/lib/patch'
import { attending_status_type } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BASE_URL } from '@/lib/vars';

const prisma = db.getClient();

/**
 * @api {get} /events:id Get an event
 * @apiName GetEvent
 * @apiGroup Events
 *
 * @apiParam {String} id The id of the event to get
 *
 * @apiSuccess {String} id The id of the event
 * @apiSuccess {String} name The name of the event
 * @apiSuccess {Number} capacity The capacity of the event
 * @apiSuccess {String} location The location of the event
 * @apiSuccess {String} start The start timestamp of the event
 * @apiSuccess {String} end The end timestamp of the event
 * @apiSuccess {String} description The description of the event
 * @apiSuccess {String} category The category of the event
 * @apiSuccess {String[]} tags The tags of the event
 * @apiSuccess {String[]} attendees The attendees of the event
 * @apiSuccess {String} org_id The id of the organization that created the event
 * @apiSuccess {String} user_id The id of the user that created the event
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "id": "1",
 *    "name": "Event 1",
 *    "description": "This is the first event",
 *    "location": "New York",
 *    "start": "2021-01-01T00:00:00.000Z",
 *    "end": "2021-01-02T00:00:00.000Z",
 *    "category": "Sports",
 *    "tags": ["tag1", "tag2"],
 *    "attendees": [],
 *    "org_id": "1",
 *    "user_id": null
 * }
 *
 * @apiError EventNotFound The event with the given id was not found
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 * {
 *    "error": "Event not found"
 * }
 *
 *
 */
export async function GET(request: Request,
    { params }: { params: { id: string } }) {

    const id = params.id;
    try {
        const res = await prisma.experiences.findUnique({
            where: {
                id: id
            }
        });
        return NextResponse.json(res);
    } catch (e) {
        return db.handleError(e);
    }
}

/**
 * @api {put} /events:id Update an event
 *
 * @apiName UpdateEvent
 * @apiGroup Events
 *
 * @apiParam {String} id The id of the event to update
 * @apiParam {String} [name] The name of the event
 * @apiParam {String} [description] The description of the event
 * @apiParam {String} [location] The location of the event
 * @apiParam {String} [start] The start date of the event
 * @apiParam {String} The end date of the event
 * @apiParam {String} [category] The category of the event
 * @apiParam {String[]} [tags] The tags of the event
 * @apiParam {String[]} [attendees] The attendees of the event
 * @apiParam {String} [org_id] The id of the organization that created the event
 *
 * @apiSuccess {String} id The id of the event
 * @apiSuccess {String} name The name of the event
 * @apiSuccess {Number} capacity The capacity of the event
 * @apiSuccess {String} location The location of the event
 * @apiSuccess {String} start The start timestamp of the event
 * @apiSuccess {String} end The end timestamp of the event
 * @apiSuccess {String} description The description of the event
 * @apiSuccess {String} category The category of the event
 * @apiSuccess {String[]} tags The tags of the event
 * @apiSuccess {String[]} attendees The attendees of the event
 * @apiSuccess {String} org_id The id of the organization that created the event
 * @apiSuccess {String} user_id The id of the user that created the event
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "id": "1",
 *    "name": "Event 1",
 *    "description": "This is the first event",
 *    "location": "New York",
 *    "start": "2021-01-01T00:00:00.000Z",
 *    "end": "2021-01-02T00:00:00.000Z",
 *    "category": "Sports",
 *    "tags": ["tag1", "tag2"],
 *    "attendees": [],
 *    "org_id": "1",
 *    "user_id": null,
 * }
 *
 * @apiError EventNotFound The event with the given id was not found
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "Event not found"
 * }
 *
 */
export async function PUT(request: Request,
    { params }: { params: { id: string } }) {
    const id = params.id;
    const { searchParams } = new URL(request.url);
    const addUser: string | null = searchParams.get("addUser")

    const session = await getServerSession(authOptions);
    const body = await request.json() || undefined;

    if (session === null && addUser != null) {
        redirect(BASE_URL + '/login')
    }


    try {
        // Update the fields of the event
        const updatedEvent = await prisma.experiences.update({
            where: {
                id: id
            },
            data: body
        });

        if (addUser === "true") {
            if (!session?.user) {
                return NextResponse.json({ status: 400, "error": "User not logged in"});
            }
            // Add the user to the event
            const userAddedEvent = await prisma.experiences.update({
                where: {
                    id: id
                },
                data: {
                    attendees: [...updatedEvent.attendees, session?.user.name]
                }
            })
            // Create the corresponding row in the user_attending_status table
            const createdStatus = await prisma.user_attending_status.create({
                data: {
                    username: session?.user.name,
                    event_id: id,
                    attending: "interested",
                }
            })
            // Return the updated event and the created status
            return NextResponse.json({ updatedEvent: updatedEvent, createdStatus: createdStatus });
        } else {
            return NextResponse.json({ updatedEvent: updatedEvent });
        }
    } catch (e) {
        return db.handleError(e);
    }
}

/**
 * @api {delete} /events:id Delete an event
 * @apiName DeleteEvent
 * @apiGroup Events
 *
 * @apiParam {String} id The id of the event to delete
 *
 * @apiSuccess {String} id The id of the event
 * @apiSuccess {String} name The name of the event
 * @apiSuccess {Number} capacity The capacity of the event
 * @apiSuccess {String} location The location of the event
 * @apiSuccess {String} start The start timestamp of the event
 * @apiSuccess {String} end The end timestamp of the event
 * @apiSuccess {String} description The description of the event
 * @apiSuccess {String} category The category of the event
 * @apiSuccess {String[]} tags The tags of the event
 * @apiSuccess {String[]} attendees The attendees of the event
 * @apiSuccess {String} org_id The id of the organization that created the event
 * @apiSuccess {String} user_id The id of the user that created the event
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "id": "1",
 *    "name": "Event 1",
 *    "description": "This is the first event",
 *    "location": "New York",
 *    "start": "2021-01-01T00:00:00.000Z",
 *    "end": "2021-01-02T00:00:00.000Z",
 *    "category": "Sports",
 *    "tags": ["tag1", "tag2"],
 *    "attendees": [],
 *    "org_id": "1",
 *    "user_id": null
 * }
 *
 * @apiError EventNotFound The event with the given id was not found
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "error": "Event not found"
 * }
 *
 */
export async function DELETE(request: Request,
    { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        var deletedStatuses = await prisma.user_attending_status.deleteMany({
            where: {
                event_id: id
            }
        });

        const deletedEvent = await prisma.experiences.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json(deletedEvent);
    } catch (e) {
        return db.handleError(e);
    }
}
