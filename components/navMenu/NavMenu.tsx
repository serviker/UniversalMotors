"use client";

import styles from './NavMenu.module.css';
import { NavMenuProps } from './NavMenu.props';
import cn from 'classnames';

export function NavMenu({ className }: NavMenuProps) {
    const pages = [
        { path: '/cars/', title: 'Автомобили' },
        { path: '/scooters/', title: 'Скутеры' },
        { path: '/motorcycles/', title: 'Мотоциклы' },
        { path: '/atvs/', title: 'Квадроциклы' },
        { path: '/bikes/', title: 'Велосипеды' },
        { path: '/snowmobiles/', title: 'Снегоходы' },
        { path: '/boardmotors/', title: 'Лодочные моторы' },
        { path: '/#boats', title: 'Лодки' },
        { path: '/equipment/', title: 'Экипировка' },
        { path: '/clothing/', title: 'Одежда Обувь' },
        { path: '/accessory/', title: 'Аксессуары' },
        { path: '/spares/', title: 'Запчасти' },
        { path: '/gsm/', title: 'ГСМ' },
    ];

    return (
        <nav className={cn(styles.navMenu, className)}>
            {pages.map((page) => (
                <a href={page.path} key={page.path} className={styles.link}>
                    {page.title}
                </a>
            ))}
        </nav>
    );
}
