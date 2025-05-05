import { Button } from "react-bootstrap";

import Link from 'next/link'
import React from "react";
import {usePathname} from "next/navigation";

const MenuButton = () => {

    const pathname = usePathname()

    return (
        <>
            <Link href="/seo" passHref>
                <Button
                    variant={pathname === "/seo/" ? "success" : "outline-success"}
                    style={{ marginTop: '2px', marginRight: '2px' }}
                    disabled={pathname === "/seo/"}
                >
                    Seo Модуль
                </Button>
            </Link>
            <Link href="/seo/google" passHref>
                <Button
                    variant={pathname === "/seo/google/" ? "success" : "outline-success"}
                    style={{ marginTop: '2px', marginRight: '2px' }}
                    disabled={pathname === "/seo/google/"}
                >
                    Analytics/Metrics
                </Button>
            </Link>
        </>
    );
}

export default MenuButton;
