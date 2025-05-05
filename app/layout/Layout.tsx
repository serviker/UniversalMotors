"use client";

import { ILayoutProps } from "./Layout.props";
import { Sidebar } from "./Sidebar/Sidebar";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import styles from './Layout.module.css';
import {NavMenu} from "@/components/navMenu/NavMenu";

export const Layout = ({ children }: ILayoutProps) => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />
            <NavMenu className={styles.navMenu}/>
            {/*<Sidebar className={styles.sidebar} />*/}
            <div className={styles.body}>{children}</div>
            <Footer className={styles.footer} />
        </div>
    );
};
