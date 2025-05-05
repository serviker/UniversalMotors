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
  const { pathname } = req.nextUrl;

  const isAuthPages = pathname === "/login" || pathname === "/register";

  // Страницы, доступные только определённым ролям
  const roleAccessMap: Record<string, string[]> = {
    admin: ["/seo", "/users"],
    manager: ["/users"],
    warehouse: ["/warehouse"],
  };

  if (!isAuth && !isAuthPages) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && isAuthPages) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🔐 Проверка по ролям
  const role = token?.role;

  const hasAccess = Object.entries(roleAccessMap).some(([allowedRole, paths]) =>
      role === allowedRole && paths.includes(pathname)
  );

  const isProtectedPath = Object.values(roleAccessMap).flat().includes(pathname);

  if (isProtectedPath && !hasAccess) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)',
  ],
};



