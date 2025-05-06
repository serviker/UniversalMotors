import { useState } from "react";
import { roleFilters, RoleFilterProps, RoleKey } from "./RoleFilter.props";

export default function RoleFilter({ onRoleChange }: RoleFilterProps) {
    const [roleFilter, setRoleFilter] = useState<RoleKey>("users");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value as RoleKey;
        setRoleFilter(newRole);
        onRoleChange(newRole);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <label htmlFor="roleSelect" style={{ marginRight: "10px", fontSize: "24px"}}>
                Выберите роль:
            </label>
            <select
                id="roleSelect"
                value={roleFilter}
                onChange={handleChange}
                style={{ padding: "5px" }}
            >
                {Object.entries(roleFilters).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
}
