import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { redirect } from "next/navigation";
import * as db from "@/lib/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST (request) {
    const session = await getServerSession(authOptions);


    if (!session || !session.user) {
        redirect(db.BASE_URL + '/login')
    }

    let data = await request.json();
    let priceId = data.priceId
    
    const stripeSession = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: db.BASE_URL + '/success/{CHECKOUT_SESSION_ID}',
        cancel_url: db.BASE_URL+ '/cancel',
    })

    return NextResponse.json(stripeSession.url)
}