import axios from "axios"
import { stripe } from "@/app/api/payment/route";
import { NextResponse, NextRequest } from "next/server";
import * as db from "@/lib/db"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function Page({ params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.redirect('/api/auth/login')
  }

  const prisma = db.getClient();

  let update = {
      premium: true,
  }

  const currentSession = await stripe.checkout.sessions.retrieve(
    params.id
  )

  console.log(currentSession)
  
  if (currentSession.payment_status === 'paid') {
   // LOGIC FOR UPDATING USER
   console.log('hello')

   try {
      await prisma.users.update({
        where: {username: session.user.name},
        data: update
      });
    } catch (e) {
        return db.handleError(e);
    }

   // Replace with stripe.checkout.sessions.expire()
   if (currentSession.status == 'open'){
      const expireSession = await stripe.checkout.sessions.expire(
        params.id
      )
   }
  }


  return (
   <div className="w-9/12 m-auto">
         <div className="mx-auto max-w-4xl text-center items-center">
              <h2 className="text-3xl font-semibold leading-7 text-[#f1592a]">Success!</h2>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[1040px] items-center mx-auto">
    
         </div>
   </div>
  )
}
