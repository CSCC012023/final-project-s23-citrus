const { Pool } = require("pg");
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const query = (text, params, callback) => {
    return pool.query(text, params, callback)
}

export const getClient = () => {
    return pool.connect()
}

export const pagination_clause = (next_id, prev_id) => {
    if (next_id && prev_id) {
        /* If both next_id and prev_id are present,
        the API request is malformed. */
        return NaN
    } else if (next_id) {
        return `WHERE id > $1`
    } else if (prev_id) {
        return `WHERE id < $1`
    } else {
        return ''
    }
}

export const build_select_query = (table, params) => {
    next_id = params.next_id
    prev_id = params.prev_id
    pagination_clause = pagination_clause(next_id, prev_id)
    if (isNaN(pagination_clause)) {
        return NextResponse.json(
            { error: "You must provide either a next_cursor or a prev_cursor, but not both" },
            { status: 400 }
        )
    }
}
