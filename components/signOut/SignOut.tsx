// src/components/SignOut.tsx
'use client'
import { signOut } from "next-auth/react";
import { useState } from "react";
import styles from "@/components/signOut/SignOut.module.css"; // локальные стили

export default function SignOut() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSignOut = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await signOut({ callbackUrl: 'http://localhost:5000/dashboard' });
            setSuccess("Вы успешно вышли из системы");
        } catch (error) {
            setError("Ошибка при выходе из системы");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.title}>Выход из системы</h2>
                <p className={styles.description}>Вы уверены, что хотите выйти?</p>
                <button
                    className={styles.button}
                    onClick={handleSignOut}
                    disabled={loading}
                >
                    {loading ? "Загрузка..." : "Выйти"}
                </button>
                {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
                {success && <p className={`${styles.message} ${styles.success}`}>{success}</p>}
            </div>
        </div>
    );
}
