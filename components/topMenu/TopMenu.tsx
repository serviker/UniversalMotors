"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from '@/components/topMenu/topmenu.module.css';
import SignOut from "@/components/signOut/SignOut";

export const TopMenu = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [showSignOut, setShowSignOut] = useState(false);

    const handleLogout = () => {
        setShowSignOut(true); // Отображаем компонент SignOut
    };

    return (
        <div className={styles.topmenu}>
            <ul className={styles.topmenuList}>
                <li><Link href="/#">Главная</Link></li>
                <li><Link href="/#about">О компании</Link></li>
                <li><Link href="/#news">Новости</Link></li>
                <li><Link href="/#payment">Оплата</Link></li>
                <li><Link href="/#credit">Кредит</Link></li>
                <li><Link href="/#delivery">Доставка</Link></li>
                <li><Link href="/#pawnshop">Мото-Ломбард</Link></li>
                <li><Link href="/#school">Школа</Link></li>
                {/*<li><Link href="/#school">Франшиза</Link></li>*/}
                <li><Link href="/#service">Ремонт</Link></li>
                <li><Link href="/#contacts">Контакты</Link></li>
                <li><Link href="/#rental">Аренда и прокат</Link></li>
            </ul>

            <div className={styles.topmenuButtons}>
                {status === "authenticated" ? (
                    <button onClick={handleLogout} className={styles.topmenuButton}>
                        Выйти
                    </button>
                ) : (
                    <>
                        <button onClick={() => router.push("/login")} className={styles.topmenuButton}>
                            Вход
                        </button>
                    </>
                )}
            </div>
            {showSignOut && <SignOut />}
        </div>

    );
};
