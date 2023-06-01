import client from '../../../lib/db'
import { NextResponse } from 'next/server';

// Retrieve a paginated list of all users in the database
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const res = await client.query("SELECT * FROM _temp");
  const users = res.rows;
 
  return NextResponse.json({ users });
}

