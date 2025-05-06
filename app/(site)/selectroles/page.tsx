export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from '@lib/authOptions';
import UserManagement from "@/components/UserManagement";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    const userRole = session?.user?.role ?? "guest";

    console.log("userRole authOptions:", userRole); // проверка

    return (
        <div>
            <h1>Админ-панель</h1>
            <p>Роль пользователя: {userRole}</p>
            <UserManagement userRole={userRole} />
        </div>
    );
}