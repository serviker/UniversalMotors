"use client";

import { useState, useEffect } from "react";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    createdAt: string;
}

const roleFilters = {
    users: ["user"],
    managers: ["manager"],
    storekeepers: ["storekeeper"],
    admins: ["admin"]
};

export default function UsersList({ roleFilter }: { roleFilter: keyof typeof roleFilters }) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/auth/users")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Ошибка загрузки пользователей");
                }
                return res.json();
            })
            .then((data) => {
                const filteredUsers = data.filter((user: User) => roleFilters[roleFilter].includes(user.role));
                setUsers(filteredUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
                setLoading(false);
            });
    }, [roleFilter]);

    if (loading) return <p>Загрузка пользователей...</p>;
    if (error) return <p>Ошибка: {error}</p>;

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
