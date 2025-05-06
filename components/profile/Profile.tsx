"use client";
import { useSession } from "next-auth/react";

const Profile = () => {
    const { data: session } = useSession();

    if (!session) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Добро пожаловать, {session.user.firstName} {session.user.lastName}</h1>
            <p>Роль: {session.user.role}</p>
            <p>Email: {session.user.email}</p>
            <p>Телефон: {session.user.phone}</p>
        </div>
    );
};

export default Profile;
