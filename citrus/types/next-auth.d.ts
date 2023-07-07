import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";
import NextAuth from "next-auth";
import { DefaultContext } from "react-icons";

declare module "next-auth" {

    interface User {
        userType: string;
        [...DefaultUser];
    };

    interface Session {
        user?: User;
    };

}

declare module "next-auth/jwt" {
    interface JWT {
        userType: string;
        [...DefaultJWT];
    }
}