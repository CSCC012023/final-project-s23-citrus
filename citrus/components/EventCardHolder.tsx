"use client";
import React, { useState, useEffect } from 'react';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import type { experiences } from '@prisma/client';
import { useSession } from 'next-auth/react';
import EventCard from '@/components/EventCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";


function buildAPISearchParams(searchParams: ReadonlyURLSearchParams, basePathName: string) {
  var apiPathName = basePathName
  const params = new URLSearchParams(Array.from(searchParams.entries()));
  if (params.size > 0 && !apiPathName.includes('?')) {
    apiPathName += '?' + params.toString();
  } else if (params.size > 0) {
    apiPathName += '&' + params.toString();
  }
  return apiPathName;
}

function buildLinkSearchParams(params: {search: string, location: string, start_time: string}) {
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

// export const formatUTC = (dateInt: string, addOffset = false) => {
//   let date = (!dateInt || dateInt.length < 1) ? new Date : new Date(dateInt);
//   if (typeof dateInt === "string") {
//       return date;
//   } else {
//       const offset = addOffset ? date.getTimezoneOffset() : -(date.getTimezoneOffset());
//       const offsetDate = new Date();
//       offsetDate.setTime(date.getTime() + offset * 60000)
//       return offsetDate;
//   }
// }



function convertDateToISO(date: Date) {
  return date.toISOString().split('T')[0];
}


export default function EventCardHolder() {
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState(new Date());
  const route = usePathname();
  const searchParams = useSearchParams();

  //////////////////////////
  function correctToUtcThenSet(val: Date) {
    setStartDate(new Date(val.getTime() - val.getTimezoneOffset() * 60000))
  }

  var basePathName = '';
  if (route.includes('organizer') && session?.user) {
    if (session?.user) {
      basePathName = '/api/experiences?org_id=' + session.user.name;
    }
  } else {
    basePathName = '/api/experiences';
  }

  basePathName = buildAPISearchParams(searchParams, basePathName);

  const convertedDate = convertDateToISO(startDate);


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
    <div id="contents" className="w-9/12 mx-auto my-auto">
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
        <DatePicker
          // selected={startDate}
          // onChange={(date) => date && setStartDate(date)}
          onChange={correctToUtcThenSet}
          selected={startDate}
          />
        <a href={(route.includes('organizer') ? 'dashboard' : 'experiences') + buildLinkSearchParams({search: nextSearchName, location: nextSearchLocation, start_time: convertedDate})}>
        <button className='mr-2 px-4 py-2 bg-blue-600'>Search</button>
        </a>
      </div>
      <div id="events" className="flex-col">
        <InfiniteScroll
          dataLength={events.length}
          next={fetchMoreEvents}
          hasMore={(nextCursor == null) ? false : true}
          loader={<h4>Loading...</h4>}
          height={600}
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
