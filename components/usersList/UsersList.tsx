"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Добавь
import { UsersListProps, User } from "./UsersList.props";

const roleFilters: Record<"users" | "managers" | "storekeepers" | "admins" | "all", string[]> = {
    users: ["user"],
    managers: ["manager"],
    storekeepers: ["storekeeper"],
    admins: ["admin"],
    all: []
};

const availableRoles = ["user", "manager", "storekeeper", "admin"];

export default function UsersList({ roleFilter }: UsersListProps) {
    const { data: session } = useSession(); // <-- Получаем сессию здесь
    const userRole = session?.user?.role;   // <-- Теперь role точно будет доступен

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/auth/users")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки пользователей");
                return res.json();
            })
            .then((data) => {
                const roles: string[] = roleFilters[roleFilter];
                const filteredUsers = roles.length === 0
                    ? data
                    : data.filter((user: User) => roles.includes(user.role));
                setUsers(filteredUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
                setLoading(false);
            });
    }, [roleFilter]);

    const handleRoleChange = (userId: string, newRole: string) => {
        fetch(`/api/auth/users/${userId}/updateRole`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: newRole }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка изменения роли");
                return res.json();
            })
            .then(() => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === userId ? { ...user, role: newRole } : user
                    )
                );
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    };

    if (loading) return <p>Загрузка пользователей...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    //console.log("userRole:", userRole);

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ color: "black" }}>
                {roleFilter === "users" ? "Список пользователей" : `Список ${roleFilter}`}
            </h2>
            <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid black", color: "white" }}>
                <thead>
                <tr style={{ backgroundColor: "#616161", borderBottom: "2px solid black" }}>
                    <th style={styles.th}>Роль</th>
                    <th style={styles.th}>ФИО</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Телефон</th>
                    <th style={styles.th}>Адрес</th>
                    <th style={styles.th}>Дата регистрации</th>
                    {userRole === "admin" && <th style={styles.th}>Изменить роль</th>}
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id} style={{ borderBottom: "1px solid gray", color: "black" }}>
                        <td style={styles.td}>{user.role}</td>
                        <td style={styles.td}>{user.lastName} {user.firstName} {user.middleName}</td>
                        <td style={styles.td}>{user.email}</td>
                        <td style={styles.td}>{user.phone}</td>
                        <td style={styles.td}>{user.address}</td>
                        <td style={styles.td}>{new Date(user.createdAt).toLocaleDateString("ru-RU")}</td>
                        {userRole === "admin" && (
                            <td style={styles.td}>
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    style={{ padding: "5px", borderRadius: "4px" }}
                                >
                                    {availableRoles.map((role) => (
                                        <option key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    th: { border: "1px solid black", padding: "8px", textAlign: "left" as const },
    td: { border: "1px solid black", padding: "8px" },
};
