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

function buildLinkSearchParams(params: {search: string, location: string, start_time: string, end_time: string}) {
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


function convertDateToISO(date: Date) {
  return date.toISOString().split('T')[0];
}


export default function EventCardHolder() {
  const { data: session } = useSession();
  const route = usePathname();
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = useState(new Date(searchParams.get('start_time') || Date.now()));
  const [endDate, setEndDate] = useState(new Date(searchParams.get('end_time') || Date.now()));

  function correctToUtcThenSetStart(val: Date) {
    setStartDate(new Date(val.getTime() - val.getTimezoneOffset() * 60000))
  }


  function removeTimezoneOffset(date: Date, param: string) {

    if (searchParams.get(param) != null) {
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      date = new Date(date.getTime() + userTimezoneOffset * Math.sign(userTimezoneOffset));
      param === 'start_time' ? setStartDate(date) : setEndDate(date);
    }
  }
  
  var basePathName = '';
  var link = '';
  if (route.includes('organizer') && session?.user) {
    if (session?.user) {
      basePathName = '/api/experiences?org_id=' + session.user.name;
      link = 'dashboard';
    }
  }
  else if(session?.user && route.includes('user')){
    if (session?.user) {
      //basePathName = '/api/experiences?current_user_id=' + session.user.name;
      basePathName = '/api/statuses';
      link = 'user';
    }
  } 
  else {
    basePathName = '/api/experiences';
    link = 'experiences';
  }

  basePathName = buildAPISearchParams(searchParams, basePathName);

  const convertedStartDate = convertDateToISO(startDate);
  const convertedEndDate = convertDateToISO(endDate);


  const [apiPathName, setApiPathName] = useState(basePathName);
  const [events, setEvents] = useState<experiences[]>([]);
  const [nextSearchName, setNextSearchName] = useState(searchParams.get('search') || '');
  const [nextSearchLocation, setNextSearchLocation] = useState(searchParams.get('location') || '');
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  
  

  

  useEffect(() => {
    if ((session?.user && (route.includes('organizer')) || route.includes('experiences') || route.includes('user'))) {
      fetch(apiPathName)
        .then(res => res.json())
        .then(data => {
          setEvents(events => [...events, ...data.experiences]);
          setNextCursor(data.next_cursor);
        })
    };
  }, [apiPathName]);

  useEffect(() => {
    removeTimezoneOffset(startDate, 'start_time');
    removeTimezoneOffset(endDate, 'end_time');
  }, []);

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
      <div className="text-black">
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
        &nbsp;&nbsp;&nbsp;&nbsp;
        <DatePicker
          onChange={correctToUtcThenSetStart}
          selected={startDate}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <DatePicker
          onChange={(date) => date && setEndDate(date)}
          selected={endDate}
          />
        
        <a href={link + buildLinkSearchParams({search: nextSearchName, location: nextSearchLocation, start_time: convertedStartDate, end_time: convertedEndDate})}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
              eventUserID={event.user_id}
              key={event.id}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}