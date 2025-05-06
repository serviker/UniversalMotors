import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectToDatabase } from "@lib/mongodb";
// import User from "@models/User";
// import bcrypt from "bcryptjs";
//
// const handler = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 // Подключение к базе и поиск пользователя
//                 await connectToDatabase();
//                 const user = await User.findOne({ email: credentials?.email });
//                 if (!user || !bcrypt.compareSync(credentials?.password || "", user.password)) {
//                     throw new Error("Invalid email or password");
//                 }
//
//                 return {
//                     id: user._id.toString(),
//                     firstName: user.firstName,
//                     lastName: user.lastName,
//                     email: user.email,
//                     role: user.role,
//                 };
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 token.firstName = user.firstName;
//                 token.lastName = user.lastName;
//                 token.email = user.email;
//                 token.role = user.role;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (session.user) {
//                 session.user.id = token.id;
//                 session.user.firstName = token.firstName;
//                 session.user.lastName = token.lastName;
//                 session.user.email = token.email;
//                 session.user.role = token.role;
//             }
//             return session;
//         },
//     },
//
//     session: {
//         strategy: "jwt",
//         maxAge: 60 * 60 * 24 * 7, // 7 дней (в секундах)
//     },
//
//     jwt: {
//         maxAge: 60 * 60 * 24 * 7, // 7 дней
//     },
//
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/login", // Указываем страницу входа
//     },
// });
//
// export { handler as GET, handler as POST };
