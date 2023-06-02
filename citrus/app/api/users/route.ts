import * as db from '../../../lib/db'
import { NextResponse } from 'next/server';

// Retrieve a paginated list of all users in the database
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const next_id = searchParams.get('next_cursor');
    const prev_id = searchParams.get('prev_cursor');
    const limit = searchParams.get('limit') || 10;
    var query = "SELECT username FROM _temp";
    var params = [];
    // If no cursor is provided, return the first page
    if (!next_id && !prev_id) {
        query = query + " ORDER BY username DESC LIMIT $1";
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
        query = query + " WHERE username > $1 ORDER BY username DESC LIMIT $2";
        params = [next_id, limit];
    }
    else {
        // If a prev_cursor is provided, return the previous page
        query = query + " WHERE username < $1 ORDER BY username DESC LIMIT $2";
        params = [prev_id, limit];
    }
    // Retrieve the users from the database
    const res = await db.query(query, params);
    const users = res.rows;
    // Set up the new cursors to return
    const next_cursor = users[users.length - 1].id;
    const prev_cursor = users[0].id;

    return NextResponse.json({
        "next_cursor": next_cursor || null,
        "prev_cursor": prev_cursor || null,
        "limit": limit,
        users });
}

// Endpoint to create a new user
export async function POST(request: Request) {
    const body = await request.json();
    const username = body.username;
    const password = body.password;
    // Check if the username is already taken
    const check = await db.query("SELECT * FROM _temp WHERE username = $1", [username]);
    if (check.rows.length > 0) {
        return NextResponse.json({error: "Username already taken"}, {status: 400});
    }
    // Create the new user
    await db.query("INSERT INTO _temp (username) VALUES ($1)", [username]);
    return NextResponse.json({username: username, message: "User created successfully"});
}
