// lib/types/next-auth/index.d.ts
// import { IUser } from '../models/User'; // Импортируем ваш интерфейс IUser
//
// declare module 'next-auth' {
//     interface User extends IUser {} // Расширяем тип User с интерфейсом IUser
// }

// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            role?: string;
            firstName?: string;
            lastName?: string;
            phone?: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        role?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        role?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
    }
}
