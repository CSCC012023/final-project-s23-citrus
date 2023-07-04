import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client'
import '../../../../lib/patch'

const prisma = new PrismaClient()

/**
 * @api {get} /events:id Get an event
 * @apiName GetEvent
 * @apiGroup Events
 *
 * @apiParam {String} id The id of the event to get
 *
 * @apiSuccess {String} id The id of the event
 * @apiSuccess {String} name The name of the event
 * @apiSuccess {String} description The description of the event
 * @apiSuccess {String} location The location of the event
 * @apiSuccess {String} start_date The start date of the event
 * @apiSuccess {String} end_date The end date of the event
 * @apiSuccess {String} category The category of the event
 * @apiSuccess {String[]} tags The tags of the event
 * @apiSuccess {String[]} attendees The attendees of the event
 * @apiSuccess {String} org_id The id of the organization that created the event
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *     "id": "1",
 *     "name": "Event 1",
 *     "description": "This is the first event",
 *     "location": "New York",
 *     "start_date": "2021-01-01",
 *     "end_date": "2021-01-02",
 *     "category": "Sports",
 *     "tags": ["tag1", "tag2"],
 *     "attendees": ["user1", "user2"],
 *     "org_id": "1"
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
                          {params}: {params: {id: string}}) {

    const id = params.id;
    const res = await prisma.experiences.findUnique({
        where: {
            event_id: id
        }
    });
    const event = res;
    if (!event) {
        return NextResponse.json(
            { error: "Event not found" },
            { status: 404 });
    }
    return NextResponse.json(event);
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
 * @apiParam {String} [start_date] The start date of the event
 * @apiParam {String} [end_date] The end date of the event
 * @apiParam {String} [category] The category of the event
 * @apiParam {String[]} [tags] The tags of the event
 * @apiParam {String[]} [attendees] The attendees of the event
 * @apiParam {String} [org_id] The id of the organization that created the event
 *
 * @apiSuccess {String} id The id of the event
 * @apiSuccess {String} name The name of the event
 * @apiSuccess {String} description The description of the event
 * @apiSuccess {String} location The location of the event
 * @apiSuccess {String} start_date The start date of the event
 * @apiSuccess {String} end_date The end date of the event
 * @apiSuccess {String} category The category of the event
 * @apiSuccess {String[]} tags The tags of the event
 * @apiSuccess {String[]} attendees The attendees of the event
 * @apiSuccess {String} org_id The id of the organization that created the event
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   "id": "1",
 *   "name": "Event 1",
 *   "description": "This is the first event",
 *   "location": "New York",
 *   "start_date": "2021-01-01",
 *   "end_date": "2021-01-02",
 *   "category": "Sports",
 *   "tags": ["tag1", "tag2"],
 *   "attendees": ["user1", "user2"],
 *   "org_id": "1"
 * }
 *
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
    const res = await prisma.experiences.findUnique({
        where: {
            event_id: id
        }
    });
    const event = res;
    if (!event) {
        return NextResponse.json(
            { error: "Event not found" },
            { status: 404 });
    }
    const body = await request.json();
    const updatedEvent = await prisma.experiences.update({
        where: {
            event_id: id
        },
        data: body
    });
    return NextResponse.json(updatedEvent);
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
 * @apiSuccess {String} description The description of the event
 * @apiSuccess {String} location The location of the event
 * @apiSuccess {String} start_date The start date of the event
 * @apiSuccess {String} end_date The end date of the event
 * @apiSuccess {String} category The category of the event
 * @apiSuccess {String[]} tags The tags of the event
 * @apiSuccess {String[]} attendees The attendees of the event
 * @apiSuccess {String} org_id The id of the organization that created the event
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "id": "1",
 *  "name": "Event 1",
 *  "description": "This is the first event",
 *  "location": "New York",
 *  "start_date": "2021-01-01",
 *  "end_date": "2021-01-02",
 *  "category": "Sports",
 *  "tags": ["tag1", "tag2"],
 *  "attendees": ["user1", "user2"],
 *  "org_id": "1"
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
    const res = await prisma.experiences.findUnique({
        where: {
            event_id: id
        }
    });
    const event = res;
    if (!event) {
        return NextResponse.json(
            { error: "Event not found" },
            { status: 404 });
    }
    const deletedEvent = await prisma.experiences.delete({
        where: {
            event_id: id
        }
    });
    return NextResponse.json(deletedEvent);
}
