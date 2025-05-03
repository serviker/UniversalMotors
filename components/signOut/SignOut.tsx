'use client'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/components/signOut/SignOut.module.css";
import { SignOutProps } from "@/components/signOut/SignOut.props";

export default function SignOut({
                                    callbackUrl = 'http://localhost:3000',
                                    title = 'Выход из системы',
                                    description = 'Вы уверены, что хотите выйти?',
                                    successMessage = 'Вы успешно вышли из системы',
                                    errorMessage = 'Ошибка при выходе из системы'
                                }: SignOutProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const handleSignOut = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await signOut({ callbackUrl });
            setSuccess(successMessage);
        } catch (error) {
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.button}
                        onClick={handleSignOut}
                        disabled={loading}
                    >
                        {loading ? "Загрузка..." : "Выйти"}
                    </button>
                    <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        Отмена
                    </button>
                </div>

                {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
                {success && <p className={`${styles.message} ${styles.success}`}>{success}</p>}
            </div>
        </div>
    );
}
