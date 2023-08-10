"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import { experiences } from '@prisma/client';

export default function TextBoxInput({username, eventID, currentEvent}: {username: string, 
  eventID: string, currentEvent: experiences}){
  const router = useRouter();
  const [extraTickets, setExtraTickets] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExtraTickets(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch(`/api/experiences/${eventID}?addUser=false&ticketsAdded=${extraTickets}`,
      {
        method: 'PUT',
        body: JSON.stringify({})
      }).then();
    
    fetch(`/api/statuses/${eventID}?user_id=${username}&ticketsAdded=${extraTickets}`,
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
        placeholder="Enter number of extra tickets"
        className="mr-2 w-64 px-4 py-2 border border-gray-400 rounded-md text-black"
      />
    <button className="text-center text-white font-semibold z-10 i h-10 w-52 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center 
        rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-105
        hover:scale-y-105 transition duration-300 ease-out" type="submit">Update Extra Tickets</button>
      
    </form>
  );
};
