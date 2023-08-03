"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import type { users } from '@prisma/client';
import { useSession } from 'next-auth/react';
import InfiniteScroll from 'react-infinite-scroll-component';
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

export default function ConnectWithPeople() {

  const { data: session } = useSession();
  const searchParams = useSearchParams();
  
  const [users, setUsers] = useState<users[]>([]);
  const [nextSearchName, setNextSearchName] = useState(searchParams.get('search') || '');
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  
  const basePathName = buildAPISearchParams(searchParams, "api/users");
  const [apiPathName, setApiPathName] = useState(basePathName);


  useEffect(() => {
    if (session?.user) {
      fetch(apiPathName)
        .then(res => res.json())
        .then(data => {
          setUsers(users => [...users, ...data.users]);
          setNextCursor(data.next_cursor);
        })
      console.log(apiPathName);
      console.log(users);
    };
  }, [apiPathName]);


  if (!session?.user) {
    return (
      <div className="w-9/12 m-auto">
        <h1 className="text-5xl font-bold mb-4">You are not logged in.</h1>
      </div>
    )
  }

  const fetchMoreUsers = () => {
    if (basePathName.includes('?')) {
      setApiPathName(basePathName + '&next_cursor=' + nextCursor);
    } else {
      setApiPathName(basePathName + '?next_cursor=' + nextCursor);
    }
  };

  
  return (
    <div id="contents" className="w-9/12 mx-auto my-auto">
      <h1 className="text-5xl font-bold mb-4">Connect with People</h1>
      <div className="my-5">
        <input
          type="text"
          placeholder="Search by username"
          value={nextSearchName}
          onChange={(e) => setNextSearchName(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black w-48"
          //ref={searchUsernameRef}
        />
        <a href={`/connect-with-people?search=${nextSearchName}`}>
          <button className='mr-2 px-4 py-2 bg-green-600 text-white rounded'>
            Search
          </button>
        </a>
      </div>

      <div id="people" className="my-5">
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreUsers}
          hasMore={nextCursor !== null}
          loader={<h4>Loading...</h4>}
          height={600}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>End of users</b>
            </p>
          }
        >
          {users.map((user) => (
            <div key={user.username} className="bg-green-600 text-white p-4 mb-4 rounded-md border border-white flex items-center justify-between">
              <div className="flex-1">
                <h3>{user.username}</h3>
                <p>Email: {user.email}</p>
                {/* Render other user information as needed */}
              </div>
              <a href={`/profile/${user.username}`}>
                <button className="px-4 py-2 bg-black text-white rounded">View Profile</button>
              </a>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}