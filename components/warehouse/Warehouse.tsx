"use client";
import { useSession } from "next-auth/react";

const Warehouse = () => {
    const { data: session } = useSession();

    if (!session) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1> Добро пожаловать на Склад</h1>
            <p>{session.user.role}, {session.user.firstName} {session.user.lastName}</p>
            <p>Email: {session.user.email}</p>
            <p>Телефон: {session.user.phone}</p>
        </div>
    );
};

export default Warehouse;