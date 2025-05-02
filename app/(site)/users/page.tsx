// /app/users/page.tsx
// import UsersList from "@/components/UsersList";
//
// export default function UsersPage() {
//     return (
//         <div>
//             <UsersList roleFilter="users"/>
//         </div>
//     );
// }
'use client'

import { useState } from "react";
import UsersList from "@/components/UsersList";
import RoleFilter from "@/components/RoleFilter";

export default function UsersPage() {
    const [roleFilter, setRoleFilter] = useState<"users" | "managers" | "storekeepers" | "admins">("users");

    return (
        <div style={{ padding: "20px" }}>
            {/* Используем общий компонент фильтрации */}
            <RoleFilter onRoleChange={setRoleFilter} />
            <UsersList roleFilter={roleFilter} />
        </div>
    );
}

