// UserManagement.tsx

"use client";

import { useSession } from "next-auth/react";
import UsersList from "./usersList/UsersList";
import RoleFilter from "./RoleFilter";
import { useState, useEffect } from "react";

interface Props {
    userRole: string;
}

export default function UserManagement({ userRole }: Props) {
    const { data: session, status } = useSession();

    const [roleFilter, setRoleFilter] = useState<"users" | "managers" | "storekeepers" | "admins" | "all">("users");

    useEffect(() => {
        console.log("🧪 Статус сессии:", status);
        console.log("🧪 session:", session);
        console.log("🧪 userRole from props:", userRole);
    }, [session, status]);

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
