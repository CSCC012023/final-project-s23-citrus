"use client";
import React, { useState, useEffect, useReducer } from 'react';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import type { experiences } from '@prisma/client';
import { useSession } from 'next-auth/react';
import EventCard from '@/components/EventCard';
import InfiniteScroll from 'react-infinite-scroll-component';

function buildAPISearchParams(searchParams: ReadonlyURLSearchParams, basePathName: string) {
  var apiPathName = basePathName
  const params = new URLSearchParams(Array.from(searchParams.entries()));
  if (params.size > 0)
    apiPathName += '?' + params.toString();
  return apiPathName;
}

function buildLinkSearchParams(params: {search: string, location: string}) {
  var linkSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== '')
      linkSearchParams.append(key, value);
  }
  if (linkSearchParams.toString() !== '') {
    return '?' + linkSearchParams.toString();
  }
  return linkSearchParams;
}

export default function EventCardHolder() {
  const { data: session } = useSession();
  const route = usePathname();
  const searchParams = useSearchParams();

  var basePathName = '';
  if (route.includes('organizer') && session?.user) {
    if (session?.user) {
      basePathName = '/api/organizers/' + session.user.name + '?includeExperience=true';
    }
  } else {
    basePathName = '/api/experiences';
  }

  basePathName = buildAPISearchParams(searchParams, basePathName);

  const [apiPathName, setApiPathName] = useState(basePathName);
  const [events, setEvents] = useState<experiences[]>([]);
  const [nextSearchName, setNextSearchName] = useState(searchParams.get('search') || '');
  const [nextSearchLocation, setNextSearchLocation] = useState(searchParams.get('location') || '');
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  useEffect(() => {
    if ((session?.user && route.includes('organizer')) || route.includes('experiences')) {
      fetch(apiPathName)
        .then(res => res.json())
        .then(data => {
          setEvents(events => [...events, ...data.experiences]);
          setNextCursor(data.next_cursor);
        })
    };
  }, [apiPathName]);

  if (!session?.user && route.includes('organizer')) {
    return (
      <div className="w-9/12 m-auto">
        <h1 className="text-5xl font-bold mb-4">You are not logged in.</h1>
      </div>
    )
  }

  const fetchMoreEvents = () => {
    if (basePathName.includes('?')) {
      setApiPathName(basePathName + '&next_cursor=' + nextCursor);
    } else {
      setApiPathName(basePathName + '?next_cursor=' + nextCursor);
    }
  }

  return (
    <div className="w-9/12 m-auto">
      <h1 className="text-5xl font-bold mb-4">Events</h1>
      <div className="my-5">
        <input
          type="text"
          placeholder="Search by event name"
          value={nextSearchName}
          onChange={(e) => setNextSearchName(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black"
        />
        <input
          type="text"
          placeholder="Search by event location"
          value={nextSearchLocation}
          onChange={(e) => setNextSearchLocation(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black"
        />
        <a href={'/experiences' + buildLinkSearchParams({search: nextSearchName, location: nextSearchLocation})}>
        <button onClick={() => {
        }}>SWAG BUTTON</button>
        </a>
      </div>
      <div id="events" className="flex-col my-5">
        <InfiniteScroll
          dataLength={events.length}
          next={(route.includes('organizer') ? () => { } : fetchMoreEvents)}
          hasMore={(route.includes('organizer') || nextCursor == null) ? false : true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>End of events</b>
            </p>
          }
        >
          {events.map((event) => (
            <EventCard
              eventName={event.name}
              eventDescription={event.description}
              eventLocation={event.location}
              eventID={event.id}
              key={event.id}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
