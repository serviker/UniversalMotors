// app/(auth)/api/auth/[nextauth]/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@lib/mongodb";
import User from "@models/User";
import bcrypt from "bcryptjs";
import type { AuthOptions } from "next-auth";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Email and password are required");
                }
                await connectToDatabase();
                const user = await User.findOne({ email: credentials?.email });
                if (!user || !bcrypt.compareSync(credentials?.password || "", user.password)) {
                    throw new Error("Invalid email or password");
                }
                return {
                    id: user._id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    phone: user.phone,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                Object.assign(token, {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    phone: user.phone,
                });
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                Object.assign(session.user, {
                    id: token.id,
                    email: token.email,
                    firstName: token.firstName,
                    lastName: token.lastName,
                    role: token.role,
                    phone: token.phone,
                });
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },

    jwt: {
        maxAge: 60 * 60 * 24 * 7,
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login",
    },
};
