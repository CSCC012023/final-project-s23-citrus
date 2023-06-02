import * as db from '../../../../lib/db'
import { NextResponse } from 'next/server';

// Retrieve a paginated list of all users in the database
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const res = await db.query("SELECT * FROM _temp WHERE username = $1", [id]);
    const user = res.rows;
    return NextResponse.json(user);
}
