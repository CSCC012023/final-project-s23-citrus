import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import * as db from "@/lib/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";




export async function POST (request) {
    const session = await getServerSession(authOptions);


    if (!session || !session.user) {
        return NextResponse.redirect('/api/auth/signin')
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://citrus.vercel.app/cancel',
    })


    const prisma = db.getClient();

    let update = {
        premium: true,
    }

    // update user to premium

    //console.log(stripeSession.url)
    // get the url after the stripe session is created

    console.log(stripeSession.payment_status)

    if (stripeSession.payment_status === 'paid') {
        console.log('yippie')

        try {
            await prisma.users.update({
                where: {username: session.user.name},
                data: update
            });
        } catch (e) {
            return db.handleError(e);
        }
    }

    return NextResponse.json(stripeSession.url)
}