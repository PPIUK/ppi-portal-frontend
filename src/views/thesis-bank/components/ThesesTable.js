import React, { useState, useRef } from 'react';
import { Table } from 'antd';

import { getColumnSearchProps } from '../../member-database/ColumnSearchProps';
import { Link } from 'react-router-dom';

export default function ThesesTable({ theses, isPublic }) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    let colSearchParams = [
        searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
    ];

    const url = isPublic ? '/thesis/' : '/app/thesis-bank/';

    const cols = [
        {
            title: 'No',
            key: 'index',
            render: (value, item, index) => (page - 1) * pageSize + index + 1,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            defaultSortOrder: 'descend',
            sorter: {
                compare: (a, b) =>
                    a.year > b.year ? 1 : a.year < b.year ? -1 : 0,
            },
            ...getColumnSearchProps('year', ...colSearchParams),
        },
        {
            title: 'Type',
            dataIndex: 'itemType',
            key: 'itemType',
            sorter: {
                compare: (a, b) =>
                    (a.itemType || '').localeCompare(b.itemType || ''),
            },
            ...getColumnSearchProps('itemType', ...colSearchParams),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: {
                compare: (a, b) => (a.title || '').localeCompare(b.title || ''),
            },
            ...getColumnSearchProps('title', ...colSearchParams),
            // eslint-disable-next-line react/display-name
            render: (title, row) => <Link to={url + row._id}>{title}</Link>,
        },
        {
            title: 'Corresponding Author',
            dataIndex: 'correspondingAuthor',
            key: 'correspondingAuthor',
            sorter: {
                compare: (a, b) =>
                    (a.correspondingAuthor || '').localeCompare(
                        b.correspondingAuthor || ''
                    ),
            },
            ...getColumnSearchProps('correspondingAuthor', ...colSearchParams),
            // eslint-disable-next-line react/display-name
            render: (author) =>
                typeof author === 'string' ? (
                    author
                ) : (
                    <Link to={`/app/profile/${author.id}`}>{author.name}</Link>
                ),
        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
            sorter: {
                compare: (a, b) =>
                    (a.university || '').localeCompare(b.university || ''),
            },
            ...getColumnSearchProps('university', ...colSearchParams),
        },
    ];
    return (
        <Table
            columns={cols}
            dataSource={theses}
            pagination={{
                onChange(current) {
                    setPage(current);
                },
                onShowSizeChange(current, size) {
                    setPageSize(size);
                },
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 20, 50, 100],
            }}
            scroll={{ x: true }}
        />
    );
}
