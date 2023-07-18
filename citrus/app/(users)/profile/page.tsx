// App.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useState, useEffect } from 'react';
import UserProfileServer from './UserProfileServer';
import UserProfileClient from './UserProfileClient';

export default async function Page() {

    const session = await getServerSession(authOptions);
    if (!session)
        return <p>You&apos;re not signed in.</p>;

    return (
        <div> 
            {/* @ts-expect-error Server Component */}
            <UserProfileServer/>
            {/* @ts-expect-error Server Component */}
            <UserProfileClient/>
        </div>
    )
}