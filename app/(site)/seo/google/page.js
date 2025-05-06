"use client"
import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Button, Badge, Col} from "react-bootstrap";

import Row from "react-bootstrap/Row";
import MenuButton from "../component/menuButton";

import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';



function Page() {

    const [data, setData] = useState({
        countAll: 0,
        countUpdate: 0,
        countNull:0,
        countUpdateYa: 0,
        countNullYa:0,
        links: []

    });



    // Функция для получения данных с сервера
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://185.25.10.105:5002/seogoogle`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const intervalId = setInterval(fetchData, 1100000);
        fetchData();

        return () => {
            clearInterval(intervalId);
        };
    }, []); // Массив зависимостей содержит только selectedCategory


    // Вычисление процента
    const now = ((data.countUpdate + data.countNull)  / data.countAll) * 100;
    const nowYa = ((data.countUpdateYa + data.countNullYa)  / data.countAll) * 100;
  console.log(nowYa)





    return (
        <div className={"seocontainer"}>
            <MenuButton/>
            <Row>
            <Col md={6} style={{padding: '0px'}}>
           <ProgressBar animated now={now}
                         label={<span style={{ fontWeight: 'bold', fontSize: '20px',padding: '0px' }}>{`${now.toFixed(2)}%`} Google V4</span>}
                         style={{ marginTop: '2px', marginBottom: '2px',height: '30px' }}
            />
            </Col>
            <Col md={6} style={{padding: '0px'}}>
            <ProgressBar animated now={nowYa}
                         label={<span style={{ fontWeight: 'bold', fontSize: '20px',padding: '0px' }}>{`${nowYa.toFixed(2)}%`} Yandex Metrica</span>}
                         style={{marginTop: '2px', marginBottom: '2px',height: '30px' }}
                         variant="warning"
            />
            </Col>
            </Row>
            <Col md={12} style={{padding: '0px'}}>
                <Row>
                <Col style={{padding: '0px'}}>
                    <Button variant="success" size="small" className="button-style">
                        Всего Ссылок
                        <Badge className="button-Badge" bg="secondary"> {data.countAll.toLocaleString()}</Badge>
                    </Button>
                </Col>
                <Col style={{padding: '0px'}}>
                    <Button variant="success" size="small" className="button-style">
                        Обработано ссылок(Google) <Badge className="button-Badge" bg="secondary">{(data.countUpdate + data.countNull).toLocaleString()}</Badge>
                    </Button>
                </Col>
                    <Col style={{padding: '0px'}}>
                        <Button variant="success" size="small" className="button-style">
                            Страницы 0 (Google) <Badge className="button-Badge" bg="secondary">{data.countNull.toLocaleString()}</Badge>
                        </Button>
                    </Col>


            </Row>
                <Row>
                <Col style={{padding: '0px',marginTop: '1px'}}>
                    <Button variant="success" size="small" className="button-style">
                        Обработано ссылок(Yandex) <Badge className="button-Badge" bg="secondary">{(data.countUpdateYa + data.countNullYa).toLocaleString()}</Badge>
                    </Button>
                </Col>
                <Col style={{padding: '0px',marginTop: '1px'}}>
                    <Button variant="success" size="small" className="button-style">
                        Страницы 0 (Yandex) <Badge className="button-Badge" bg="secondary">{data.countNullYa.toLocaleString()}</Badge>
                    </Button>
                </Col>
                </Row>
            </Col>
            <>


                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Ссылка на сайт</th>
                        <th>П</th>
                        <th>Неделя</th>
                        <th>Месяц</th>
                        <th>Год</th>
                        <th>За все время</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.links.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan="2" style={{ width: '100px' }}>
                                    <a href={item.NameLink.replace('http://universalmotors.ru/', 'https://admin.universalmotors.ru/')} target="_blank" rel="noopener noreferrer">
                                        {item.NameLink}
                                    </a>
                                </td>
                                <td>G</td>
                                <td>{item.Total7day}</td>
                                <td>{item.Total30day}</td>
                                <td>{item.Total365day}</td>
                                <td>{item.TotalAllday}</td>
                            </tr>
                            <tr>

                                <td>Y</td>
                                <td>{item.Total7dayYa}</td>
                                <td>{item.Total30dayYa}</td>
                                <td>{item.Total365dayYa}</td>
                                <td>{item.TotalAlldayYa}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </Table>

            </>
        </div>
    );
}

export default Page;
