"use client";
import { usePathname } from "next/navigation";

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

function ManagementTools({ eventID }: { eventID: string }) {
  return (
    <div className="flex flex-row">
      <a href={"experiences/" + eventID + "/edit"}>
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

export default function EventCard({ eventName, eventDescription, eventLocation, eventID }: { eventName: string, eventDescription: string | null, eventLocation: string | null, eventID: string }) {
  const path = usePathname();
  return (
    <div className="flex-none bg-blue-600 rounded-lg border-blue-200 border-2 px-4 mr-2 text-center">
      <a href={"experiences/" + eventID}>
        <h1>{eventName}</h1>
        <p>{eventDescription}</p>
        <p>{eventLocation}</p>
      </a>
      <div className="justify-center flex">
        {path.includes("organizer") ? <ManagementTools eventID={eventID} /> : null}
      </div>
    </div>
  );
}
