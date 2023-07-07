"use client";
import React, { useState, useEffect } from 'react';

function EventCard({ eventName, eventDescription, eventLocation }) {
  // Event card component code goes here
}

function EventCardHolder() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/experiences")
      .then(res => res.json())
      .then(data => {
        console.log(data.experiences);
        setEvents(data.experiences);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const eventName = event.event_name ? event.event_name.toLowerCase() : '';
      const eventLocation = event.event_location ? event.event_location.toLowerCase() : '';
      const nameMatch = eventName.includes(searchName.toLowerCase());
      const locationMatch = eventLocation.includes(searchLocation.toLowerCase());
      return nameMatch && locationMatch;
    });
    setFilteredEvents(filtered);
  }, [events, searchName, searchLocation]);

  if (loading) {
    return (
      <div>
        <h1 className="text-5xl text-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-9/12 m-auto">
      <h1 className="text-5xl text-bold">Events</h1>

      <div className="my-5">
        <input
          type="text"
          placeholder="Search by event name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black" // Added text-black class
        />
        <input
          type="text"
          placeholder="Search by event location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black" // Added text-black class
        />
      </div>

      <div id="events" className="flex my-5">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.event_id}
            eventName={event.event_name}
            eventDescription={event.event_description}
            eventLocation={event.event_location}
          />
        ))}
      </div>
    </div>
  );
}

export default async function Page() {
  return (
    <EventCardHolder />
  );
}
