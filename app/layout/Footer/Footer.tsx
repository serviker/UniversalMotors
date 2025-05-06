import {IFooterProps} from "./Footer.props";
import styles from "./Footer.module.css";
import React, {JSX} from "react";
import cn from "classnames";
import Image from "next/image";

export const Footer = ({className, ...props}: IFooterProps): JSX.Element=> {
  return(
      <footer className={cn(className, styles.footer)} {...props}>
          <div className={styles.footerContent}>
              <div className={styles.footerTop}>
                  <div className={styles.searchWrapper}>
                      <form className={styles.search}>
                          <button type="submit" className={styles.searchImage}>
                              <Image src="/social/search.svg" alt="Search Icon" width={16}
                                     height={16}/>
                          </button>
                          <input type="text" placeholder="Поиск по магазину"  />
                      </form>
                      <div>
                          <span className={styles.spanFirst}>Например: </span>
                          <span className={styles.span}> Велосипед</span>
                      </div>
                  </div>
                  <div className={styles.socWrapper}>
                      <div className={styles.socSeti}>
                          <Image src='/social/vk.svg' alt='vk' width={40} height={40}/>
                          <Image src='/social/youtube.svg' alt='vk' width={40} height={40}/>
                          <Image src='/social/inst.svg' alt='vk' width={40} height={40}/>
                      </div>
                      <span className={styles.spanFirst}>Мы в соц. сетях</span>
                  </div>
              </div>
              <div className={styles.footerColumns}>
                  <div  className={styles.footerFirstColumns}>
                      <h4>О компании</h4>
                          <ul>
                              <li>Арендодателям</li>
                              <li>Благотворительность</li>
                              <li>Корпоративным клиентам</li>
                              <li>Кто мы?</li>
                              <li>Наши предложения</li>
                              <li>Наши преимущества</li>
                              <li>Пресс-центр</li>
                              <li>Социальные проекты</li>
                          </ul>
                  </div>
                  <div>
                      <h4>Интернет-магазин</h4>
                          <ul>
                              <li>Условия продажи</li>
                              <li>Условия возврата</li>
                              <li>Как заказать</li>
                              <li>Как получить скидку</li>
                              <li>Покупка в кредит</li>
                              <li>Оплата</li>
                              <li>Доставка</li>
                          </ul>
                  </div>
                  <div>
                      <h4>Помощь покупателю</h4>
                          <ul>
                              <li>Политика конфиденциальности</li>
                              <li>Адреса сервисных центров</li>
                              <li>Гарантия</li>
                              <li>Обмен, возврат и ремонт</li>
                              <li>Статус ремонта</li>
                          </ul>
                  </div>
                  <div className={styles.footerLastColumns}>
                      <h4>Наши реквизиты:</h4>
                          <ul>
                              <li>ООО «Пси-Депо»</li>
                              <li>ИНН 7715910057</li>
                              <li>КПП 772801001</li>
                              <li>ОГРН 1127746206213</li>
                          </ul>
                  </div>
              </div>
              <div className={styles.bottom}>
                  <div className={styles.p}>
                      <p>
                          Представленные на сайте сведения о товарах, включая цены, характеристики,
                          а также информацию о наличии товара и сроках доставки, носят информационный
                          характер и не являются публичной офертой, определяемой положениями статьи 437
                          Гражданского кодекса Российской Федерации. Администрация сайта оставляет за
                          собой право вносить изменения в информацию о товарах в любое время без предварительного уведомления.
                      </p>
                  </div>
                  <div className={styles.play}>
                      <p>
                          © 2025 UNIVERSALMOTORS.RU — Продажа мото техники и комплектующих от известных производителей:<br/>
                          Yamaha, Honda, Kawasaki, Aprilia, Vespa, Gilera.
                      </p>
                      <Image src="/playImages.jpg"
                             alt="Logo"
                             className={styles.logo}
                             width={250}
                             height={35}
                      />
                  </div>
              </div>
          </div>
      </footer>
  )
};