"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from "next/navigation";

async function onPrepaidTicketHandler(eventID: string, tickets: BigInt){
  const res = await fetch(`/api/experiences/${eventID}?addUser=true?ticketsAdded=${tickets}`, {
      method: 'PUT',
      body: JSON.stringify({}),
  });
}

export default function TextBoxInput({username, eventID, prepaid_tickets}: {username: string | null | undefined, 
  eventID: string, prepaid_tickets: BigInt}){
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Submitted value:', inputValue);
    const res = async () => {await onPrepaidTicketHandler(eventID, prepaid_tickets)}
    setInputValue('');
    router.refresh();
  };

  return (
    <form className="flex-row" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
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
