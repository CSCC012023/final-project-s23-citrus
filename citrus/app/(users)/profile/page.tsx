// App.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useState, useEffect } from 'react';
import UserProfileServer from './UserProfileServer';
import UserProfileClient from './UserProfileClient';
import styles from './profile.module.css';

export default async function Page() {

    const session = await getServerSession(authOptions);
    if (!session)
        return <p>You&apos;re not signed in.</p>;

return (
    
    <div className={styles["custom-background"]} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      {/* Big Header */}
      <h1 className="font-extrabold text-6xl">User Profile</h1>

      <div style={{ display: "flex" }}>
        <div className={styles["custom-box"]}>
            {/* @ts-expect-error Server Component */}
          <UserProfileServer />
        </div>
        <div className={styles["custom-box"]}>
          <UserProfileClient />
        </div>
      </div>
    </div>
  );
 }
