import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("http://localhost:3000/api/auth/user", {
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
})

export { handler as GET, handler as POST }