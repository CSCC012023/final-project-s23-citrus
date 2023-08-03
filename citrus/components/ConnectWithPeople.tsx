"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const searchUsersByUsername = async (username) => {
  try {
    const response = await fetch(`/api/users?search=${username}`);
    const data = await response.json();
    return data.users;
  } catch (error) {
    throw new Error('Error searching users: ' + error.message);
  }
};

interface User {
  id: number;
  username: string;
  email: string;
  // Add other user properties as needed
}

export default function ConnectWithPeople() {
  const { data: session } = useSession();
  const searchUsernameRef = useRef<HTMLInputElement>(null);

  const [searchUsername, setSearchUsername] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [nextUserCursor, setNextUserCursor] = useState<string | null>(null);

  const handleSearch = async () => {
    const username = searchUsername.trim();
    if (username !== '') {
      try {
        const searchResults = await searchUsersByUsername(username);
        // Filter the search results to only show users whose username starts with the search query
        setSearchResults(searchResults.filter(user => user.username.toLowerCase().startsWith(username.toLowerCase())));
      } catch (error) {
        console.error('Error searching users:', error);
      }
    } else {
      // Clear search results when the search input is empty
      setSearchResults([]);
    }
  };

  const fetchMoreUsers = () => {
    if (nextUserCursor) {
      fetch(`/api/users?next_cursor=${nextUserCursor}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(prevResults => [...prevResults, ...data.users]);
          setNextUserCursor(data.next_cursor);
        });
    }
  };

  return (
    <div id="contents" className="w-9/12 mx-auto my-auto">
      <h1 className="text-5xl font-bold mb-4">Connect with People</h1>
      <div className="my-5">
        <input
          type="text"
          placeholder="Search by username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black w-48"
          ref={searchUsernameRef}
        />
        <button className='mr-2 px-4 py-2 bg-green-600 text-white rounded' onClick={handleSearch}>
          Search
        </button>
      </div>
      <div id="people" className="my-5">
        {searchResults.length > 0 ? (
          <div>
            {searchResults.map((user) => (
              <div key={user.username} className="bg-green-600 text-white p-4 mb-4 rounded-md border border-white flex items-center justify-between">
                <div className="flex-1">
                  <h3>{user.username}</h3>
                  <p>Email: {user.email}</p>
                  {/* Render other user information as needed */}
                </div>
                <button className="px-4 py-2 bg-black text-white rounded">View Profile</button>
              </div>
            ))}
            {nextUserCursor !== null && (
              <InfiniteScroll
                dataLength={searchResults.length}
                next={fetchMoreUsers}
                hasMore={nextUserCursor !== null}
                loader={<h4>Loading...</h4>}
                height={600}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>End of users</b>
                  </p>
                }
              />
            )}
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}