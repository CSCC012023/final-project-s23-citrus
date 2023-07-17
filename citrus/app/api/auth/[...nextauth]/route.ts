import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import * as db from '@/lib/db';

const prisma = db.getClient();

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: 'user-credentials',
            name: 'User Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(process.env.BASE_API_URL + "api/auth/user", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (res.ok) {
                    return user
                }
                throw new Error(user?.message ?? "Something went wrong")
            }
        }),
        CredentialsProvider({
            id: 'organization-credentials',
            name: 'Organization Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@email.com" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(process.env.BASE_API_URL + "api/auth/organization", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if (res.ok) {
                    return user
                }
                throw new Error(user?.message ?? "Something went wrong")
            }
        })
    ],
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            if (user) {
                token.userType = user.userType
            }
            return token
        },
        async session({session, token }) {
            if (token && session.user) {
                session.user.userType = token.userType
            }
            return session
        }
    }

}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
