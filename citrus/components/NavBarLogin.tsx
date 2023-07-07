"use client";
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function NavBarLogin() {
    const { data: session } = useSession();
    const path = usePathname();
    const login_path = path.includes('organizer') ? '/organizer/login' : '/login';

    if (!session) {
        return (
            <li>
                <a href={login_path}>Login</a>
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