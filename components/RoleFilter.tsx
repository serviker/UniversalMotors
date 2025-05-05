// components/RoleFilter
import { useState } from "react";

const roleFilters = {
    all: "Все пользователи",
    users: "Пользователи",
    managers: "Менеджеры",
    storekeepers: "Кладовщики",
    admins: "Админы",

};

interface RoleFilterProps {
    onRoleChange: (role: keyof typeof roleFilters) => void;
}

export default function RoleFilter({ onRoleChange }: RoleFilterProps) {
    const [roleFilter, setRoleFilter] = useState<keyof typeof roleFilters>("users");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value as keyof typeof roleFilters;
        setRoleFilter(newRole);
        onRoleChange(newRole);
    };

    return (
        <div>
            <label htmlFor="roleSelect" style={{ marginRight: "10px", fontSize: "24px"}}>Выберите роль:</label>
            <select
                id="roleSelect"
                value={roleFilter}
                onChange={handleChange}
                style={{ padding: "5px" }}
            >
                {Object.entries(roleFilters).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>
        </div>
    );
}
