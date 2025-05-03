
import styles from "./BottomMenu.module.css"; // Здесь подключаем новый файл стилей
import Image from 'next/image';
import React from "react";
import Link from "next/link";

const BottomMenu = () => {
    return (
        <div className={styles.bottomMenu}>
            {/* Лого и ссылки на главную */}
            <div className={styles.logoSection}>
                <Link href={"/"}>
                    <Image
                        src="/logo.png"
                        width={250}
                        height={81}
                        alt="Логотип сайта"
                    />
                </Link>
            </div>

            {/* Социальные сети и форма поиска */}
            <div className={styles.centerSection}>
                <div className={styles.social}>
                    {/* Ссылки на соц. сети */}
                    <Link href="https://vk.com">
                        <Image
                            src="/social/vk.svg"
                            width={32}
                            height={32}
                            alt="VK"
                        />
                    </Link>
                    <Link href="https://youtube.com">
                        <Image
                            src="/social/youtube.svg"
                            width={32}
                            height={32}
                            alt="YouTube"
                        />
                    </Link>
                    <Link href="https://instagram.com">
                        <Image
                            src="/social/inst.svg"
                            width={32}
                            height={32}
                            alt="Instagram"
                        />
                    </Link>
                    <span className={styles.span}>info@universalmotors.ru</span>
                </div>

                {/* Поиск по сайту */}
                <form className={styles.search}>
                    <button type="submit" className={styles.searchImage}>
                        <Image src="/social/search.svg" alt="Search Icon" width={16}
                               height={16}/>
                    </button>
                    <input type="text" placeholder="Поиск по магазину"  />
                </form>
            </div>

            {/* Контакты */}
            <div className={styles.contact}>
                <span className={styles.spanNumber}>+7 (495) 966-18-86</span>
                <span className={styles.spanNumber}>8 (800) 200-70-82</span>
                <Link href="tel:+74959661886" style={{textDecoration: 'none'}}>
                    <span className={styles.span} style={{textAlign: 'start'}}>Перезвоните мне</span>
                </Link>
            </div>

            {/* Корзина с товарами */}
            <div className={styles.cartSection}>
                {/*<CartPopup />*/}
                <div className={styles.shopCart}>
                    <Image
                        src="/shopping-cart.svg"
                        width={21}
                        height={21}
                        alt="Shopping Cart Icon"
                    />
                    <span className={styles.cartCount}>Карзина (0)</span>
                </div>

                {/* Примерный контент корзины */}
                <div className={styles.cartDetails}>
                    <span className={styles.cartPrice}>товаров 0,</span>
                    <span className={styles.cartPrice}>на сумму 0 ₽</span>
                </div>
                <button className={styles.cartButton}>Оформить</button>
            </div>
        </div>
    );
};

export default BottomMenu;
