import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from '@/components/login/LoginForm.module.css';
import Link from "next/link";
import Image from 'next/image';

export default function LoginForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (res?.error) {
            setError(res.error);
        } else {
            router.push("/"); // Перенаправляем пользователя на страницу после входа
        }

        setLoading(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Image src="/logo.png"
                       alt="Logo"
                       className={styles.logo}
                       width={250}
                       height={110}
                />

                {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Введите Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Введите Пароль"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Вход...' : 'Войти'}
                    </button>
                </form>

                <div className={styles.link}>
                    <p className={styles.loginName}>
                        Если вы не зарегистрированы <Link href="/register">Зарегистрироваться</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
