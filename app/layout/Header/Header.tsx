"use client";

// app/layout/Header.tsx
import { IHeaderProps } from "./Header.props";
import {JSX, useEffect} from "react";
import Logo from '../../../public/logo.svg';
import { TopMenu } from "@/components/topMenu/TopMenu";
import BottomMenu from "@/components/bottomMenu/BottomMenu";
import styles from './Header.module.css';
import {useSession} from "next-auth/react";

export const Header = ({ ...props }: IHeaderProps): JSX.Element => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            console.log("Пользователь вошел:", session.user);
        }
    }, [status]);

    if (status === "loading") {
        return <p className="text-center mt-10">Загрузка...</p>;
    }

    return (
        <header className={styles.header} {...props}>
            {/* Верхнее меню */}
            <div className={styles.topMenuWrapper}>
                <TopMenu />
            </div>

            {/* Логотип + соцсети */}
            <div className={styles.logoHeaderWrapper}>
                <BottomMenu />
            </div>
        </header>
    );
};
