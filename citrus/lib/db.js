const { Pool } = require("pg");
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

const errorToStatus = {
    'P2000': '400',
    'P2001': '404',
    'P2002': '422',
    'P2003': '422',
    'P2004': '422',
    'P2005': '409',
    'P2006': '400',
    'P2007': '400',
    'P2008': '400',
    'P2009': '400',
    'P2010': '400',
    'P2011': '400',
    'P2012': '400',
    'P2013': '400',
    'P2014': '400',
    'P2015': '404',
    'P2016': '400',
    'P2017': '400',
    'P2018': '404',
    'P2019': '400',
    'P2020': '400',
    'P2021': '404',
    'P2022': '404',
    'P2023': '400',
    'P2024': '400',
    'P2025': '404',
    'P2026': '400',
    'P2027': '400',
    'P2028': '400',
    'P2029': '400',
    'P2030': '400',
    'P2031': '400',
    'P2032': '400',
    'P2033': '400',
    'P2034': '400',
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const query = (text, params, callback) => {
    return pool.query(text, params, callback)
}

export const getClient = () => {
    return pool.connect()
}

export const handleError = (err) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError
        && err.code in errorToStatus ) {
        return NextResponse.json(
            { error: err.message, code: err.code, meta: err.meta},
            { status: errorToStatus[err.code] }
        )
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
            { error: err.message, code: err.code, meta: err.meta},
            { status: 500 }
        )
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        )
    } else {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        )
    }
}