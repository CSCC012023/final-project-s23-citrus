import * as db from '@/lib/db';
import { NextResponse } from 'next/server';
import '@/lib/patch'

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
    const body = await request.json();
    try {
        const updatedEvent = await prisma.experiences.update({
            where: {
                id: id
            },
            data: body
        });
        return NextResponse.json(updatedEvent);
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
