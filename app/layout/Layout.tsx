"use client";

import { ILayoutProps } from "./Layout.props";
import { Sidebar } from "./Sidebar/Sidebar";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import styles from './Layout.module.css';
import { NavMenu } from "@/components/navMenu/NavMenu";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: ILayoutProps) => {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <div className={`${styles.wrapper} ${!isHome ? styles.noSidebar : ''}`}>
            <Header className={styles.header} />
            <NavMenu className={styles.navMenu} />
            {isHome && <Sidebar className={styles.sidebar} />}
            <div className={styles.body}>{children}</div>
            <Footer className={styles.footer} />
        </div>
    );
};
