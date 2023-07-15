"use client";
import { useState, useEffect } from 'react';

export default function EventCard({ eventName, eventDescription, eventLocation, eventID }: { eventName: string, eventDescription: string | null, eventLocation: string | null, eventID: string }) {
    return (
      <a href={"experiences/" + eventID}>
      <div className="flex-none bg-blue-600 rounded-lg border-blue-200 border-2 px-4 mr-2 text-center">
        <h1>{eventName}</h1>
        <p>{eventDescription}</p>
        <p>{eventLocation}</p>
      </div>
      </a>
    );
  }