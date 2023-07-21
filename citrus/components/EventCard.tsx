"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function deleteOnClick(eventID: string) {
  if (window.confirm("Are you sure you want to delete this event?")) {
    fetch("/api/experiences/" + eventID, {
      method: "DELETE"
    }).then((res) => {
      window.location.reload();
    });
  } else {
    return;
  }
}

function ManagementTools({ eventID, isUser }: { eventID: string, isUser: boolean }) {
  const manageLink = (isUser) ? "/edit/" + eventID : "/organizer/dashboard" + eventID;
  return (
    <div className="flex flex-row">
      <a href={manageLink}>
        <button className="bg-violet-600 rounded-lg border-blue-200 border-2 px-4 mr-2 text-center">
          Edit
        </button>
      </a>
      <button onClick={() => deleteOnClick(eventID)} className="bg-red-600 rounded-lg border-blue-200 border-2 px-4 mr-2 text-center">
        Delete
      </button>
    </div>
  )
}

export default function EventCard({ eventName, eventDescription, eventLocation, eventID, eventUserID }:
  { eventName: string, eventDescription: string | null, eventLocation: string | null, eventID: string, eventUserID: string | null }) {
  const path = usePathname();
  const { data: session } = useSession();
  return (
    <div className="flex-none bg-blue-600 rounded-lg border-blue-200 border-2 px-4 mr-2 text-center">
      <a href={"experiences/" + eventID}>
        <h1>{eventName}</h1>
        <p>{eventDescription}</p>
        <p>{eventLocation}</p>
      </a>
      <div className="justify-center flex">
        {(path.includes("organizer") || (session?.user && session.user.name === eventUserID && path.endsWith('user'))) ? <ManagementTools eventID={eventID} isUser={eventUserID !== null} /> : null}
      </div>
    </div>
  );
}
