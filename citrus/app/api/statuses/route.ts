import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import * as db from '@/lib/db';
import { NextResponse } from 'next/server';
import "@/lib/patch"

import type { experiences, user_attending_status } from '@prisma/client';

const prisma = db.getClient();

/**
 * @api {get} /interestedEvents Get all events a user is interested in
 * @apiName GetInterestedEvents
 * @apiGroup Events
 *
 * @apiParam {String} [next_cursor] The cursor to use to get the next page of results
 * @apiParam {String} [prev_cursor] The cursor to use to get the previous page of results
 * @apiParam {Number} [limit=10] The maximum number of results to return
 * @apiParam {String} [search] The search term to use to filter results
 * @apiParam {String} [category] The category to use to filter results
 * @apiParam {String} [end_date] The date to use to filter results
 * @apiParam {String} [start_date] The date to use to filter results
 * @apiParam {String} [location] The location to use to filter results
 * @apiParam {String[]} [tags] The tags to use to filter results
 * @apiParam {String} [org_id] The id of the organization to use to filter results
 * @apiParam {String} [user_id] The id of the user to use to filter results
 *
 * @apiSuccess {String} next_cursor The cursor to use to get the next page of results
 * @apiSuccess {String} prev_cursor The cursor to use to get the previous page of results
 * @apiSuccess {Number} limit The maximum number of results to return
 * @apiSuccess {String} current_user_id The id of the user currently signed in(if applicable)
 * @apiSuccess {Object[]} experiences The events that match the query
 * @apiSuccess {String} experiences.id The id of the event
 * @apiSuccess {String} experiences.name The name of the event
 * @apiSuccess {Number} experiences.capacity The capacity of the event
 * @apiSuccess {String} experiences.location The location of the event
 * @apiSuccess {String} experiences.start The start timestamp of the event
 * @apiSuccess {String} experiences.end The end timestamp of the event
 * @apiSuccess {String} experiences.description The description of the event
 * @apiSuccess {String} experiences.category The category of the event
 * @apiSuccess {String[]} experiences.tags The tags of the event
 * @apiSuccess {String[]} experiences.attendees The attendees of the event
 * @apiSuccess {String} experiences.org_id The id of the organization that created the event
 * @apiSuccess {String} experiences.user_id The id of the user that created the event
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *      "next_cursor": "1",
 *      "prev_cursor": null,
 *      "limit": 10,
 *      "current_user_id": null,
 *      "events": [
 *          {
 *              "id": "1",
 *              "name": "Event 1",
 *              "description": "This is the first event",
 *              "location": "New York",
 *              "start": "2021-01-01T00:00:00.000Z",
 *              "end": "2021-01-02T00:00:00.000Z",
 *              "category": "Sports",
 *              "tags": ["tag1", "tag2"],
 *              "attendees": [],
 *              "org_id": "1",
 *              "user_id": null,
 *          }
 *      ]
 */
export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const next_id = searchParams.get('next_cursor');
    const prev_id = searchParams.get('prev_cursor');
    const limit = Number(searchParams.get('limit')) || 10;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const start_time = searchParams.get('start_time');
    const end_time = searchParams.get('end_time');
    const location = searchParams.get('location');
    const tags = searchParams.get('tags')?.split(',');

    var or_clause: any = undefined;

    let where_clause: any = {
        location: {
            contains: location != null ? location : undefined
        },
        category: category != null ? category : undefined,
        start: {
            gte: start_time != null ? new Date(start_time) : undefined
        },
        end: {
            lte: end_time != null ? new Date(end_time) : undefined
        }
    };

    if (search) {
        or_clause = {
            OR: [
                {
                    name: {
                        contains: search
                    },
                },
                {
                    description: {
                        contains: search
                    },
                }
            ]
        }
    }

    if (tags) {
        where_clause = {
            ...where_clause,
            tags: {
                hasEvery: tags
            }
        }
    }

    if (next_id && prev_id) {
        return NextResponse.json({ error: "You must provide either a next_cursor or a prev_cursor, but not both" }, { status: 400 });
    }


    var cursor = undefined;
    var take = limit;
    var skip = 1;
    if (next_id) {
        cursor = {
            event_id: next_id
        }
    } else if (prev_id) {
        cursor = {
            event_id: prev_id
        }
        take = -limit;
    } else {
        skip = 0;
    }
    var experiences: experiences[] = [];
    var user_statuses: user_attending_status[] = [];

    if (session?.user) {
        try {
            const statuses = await prisma.user_attending_status.findMany({
                where: {
                    username: session.user?.name,
                    experiences: {
                        is: {
                            ...where_clause,
                            ...or_clause
                        }
                        //where_clause
                    }
                    // include where clause
                    // from experiences api route
                    // except prev_cursor and next_cursor (paginate based on statuses)
                },
                take: take,
                cursor: cursor,
                skip: skip,
                orderBy: {
                    event_id: 'asc'
                },
                include: {
                    experiences: true,
                },
            })
            user_statuses = statuses;
            for (var i = 0; i < statuses.length; i++) {
                experiences.push(statuses[i].experiences)
            }
        }
        catch (e) {
            return db.handleError(e);
        }
    }

    var next_cursor = null;
    var prev_cursor = null;

    if (user_statuses.length > 0) {
        next_cursor = user_statuses[user_statuses.length - 1].event_id;
        prev_cursor = user_statuses[0].event_id;
    }

    return NextResponse.json({
        next_cursor: next_cursor,
        prev_cursor: prev_cursor,
        limit: limit,
        experiences,
    });
}
