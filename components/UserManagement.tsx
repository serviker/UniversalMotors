// components/UserManagement
"use client";

import { useState } from "react";
import UsersList from "./UsersList";
import RoleFilter from "./RoleFilter";

export default function UserManagement() {
    const [roleFilter, setRoleFilter] = useState<"users" | "managers" | "storekeepers" | "admins" | "all" >("users");

    return (
        <div style={{ padding: "20px"}}>

            {/* Используем новый компонент для фильтрации */}
            <RoleFilter onRoleChange={setRoleFilter} />

            {/* Отображение списка пользователей */}
            <UsersList roleFilter={roleFilter} />
        </div>
    );
}
