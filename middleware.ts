import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// 🔧 Middleware — вызывается при каждом запросе к приложению
export async function middleware(req: NextRequest) {
  // 🔑 Получаем токен авторизации (если есть) из cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token; // проверка авторизован ли пользователь
  const { pathname } = req.nextUrl; // получаем путь текущего запроса

  // 🟡 Страницы для авторизации и регистрации
  const isAuthPages = pathname === "/login" || pathname === "/register";

  // 📌 Определяем маршруты, доступные только для определённых ролей
  const roleAccessMap: Record<string, string[]> = {
    admin: ["/seo", "/users"],
    manager: ["/users"],
    warehouse: ["/warehouse"],
  };

  // 🔁 Если юзер не авторизован и пытается зайти не на /login или /register — редиректим на /login
  if (!isAuth && !isAuthPages) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔄 Если юзер авторизован, но пытается зайти на /login или /register — редиректим на главную
  if (isAuth && isAuthPages) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🛡 Проверка прав доступа по ролям
  const role = token?.role;

  // ✅ Проверяем, есть ли у роли доступ к текущему маршруту
  const hasAccess = Object.entries(roleAccessMap).some(
      ([allowedRole, paths]) => role === allowedRole && paths.includes(pathname)
  );

  // 🔐 Проверка, является ли маршрут защищённым
  const isProtectedPath = Object.values(roleAccessMap).flat().includes(pathname);

  // ❌ Если маршрут защищён, но у юзера нет доступа — возвращаем 404 через rewrite
  if (isProtectedPath && !hasAccess) {
    return NextResponse.rewrite(new URL("/auth-blocked", req.url));
  }

  // ✅ Всё в порядке — пропускаем запрос дальше
  return NextResponse.next();
}

// ⚙️ Конфигурация middleware: игнорируем API и статические файлы
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)',
  ],
};
