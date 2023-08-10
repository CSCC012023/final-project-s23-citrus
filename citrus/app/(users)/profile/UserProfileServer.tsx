import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useEffect, useState } from 'react';
import '@/lib/patch'

export default async function UserProfileServer(){

    const session = await getServerSession(authOptions);

    if(!session)    return <p>You&apos;re not signed in.</p>
  
    const res = await fetch(process.env.BASE_API_URL + `api/users/${session.user?.name}`); 
    const userData = await res.json();

    if (!userData)    return <p>Loading user data...</p>;

    return (
        <div className="text-2xl">
        <p>Name: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <p>Phone Number: {userData.phone_number}</p>
        <p>Instagram: {userData.instagram}</p>
        <p>Facebook: {userData.facebook}</p>
        <p>Interests: {userData.interests && userData.interests.length > 0 ? userData.interests.join(", ") : ""}</p>
        </div>
    );
}
