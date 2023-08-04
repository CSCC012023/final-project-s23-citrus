"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import { experiences } from '@prisma/client';

async function onPrepaidTicketHandler(username: string, eventID: string, tickets: BigInt){
  const res = await fetch(process.env.BASE_API_URL + `/api/experiences/${eventID}?addUser=true?ticketsAdded=${tickets}`, {
      method: 'PUT',
      body: JSON.stringify({}),
  });
  const status_res = await fetch(process.env.BASE_API_URL + `api/statuses/${eventID}?user_id=${username}?ticketsAdded=${tickets}`, {
      method: 'PUT',
      body: JSON.stringify({})
  })
}

export default function TextBoxInput({username, eventID, currentEvent}: {username: string, 
  eventID: string, currentEvent: experiences}){
  const router = useRouter();
  const [extraTickets, setExtraTickets] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExtraTickets(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    //const res = async () => {await onPrepaidTicketHandler(username, eventID, BigInt(extraTickets))}

    fetch(process.env.BASE_API_URL + `/api/experiences/${eventID}?addUser=true?ticketsAdded=${extraTickets}`,
      {
        method: 'PUT',
        body: JSON.stringify({})
      }).then();
    
    fetch(process.env.BASE_API_URL + `/api/statuses/${eventID}?user_id=${username}?ticketsAdded=${extraTickets}`,
      {
        method: 'PUT',
        body: JSON.stringify({})
      }).then();

    setExtraTickets("");
    router.refresh();
    
  };

  return (
    <form className="flex-row" onSubmit={handleSubmit}>
      <input
        type="text"
        value={extraTickets}
        onChange={handleChange}
        placeholder="Enter number of extra tickets (INCLUSIVE)"
        className="w-52 h-8 p-2 border rounded mr-2"
      />
    <button className="text-center text-white font-semibold z-10 i h-8 w-52 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center 
        rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-105
        hover:scale-y-105 transition duration-300 ease-out" type="submit">Update Extra Tickets</button>
      
    </form>
  );
};
