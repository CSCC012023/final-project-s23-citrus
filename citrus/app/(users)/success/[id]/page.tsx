'use client'
import axios from "axios"
import Stripe from 'stripe'


export default async function Page({ params }: { params: { id: string } }) {

  const res = await fetch('stripe.com/api/v1/checkout/sesssions/' + params.id,{ method: 'GET'})
  const currentSession = await res.json();
  
  if (currentSession.payment_status === 'paid' && currentSession.status === 'open') {
   // LOGIC FOR UPDATING USER

   const expireSession = await fetch('stripe.com/api/v1/checkout/sesssions/' + params.id + '/expire',{ method: 'POST'})
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
