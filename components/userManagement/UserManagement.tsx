// components/userManagement/UserManagement.tsx
"use client";

import { useSession } from "next-auth/react";
import UsersList from "../usersList/UsersList";
import RoleFilter from "../roleFilter/RoleFilter";
import { useState, useEffect } from "react";
import { UserManagementProps } from "./UserManagement.props"; // исправим импорт

export default function UserManagement({ userRole }: UserManagementProps) {
    const { data: session, status } = useSession();

    const [roleFilter, setRoleFilter] = useState<"users" | "managers" | "storekeepers" | "admins" | "all">("users");

    useEffect(() => {
        console.log("🧪 Статус сессии:", status);
        console.log("🧪 session:", session);
        console.log("🧪 userRole from props:", userRole);
    }, [session, status, userRole]); // добавляем userRole в зависимости

    if (status === "loading") {
        return <p>Загрузка сессии...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <p>Роль из пропсов: {userRole}</p>
            <RoleFilter onRoleChange={setRoleFilter} />
            <UsersList roleFilter={roleFilter} userRole={userRole} />
        </div>
    );
}
