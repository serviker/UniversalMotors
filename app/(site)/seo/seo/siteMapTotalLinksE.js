import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';

const SiteMapTotalLinksE = (props) => {
    const [totalLink, setTotalLink] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 1000; // Вы можете изменить размер страницы по умолчанию здесь
    const category = props.category;

    useEffect(() => {
        const fetchData = async (page) => {
            try {
                const response = await axios.get(`http://185.25.10.105:5002/seositemap?page=${page}&size=${pageSize}&err=err${category ? `&category=${category}` : ''}`);
                setTotalLink(response.data.TotalLink);
                setTotalPages(Math.ceil(response.data.totalCount / pageSize));
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
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
                Ссылки с 404 ошибкой Sitemap
            </h4>
            <div className="d-flex justify-content-center">
                <Pagination className="m-1">{paginationItems}</Pagination>
            </div>
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
                        <td> <a href={item.NameLink.replace('http://universalmotors.ru/', 'https://office.universalmotors.ru/')} target="_blank" rel="noopener noreferrer">
                            {item.NameLink}
                        </a></td>
                        <td>{item.ErrorLink && item.ErrorLink.error ? item.ErrorLink.error : '---'}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <Pagination className="m-1">{paginationItems}</Pagination>
            </div>
        </>
    );
};

export default SiteMapTotalLinksE;
