import React, { useState, useEffect } from 'react';
import {Table, Modal, Button} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const PageError = (props) => {
    const [totalLink, setTotalLink] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = 1000; // Вы можете изменить размер страницы по умолчанию здесь
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [links, setLinks] = useState();
    const [recheckTrigger, setRecheckTrigger] = useState(0);
    const category = props.category;
    useEffect(() => {
        const fetchData = async (page) => {
            setIsLoading(true); // Начинаем загрузку данных
            try {
                const response = await axios.get(`http://185.25.10.105:5002/seositemap?page=${page}&size=${pageSize}&err=errPage${category ? `&category=${category}` : ''}`);
                setTotalLink(response.data.TotalLink);
                setTotalPages(Math.ceil(response.data.totalCount / pageSize));
            } catch (error) {
                console.error('Ошибка при получении данных: ', error);
            }
            setIsLoading(false); // Загрузка данных завершена
        };

        fetchData(currentPage);
    }, [currentPage,category,recheckTrigger]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleModalOpen = async (url) => {
        setIsModalLoading(true); // Начинаем загрузку данных для модального окна
        try {
            setShowModal(true);
            const response = await axios.get(`http://185.25.10.105:5002/seogetlinks?link=${url}`);
            setModalData(response.data.links);
        } catch (error) {
            console.error('Error fetching modal data:', error);
        }
        setIsModalLoading(false); // Загрузка данных для модального окна завершена
    };
    const handleRecheck = async (link) => {
        try {
            setIsLoading(true); // Включить индикатор загрузки
            await axios.get(`http://185.25.10.105:5002/seogetlinksupdate?link=${link}`);
            // Обновите состояние или выполните другие действия после успешного запроса
        } catch (error) {
            console.error('Ошибка при перепроверке ссылки: ', error);
        } finally {
            setIsLoading(false); // Выключить индикатор загрузки
            setRecheckTrigger(prev => prev + 1);
        }
    };

    const paginationItems = [];
    const paginationRange = 3; // Количество страниц, отображаемых рядом с текущей страницей

    // Начало и конец диапазона пагинации
    let start = currentPage > paginationRange ? currentPage - paginationRange : 1;
    let end = currentPage < totalPages - paginationRange ? currentPage + paginationRange : totalPages;

    // Предыдущая и следующая кнопки
    if (currentPage > 1) {
        paginationItems.push(<Pagination.First onClick={() => handlePageClick(1)} />);
        paginationItems.push(<Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} />);
    }

    // Для уменьшения количества кнопок пагинации
    if (start > 1) {
        paginationItems.push(<Pagination.Item onClick={() => handlePageClick(1)}>{1}</Pagination.Item>);
        if (start > 2) {
            paginationItems.push(<Pagination.Ellipsis />);
        }
    }

    // Основные кнопки пагинации
    for (let number = start; number <= end; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    // Сокращенные кнопки и кнопка последней страницы
    if (end < totalPages) {
        if (end < totalPages - 1) {
            paginationItems.push(<Pagination.Ellipsis />);
        }
        paginationItems.push(<Pagination.Item onClick={() => handlePageClick(totalPages)}>{totalPages}</Pagination.Item>);
    }

    // Следующая и последняя кнопки
    if (currentPage < totalPages) {
        paginationItems.push(<Pagination.Next onClick={() => handlePageClick(currentPage + 1)} />);
        paginationItems.push(<Pagination.Last onClick={() => handlePageClick(totalPages)} />);
    }

    return (
        <>
            <h4>
                Ссылки с 404 ошибкой Sitemap
            </h4>
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    {totalPages > 1 && ( // Проверка на количество страниц
                        <div className="d-flex justify-content-center">
                            <Pagination className="m-1">{paginationItems}</Pagination>
                        </div>
                    )}
                    <Modal show={showModal} onHide={() => { setShowModal(false); setModalData([]); }} size="xl" style={{ width: '80%', maxWidth: '80%', margin: '0 auto' }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Link Details {modalData.length}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {isModalLoading ? (
                                <div className="d-flex justify-content-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Загрузка...</span>
                                    </Spinner>
                                </div>
                            ) : (
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Link</th>
                                </tr>
                                </thead>
                                <tbody>
                                {modalData.map((linkObject, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>

                                            <a href={`${linkObject.NameLink.replace('https://universalmotors.ru/', 'https://office.universalmotors.ru/')}?extraParam=${links.replace('https://universalmotors.ru/', '')}`}
                                               target="_blank"
                                               rel="noopener noreferrer">
                                                {linkObject.NameLink}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setShowModal(false); setModalData([]); }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Битая ссылка</th>
                    <th>Ошибка</th>
                </tr>
                </thead>
                <tbody>
                {totalLink.map((item, index) => (
                    <tr key={index}>
                        <td><a href={item.NameLink} target="_blank" rel="noopener noreferrer">
                            {item.NameLink}
                        </a>
                            <Button variant="primary" onClick={() => {
                                setLinks(item.ErrorLink.url);
                                handleModalOpen(item.ErrorLink.url);

                            }} size="sm">
                                источник
                            </Button>
                            <Button variant="primary" size="sm" onClick={() => handleRecheck(item.NameLink)}>
                                Перепроверить
                            </Button>

                        </td>
                        <td>{item.ErrorLink && item.ErrorLink.error ? item.ErrorLink.error : '---'}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <Pagination className="m-1">{paginationItems}</Pagination>
            </div></>
                    )}
        </>
    );
};

export default PageError;
