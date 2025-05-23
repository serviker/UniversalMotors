// components/UserList

'use client'

import { useState } from "react";
import UsersList from "@/components/usersList/UsersList";
import RoleFilter from "@/components/roleFilter/RoleFilter";

export default function UsersPage() {
    const [roleFilter, setRoleFilter] = useState<"users" | "managers" | "storekeepers" | "admins" | "all">("users");

    return (
        <div style={{ padding: "20px" }}>
            {/* Используем общий компонент фильтрации */}
            <RoleFilter onRoleChange={setRoleFilter} />
            <UsersList roleFilter={roleFilter} />
        </div>
    );
}

