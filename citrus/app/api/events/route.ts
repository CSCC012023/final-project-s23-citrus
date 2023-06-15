import * as db from '../../../lib/db'
import { NextResponse } from 'next/server';

const clauses = {
    "search": "name LIKE $1 OR description LIKE $1 OR location LIKE $1 OR category LIKE $1 OR tags LIKE $1",
    "location": "location LIKE $1",
    "category": "category = $1",
    "end_date": "end_date <= $1",
    "start_date": "start_date >= $1",
    "sort_by": "ORDER BY $1",
    "tags": "tags @> "
}

/**
 * @api {get} /events Get all events
 * @apiName GetEvents
 * @apiGroup Events
 *
 * @apiParam {String} [next_cursor] The cursor to use to get the next page of results
 * @apiParam {String} [prev_cursor] The cursor to use to get the previous page of results
 * @apiParam {Number} [limit=10] The maximum number of results to return
 * @apiParam {String} [search] The search term to use to filter results
 * @apiParam {String} [category] The category to use to filter results
 * @apiParam {String} [sort_by] The field to use to sort results
 * @apiParam {String} [end_date] The date to use to filter results
 * @apiParam {String} [start_date] The date to use to filter results
 * @apiParam {String} [location] The location to use to filter results
 * @apiParam {String[]} [tags] The tags to use to filter results
 *
 * @apiSuccess {String} next_cursor The cursor to use to get the next page of results
 * @apiSuccess {String} prev_cursor The cursor to use to get the previous page of results
 * @apiSuccess {Number} limit The maximum number of results to return
 * @apiSuccess {Object[]} events The events that match the query
 * @apiSuccess {String} events.id The id of the event
 * @apiSuccess {String} events.name The name of the event
 * @apiSuccess {String} events.description The description of the event
 * @apiSuccess {String} events.location The location of the event
 * @apiSuccess {String} events.start_date The start date of the event
 * @apiSuccess {String} events.end_date The end date of the event
 * @apiSuccess {String} events.category The category of the event
 * @apiSuccess {String[]} events.tags The tags of the event
 * @apiSuccess {String[]} events.attendees The attendees of the event
 * @apiSuccess {String} events.org_id The id of the organization that created the event
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *      "next_cursor": "1",
 *      "prev_cursor": null,
 *      "limit": 10,
 *      "events": [
 *         {
 *           "id": "1",
 *           "name": "Event 1",
 *           "description": "This is the first event",
 *           "location": "New York",
 *           "start_date": "2021-01-01",
 *           "end_date": "2021-01-02",
 *           "category": "Sports",
 *           "tags": ["tag1", "tag2"],
 *           "attendees": ["user1", "user2"],
 *           "org_id": "1"
 *       },
 *      ]
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const next_id = searchParams.get('next_cursor');
    const prev_id = searchParams.get('prev_cursor');
    const limit = searchParams.get('limit') || 10;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const sort_by = searchParams.get('sort_by');
    const end_date = searchParams.get('end_date');
    const start_date = searchParams.get('start_date');
    const location = searchParams.get('location');

    var query = "SELECT * FROM events";
    var where_clause = "WHERE"
    var params = [];
    var first = true
    //

    // If no cursor is provided, return the first page
    if (!next_id && !prev_id) {
        query = query + " ORDER BY id DESC LIMIT $1";
        params = [limit];
    }
    else if (next_id && prev_id) {
        // If both cursors are provided, indicate an error
        return NextResponse.json(
            {error: "You must provide either a next_cursor or a prev_cursor, but not both"},
            {status: 400});
        }
    else if (next_id) {
        // If a next_cursor is provided, return the next page
        query = query + " ORDER BY id DESC LIMIT $2";
        params = [next_id, limit];
    }
    else {
        // If a prev_cursor is provided, return the previous page
        query = query + " ORDER BY id DESC LIMIT $2";
        params = [prev_id, limit];
    }

}
