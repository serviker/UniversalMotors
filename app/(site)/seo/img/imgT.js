import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const ImgT = (props) => {
    const [totalLink, setTotalLink] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = 1000; // Вы можете изменить размер страницы по умолчанию здесь
    const category = props.category;
    useEffect(() => {
        const fetchData = async (page) => {
            setIsLoading(true); // Начинаем загрузку данных
            try {
                const response = await axios.get(`http://185.25.10.105:5002/seositemap?page=${page}&size=${pageSize}&err=imgT${category ? `&category=${category}` : ''}`);
                setTotalLink(response.data.TotalLink);
                setTotalPages(Math.ceil(response.data.totalCount / pageSize));
            } catch (error) {
                console.error('Ошибка при получении данных: ', error);
            }
            setIsLoading(false); // Загрузка данных завершена
        };

        fetchData(currentPage);
    }, [currentPage,category]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
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
               Страницы с задублированными мета тегами
            </h4>
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    {totalPages > 1 && ( // Добавлена проверка количества страниц
                        <div className="d-flex justify-content-center">
                            <Pagination className="m-1">{paginationItems}</Pagination>
                        </div>
                    )}
                    <Table striped bordered hover style={{ width: '100%', tableLayout: 'fixed' }}>
                        <thead>
                        <tr>
                            <th style={{ width: '50%' }}>Ссылка</th>
                            <th>Src</th>
                            <th>Alt</th>
                            <th>Title</th>
                        </tr>
                        </thead>
                        <tbody>
                        {totalLink && totalLink.map((item, index) => (
                            <tr key={index}>

                                <td style={{ wordWrap: 'break-word' }}> <a href={item.NameLink.replace('https://universalmotors.ru/', 'https://admin.universalmotors.ru/')} target="_blank" rel="noopener noreferrer">
                                    {item.NameLink}
                                </a></td>
                                <td style={{ wordWrap: 'break-word' }}>{item.Src} {item.Src}   {item.dataoriginal}</td>
                                <td style={{ wordWrap: 'break-word' }}>{item.Alt}</td>
                                <td style={{ wordWrap: 'break-word' }}>{item.Title}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    {totalPages > 1 && ( // Добавлена проверка количества страниц
                        <div className="d-flex justify-content-center">
                            <Pagination className="m-1">{paginationItems}</Pagination>
                        </div>
                    )}

                </>
                    )}
        </>
    );
};

export default ImgT;
