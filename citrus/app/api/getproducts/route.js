import Stripe from "stripe";
import { NextResponse, NextRequest } from 'next/server';


export async function GET(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list({
        limit: 1,
    });

    return NextResponse.json(prices.data.reverse());
}
