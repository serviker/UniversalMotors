"use client"

import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Button, Badge, Col, Form} from "react-bootstrap";
import styles from "./seo.module.css"
import Row from "react-bootstrap/Row";
import SitemapAll from "./siteMapTotalLinks";
import SitemapAllE from "./siteMapTotalLinksE";
import SitemapAllD from "./siteMapTotalLinksD";
import PageError from "./pageError";
import MetaError from "./metaTag";
import MetaErrorT from "./metaTagDT";
import MetaErrorD from "./metaTagDD";
import MetaErrorK from "./metaTagDK";
import PageN from "./paheN";
import TextCart from  "./textcart";
import TextCat from "./textcat";
import TextM from "./textM";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuButton from "./component/menuButton";
import Buttontable from "./component/buttontable/buttontable";
import ImgA from "./img/imgA";
import ImgT from "./img/imgT";
import ImgAd from "./img/imgAd";
import ImgTd from "./img/imgTd";
import Time from "./data/time";
import ImgData from "./img/imgdatasrc";
import OgTitle from "./og/ogTitle";



function Seo2() {

    const [dataImg, setDataImg] = useState({
        imgAlt:0,
        imgTitle:0,
        duplicateAlt:0,
        duplicateTitle:0,
        datasrc:0
    })


    const [data, setData] = useState({
        totalLink: 0,
        updateLink: 0,
        totalMeta: 0,
        totalErr: 0,
        titleDubl: 0,
        siteMapLinks:0,
        siteMapLinksErr:0,
        SiteMapTotalLinksD: 0,
        duplicateMetaDescription: 0,
        duplicateMetaKeywords: 0,
        pageN:0,
        textc:0,
        textd:0,
        textm:0,
        time: "---",
        datasrc:0

    });

    const [dataOG, setDataOG] = useState({
        ogTitle: 0,
        ogDescription: 0,
        ogKeywords: 0,
        ogImg: 0,
        ogTitleDupl: 0,
        ogDescriptionDupl: 0,
        ogKeywordsDupl: 0,
        ogImgDupl: 0

    });
    const [showComponent, setShowComponent] = useState({
        time: true,
        showSitemapAll: false,
        showSitemapAllE: false,
        showSitemapAllD: false,
        pageErorr: false,
        meta: false,
        metaT: false,
        metaD: false,
        metaK: false,
        pageN: false,
        textC: false,
        textD: false,
        textM: false,
        imgA: false,
        imgT: false,
        imgAd: false,
        imgTd: false,
        datasrc: false,
        ogTitle: false,
        ogDescription: false,
        ogKeywords: false,
        ogImg: false,
        ogTitleDupl: false,
        ogDescriptionDupl: false,
        ogKeywordsDupl: false,
        ogImgDupl: false
    });

    const [buttonStyles, setButtonStyles] = useState({
        all: 'danger',
        e: 'primary',
        d: 'primary',
        pe: 'primary',
        meta: 'primary',
        metaT: 'primary',
        metaD: 'primary',
        metaK: 'primary',
        n: 'primary',
        textC: 'primary',
        textD: 'primary',
        textM: 'primary',
        imgA: 'primary',
        imgT: 'primary',
        imgAd: 'primary',
        imgTd: 'primary',
        time: 'primary',
        datasrc: 'primary',
        ogTitle: 'primary',
        ogDescription: 'primary',
        ogKeywords: 'primary',
        ogImg: 'primary',
        ogTitleDupl: 'primary',
        ogDescriptionDupl: 'primary',
        ogKeywordsDupl: 'primary',
        ogImgDupl: 'primary'
    });

    const [selectedCategory, setSelectedCategory] = useState('');
    const [showButtons, setShowButtons] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    // Функция для получения данных с сервера
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://185.25.10.105:5002/seo${selectedCategory ? `?category=${selectedCategory}` : ''}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);

                const url2 = `http://185.25.10.105:5002/img`;
                const response2 = await fetch(url2);
                if (!response2.ok) {
                    throw new Error('Network response was not ok');
                }
                const result2 = await response2.json();
                setDataImg(result2);

                const url3 = `http://185.25.10.105:5002/og`;
                const response3 = await fetch(url3);
                if (!response3.ok) {
                    throw new Error('Network response was not ok');
                }
                const result3 = await response3.json();
                console.log(result3)
                setDataOG(result3);
                console.log(dataOG)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const intervalId = setInterval(fetchData, 1100000);
        fetchData();

        return () => {
            clearInterval(intervalId);
        };
    }, [selectedCategory, updateTrigger]); // Массив зависимостей содержит только selectedCategory


    // Вычисление процента
    const now = (data.updateLink / data.totalLink) * 100;
    console.log(now)
    const handleCategoryChange = (event) => {
        if (event.target.value === "default") {
            setSelectedCategory('');
            setShowButtons(false);
        } else {
            setSelectedCategory(event.target.value);
            setShowButtons(true);
        }
    };
    const handleupdate = async () => {
        try {
            setIsButtonDisabled(true); // Отключаем кнопку
            await axios.get(`http://185.25.10.105:5002/seogetlinksdelet`);
            setUpdateTrigger(prev => prev + 1);

            setTimeout(() => {
                setIsButtonDisabled(false); // Включаем кнопку обратно через минуту
            }, 60000);
        } catch (error) {
            console.error('Ошибка при перепроверке ссылки: ', error);
            setIsButtonDisabled(false); // В случае ошибки также включаем кнопку обратно
        }
    };


    const toggleSitemap = (component) => {
        setShowComponent({
            showSitemapAll: component === 'all',
            showSitemapAllE: component === 'e',
            showSitemapAllD: component === 'd',
            pageErorr: component === 'pe',
            meta: component === 'meta',
            metaT: component === 'metaT',
            metaD: component === 'metaD',
            metaK: component === 'metaK',
            pageN: component === 'n',
            textC: component === 'textC',
            textD: component === 'textD',
            textM: component === 'textM',
            imgA: component === 'imgA',
            imgT: component === 'imgT',
            imgAd: component === 'imgAd',
            imgTd: component === 'imgTd',
            time: component === 'time',
            datasrc: component === 'datasrc',
            ogTitle: component === 'ogTitle',
            ogDescription: component === 'ogDescription',
            ogKeywords: component === 'ogKeywords',
            ogImg: component === 'ogImg',
            ogTitleDupl: component === 'ogTitleDupl',
            ogDescriptionDupl: component === 'ogDescriptionDupl',
            ogKeywordsDupl: component === 'ogKeywordsDupl',
            ogImgDupl: component === 'ogImgDupl'
        });

    setButtonStyles({
        all: component === 'all' ? 'danger' : 'primary',
        e: component === 'e' ? 'danger' : 'primary',
        d: component === 'd' ? 'danger' : 'primary',
        pe: component === 'pe' ? 'danger' : 'primary',
        meta: component === 'meta' ? 'danger' : 'primary',
        metaT: component === 'metaT' ? 'danger' : 'primary',
        metaD: component === 'metaD' ? 'danger' : 'primary',
        metaK: component === 'metaK' ? 'danger' : 'primary',
        n: component === 'n' ? 'danger' : 'primary',
        textC: component === 'textC' ? 'danger' : 'primary',
        textD: component === 'textD' ? 'danger' : 'primary',
        textM: component === 'textM' ? 'danger' : 'primary',
        imgA: component === 'imgA' ? 'danger' : 'primary',
        imgT: component === 'imgT' ? 'danger' : 'primary',
        imgAd: component === 'imgAd' ? 'danger' : 'primary',
        imgTd: component === 'imgTd' ? 'danger' : 'primary',
        time: component === 'time' ? 'danger' : 'primary',
        datasrc: component === 'datasrc' ? 'danger' : 'primary',
        ogTitle: component === 'ogTitle' ? 'danger' : 'primary',
        ogDescription: component === 'ogDescription' ? 'danger' : 'primary',
        ogKeywords: component === 'ogKeywords' ? 'danger' : 'primary',
        ogImg: component === 'ogImg' ? 'danger' : 'primary',
        ogTitleDupl: component === 'ogTitleDupl' ? 'danger' : 'primary',
        ogDescriptionDupl: component === 'ogDescriptionDupl' ? 'danger' : 'primary',
        ogKeywordsDupl: component === 'ogKeywordsDupl' ? 'danger' : 'primary',
        ogImgDupl: component === 'ogImgDupl' ? 'danger' : 'primary'
    });


};

    return (

        <div>
            <MenuButton/>
            <ProgressBar animated now={now}
                         label={<span style={{ fontWeight: 'bold', fontSize: '20px',padding: '0px' }}>{`${now.toFixed(2)}%`}</span>}
                         style={{ width: '100%', marginTop: '2px', marginBottom: '2px',height: '30px' }}
            />


            <Row>
                <Col md={2} style={{padding: '0px'}} className={styles.buttonmenu}>
                    <Form.Select aria-label="Default select example" onChange={handleCategoryChange}>
                        <option value="default">Раздел сайта</option>
                        <option value="universalmotors.ru/motorcycles">Мотоциклы</option>
                        <option value="universalmotors.ru/scooters">Скутеры</option>
                        <option value="universalmotors.ru/atvs">Квадроциклы</option>
                        <option value="universalmotors.ru/cars">Автомобили</option>
                        <option value="universalmotors.ru/bikes">Велосипеды</option>
                        <option value="universalmotors.ru/snowmobiles">Снегоходы</option>
                        <option value="universalmotors.ru/boardmotors">Лодочные моторы</option>
                        <option value="universalmotors.ru/boats">Лодки</option>
                        <option value="universalmotors.ru/equipment">Экипировка</option>
                        <option value="universalmotors.ru/clothing">Одежда</option>
                        <option value="universalmotors.ru/accessory">Аксессуары</option>
                        <option value="universalmotors.ru/spares">Запчасти</option>
                        <option value="universalmotors.ru/gsm">Gsm</option>
                        <option value="universalmotors.ru/generators">Генераторы</option>
                        <option value="universalmotors.ru/tools">Инструмент</option>
                        <option value="universalmotors.ru/mototugs">Мотобуксировщики</option>
                        <option value="universalmotors.ru/snowblowers">Снегоуборщики</option>
                    </Form.Select>
                    {showButtons && (
                        <div>
                            <Button variant="primary" size="small" className="button-style mt-1">
                                Пауза - {selectedCategory.split('/').pop()}
                            </Button>
                            <Button variant="primary" size="small" className="button-style mt-1">
                                Перепроверить - {selectedCategory.split('/').pop()}
                            </Button>
                        </div>
                    )}
                   {/* <Button
                        variant={isButtonDisabled || now < 90 ? "secondary" : "dark"}
                        size="small"
                        className="button-style mt-1"
                        onClick={() => handleupdate()}
                        disabled={isButtonDisabled || now < 90}
                    >
                        Перепроверить
                    </Button>*/}

                    <Buttontable  variant={"success"} name={"Всего Ссылок найдено"} badge={data.totalLink.toLocaleString()}/>
                    <Buttontable  variant={"success"} name={"Обработано ссылок"} badge={data.updateLink.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('time')} variant={buttonStyles.time} name={"Дата Проверки"} badge={data.time}/>
                    <Badge bg="warning" text="dark" style={{ width: '100%', marginTop: '2px'}}>Sitemap</Badge>
                    <Buttontable onClick={() => toggleSitemap('all')} variant={buttonStyles.all} name={"Все ссылки"} badge={data.siteMapLinks.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('e')} variant={buttonStyles.e} name={"404 ссылки"} badge={data.siteMapLinksErr.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('d')} variant={buttonStyles.d} name={"Дубликаты"} badge={data.SiteMapTotalLinksD.toLocaleString()}/>
                    <Badge bg="warning" text="dark" style={{ width: '100%', marginTop: '2px'}}>Ошибки страницы</Badge>
                    <Buttontable onClick={() => toggleSitemap('pe')} variant={buttonStyles.pe} name={"Страницы 404"} badge={data.totalErr.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('n')} variant={buttonStyles.n} name={"Пусты страницы"} badge={data.pageN.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('meta')} variant={buttonStyles.meta} name={"Мета теги"} badge={data.totalMeta.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('metaT')} variant={buttonStyles.metaT} name={"Дубли Title"} badge={data.titleDubl.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('metaD')} variant={buttonStyles.metaD} name={"Дубли Description"} badge={data.duplicateMetaDescription.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('metaK')} variant={buttonStyles.metaK} name={"Дубли Keywords"} badge={data.duplicateMetaKeywords.toLocaleString()}/>
                    <Badge bg="warning" text="dark" style={{ width: '100%', marginTop: '2px'}}>Картинки</Badge>
                    <Buttontable onClick={() => toggleSitemap('imgA')} variant={buttonStyles.imgA} name={"Без Alt"} badge={dataImg.imgAlt.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('imgT')} variant={buttonStyles.imgT} name={"Без title"} badge={dataImg.imgTitle.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('datasrc')} variant={buttonStyles.datasrc} name={"Ошибка Src"} badge={dataImg.datasrc.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('imgAd')} variant={buttonStyles.imgAd} name={"Дубли Alt"} badge={dataImg.duplicateAlt.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('imgTd')} variant={buttonStyles.imgTd} name={"Дубли title"} badge={dataImg.duplicateTitle.toLocaleString()}/>
                    <Badge bg="warning" text="dark" style={{ width: '100%', marginTop: '2px'}}>Ошибки Текста</Badge>
                    <Buttontable onClick={() => toggleSitemap('textC')} variant={buttonStyles.textC} name={"Дубли товара"} badge={data.textc.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('textM')} variant={buttonStyles.textM} name={"Дубли малое товар"} badge={data.textm.toLocaleString()}/>
                    <Buttontable onClick={() => toggleSitemap('textD')} variant={buttonStyles.textD} name={"Дубли категории"} badge={data.textd.toLocaleString()}/>
                    <Badge bg="warning" text="dark" style={{ width: '100%', marginTop: '2px' }}>Теги OG</Badge>
                    <Buttontable onClick={() => toggleSitemap('ogTitle')} variant={buttonStyles.ogTitle} name={"Без OG: Title"} badge={dataOG.ogTitle.toLocaleString()} />
                    <Buttontable onClick={() => toggleSitemap('ogDescription')} variant={buttonStyles.ogDescription} name={"Без OG: Description"} badge={dataOG.ogDescription.toLocaleString()} />
                    <Buttontable onClick={() => toggleSitemap('ogKeywords')} variant={buttonStyles.ogKeywords} name={"Без OG: Keywords"} badge={dataOG.ogKeywords.toLocaleString()} />
                    <Buttontable onClick={() => toggleSitemap('ogImg')} variant={buttonStyles.ogImg} name={"Без OG: Img"} badge={dataOG.ogImg.toLocaleString()} />
                    <Buttontable onClick={() => toggleSitemap('ogTitleDupl')} variant={buttonStyles.ogTitleDupl} name={"OG: Title дубли"} badge={dataOG.ogTitleDupl.toLocaleString()} />
                    <Buttontable onClick={() => toggleSitemap('ogDescriptionDupl')} variant={buttonStyles.ogDescriptionDupl} name={"OG: Description дубли"} badge={dataOG.ogDescriptionDupl.toLocaleString()} />
                    <Buttontable onClick={() => toggleSitemap('ogKeywordsDupl')} variant={buttonStyles.ogKeywordsDupl} name={"OG: Keywords дубли"} badge={dataOG.ogKeywordsDupl.toLocaleString()} />
                    <Buttontable onClick={() => toggleSitemap('ogImgDupl')} variant={buttonStyles.ogImgDupl} name={"OG: Img дубли"} badge={dataOG.ogImgDupl.toLocaleString()} />


                </Col>
                <Col md={10} style={{padding: '0px'}}>

                    {showComponent.showSitemapAllD && <SitemapAllD category={selectedCategory} />}
                    {showComponent.showSitemapAll && <SitemapAll category={selectedCategory} />}
                    {showComponent.showSitemapAllE && <SitemapAllE category={selectedCategory} />}
                    {showComponent.pageErorr && <PageError category={selectedCategory} />}
                    {showComponent.pageN && <PageN category={selectedCategory} />}
                    {showComponent.meta && <MetaError category={selectedCategory} />}
                    {showComponent.metaT && <MetaErrorT category={selectedCategory} />}
                    {showComponent.metaD && <MetaErrorD category={selectedCategory} />}
                    {showComponent.metaK && <MetaErrorK category={selectedCategory} />}
                    {showComponent.textC && <TextCart category={selectedCategory} />}
                    {showComponent.textM && <TextM category={selectedCategory} />}
                    {showComponent.textD && <TextCat category={selectedCategory} />}
                    {showComponent.imgA && <ImgA category={selectedCategory}/>}
                    {showComponent.imgT && <ImgT category={selectedCategory}/>}
                    {showComponent.imgAd && <ImgAd category={selectedCategory}/>}
                    {showComponent.imgTd && <ImgTd category={selectedCategory}/>}
                    {showComponent.time && <Time category={selectedCategory}/>}
                    {showComponent.datasrc && <ImgData category={selectedCategory}/>}
                    {showComponent.ogTitle && <OgTitle category={selectedCategory} tag={"ogt"}/>}
                    {showComponent.ogDescription && <OgTitle category={selectedCategory} tag={"ogd"}/>}
                    {showComponent.ogKeywords && <OgTitle category={selectedCategory} tag={"ogk"}/>}
                    {showComponent.ogImg && <OgTitle category={selectedCategory} tag={"ogi"}/>}



                </Col>
            </Row>
        </div>
    );
}

export default Seo2;
