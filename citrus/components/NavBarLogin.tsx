"use client";
import { useSession, signIn, signOut } from 'next-auth/react'

export default function NavBarLogin() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <li>
                <button onClick={() => signIn(undefined, {callbackUrl: "http://localhost:3000/"})}>Log in</button>
            </li>
        )
    } else {
        return (
            <li>
                <button onClick={() => signOut()} >Hi, {session.user?.name}</button>
            </li>
        )
    }

}