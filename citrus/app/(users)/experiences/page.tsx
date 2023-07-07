"use client"
import React, { useState, useEffect } from 'react';

function EventCard() {
  // Your EventCard component code goes here
}

function EventCardHolder() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/experiences")
      .then(res => res.json())
      .then(data => {
        console.log(data.experiences);
        setEvents(data.experiences);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-5xl font-bold">Loading...</h1>
      </div>
    );
  }

  console.log(events);

  return (
    <div className="w-9/12 m-auto">
      <h1 className="text-5xl font-bold mb-4">Events</h1>
      <div className="flex justify-center">
        
        <a
          href="/addEvent"
          className="bg-blue-500 text-white rounded-md px-4 py-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Add Event            
          </h2>
        </a>

      </div>
      <div id="events" className="flex-col my-5">
        {events.map((event: any) => (
          <div
            key={"Event ID: " + event.id}
            className="flex-none bg-blue-600 rounded-lg border-blue-200 border-2 px-4 mb-2 text-center"
          >
            <h1 className="text-left">{"Name: " + event.name}</h1>
            <p className="text-left">{"Description: " + event.description}</p>
            <p className="text-left">{"Location: " + event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Page() {
  return <EventCardHolder />;
}
