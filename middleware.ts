// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
//
// export default withAuth(
//   function middleware(req) {
//     // Можно добавить кастомную логику, если нужно
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         // если токен есть — пользователь авторизован
//         return !!token;
//       },
//     },
//     pages: {
//       signIn: "/login", // страница, куда будет редиректить неавторизованных
//     },
//   }
// );
//
// // Укажи какие пути нужно защищать
// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"], // любые защищённые маршруты
// };

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname === "/login";

  // 1. Неавторизован — редирект на /login
  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Авторизован и пытается зайти на /login — редирект на /
  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)',
  ],
};


