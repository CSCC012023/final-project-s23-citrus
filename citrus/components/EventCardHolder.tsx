"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { experiences } from '@prisma/client';
import EventCard from '@/components/EventCard';

export default function EventCardHolder() {
    const [events, setEvents] = useState<experiences[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<experiences[]>([]);
  
    const route = usePathname();
    var apiPathName = '';
    if (route.includes('organizer')) {
        apiPathName = '/api/organizers/test2?includeExperience=true';
    } else {
        apiPathName = 'api/experiences';
    }

    useEffect(() => {
      setLoading(true);
      fetch(apiPathName)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setEvents(data.experiences);
          setLoading(false);
        });
    }, []);
  
    useEffect(() => {
      const filtered = events.filter((event) => {
        const eventName = event.name ? event.name.toLowerCase() : '';
        const eventLocation = event.location ? event.location.toLowerCase() : '';
        const nameMatch = eventName.includes(searchName.toLowerCase());
        const locationMatch = eventLocation.includes(searchLocation.toLowerCase());
        return nameMatch && locationMatch;
      });
      setFilteredEvents(filtered);
    }, [searchName, searchLocation, events]);
  
    if (loading) {
      return (
        <div>
          <h1 className="text-5xl font-bold">Loading...</h1>
        </div>
      );
    }
  
    return (
      <div className="w-9/12 m-auto">
        <h1 className="text-5xl font-bold mb-4">Events</h1>
        <div className="my-5">
          <input
            type="text"
            placeholder="Search by event name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black"
          />
          <input
            type="text"
            placeholder="Search by event location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div id="events" className="flex-col my-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={"Event ID: " + event.id}
                eventName={event.name}
                eventDescription={event.description}
                eventLocation={event.location}
                eventID={event.id}
              />
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
    );
  }