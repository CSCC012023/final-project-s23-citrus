'use client'
import axios from "axios"
import { useState, useEffect } from "react"
import PricingCard from "@/components/PricingCard"

const Pricing = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
  fetchPrices()
  }, [])


  const fetchPrices = async () => {
    const {data} = await axios.get('/api/getproducts')
    setPrices(data)
    console.log(data)
  } 

  return (
   <div className="w-9/12 m-auto">
         <div className="mx-auto max-w-4xl text-center items-center">
              <h2 className="text-3xl font-semibold leading-7 text-[#f1592a]">Pricing</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Choose the right plan for you!</p>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 sm:text-center">Check out all the information below</p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[1040px] items-center mx-auto">
           {prices && prices.map((price) => (
            <PricingCard price={price} key={price.id} />
           ))}
         </div>
   </div>
  )
}

export default Pricing