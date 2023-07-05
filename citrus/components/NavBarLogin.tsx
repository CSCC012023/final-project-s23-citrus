"use client";
import { useSession, signIn, signOut } from 'next-auth/react'

export default function NavBarLogin() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <li>
                <button onClick={() => signIn(undefined, {callbackUrl: "http://localhost:3000/"})}>Not Swag</button>
            </li>
        )
    } else {
        return (
            <li>
                <button onClick={() => signOut()} >Swag</button>
            </li>
        )
    }

}