import {IFooterProps} from "./Footer.props";
import styles from "./Footer.module.css";
import {JSX} from "react";
import cn from "classnames";

export const Footer = ({className, ...props}: IFooterProps): JSX.Element=> {
  return(
      <footer className={cn(className, styles.footer)} {...props}>
          <div className={styles.footerContent}>
              <div className={styles.p}>
                  <p>
                      Представленные на сайте сведения о товарах, включая цены, характеристики,
                      а также информацию о наличии товара и сроках доставки, носят информационный
                      характер и не являются публичной офертой, определяемой положениями статьи 437
                      Гражданского кодекса Российской Федерации. Администрация сайта оставляет за
                      собой право вносить изменения в информацию о товарах в любое время без предварительного уведомления.
                  </p>
                  <p>
                      © 2025 UNIVERSALMOTORS.RU — Продажа мото техники и комплектующих от известных производителей:<br/>
                      Yamaha, Honda, Kawasaki, Aprilia, Vespa, Gilera.
                  </p>
              </div>
          </div>
      </footer>
  )
};