import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, Skeleton, Table, Typography } from 'antd';
import { getColumnSearchProps } from './ColumnSearchProps';
import { useAuth } from '../../utils/useAuth';
import { Link, Navigate } from 'react-router-dom';

const tableStyle = {
    style: {
        margin: '1rem 1rem',
    },
};

function DatabaseSearchView() {
    const auth = useAuth();

    if (!auth.user.roles.includes('verified'))
        return <Navigate to="/app/profile/me" />;

    const [profilesData, setProfilesData] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const getData = () => {
        let sort = 'full_name:asc';
        axios
            .get('/api/profiles/public', {
                params: {
                    paginate: false,
                    sort: sort,
                },
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => {
                setProfilesData(resp.data.data.profiles);
            });
    };

    const nameLinkFormat = (text, row) => (
        <Link to={`/app/profile/${row._id}`} component={Typography.Link}>
            {text}
        </Link>
    );

    let columnSearchParams = [
        searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
    ];

    const profileTableCols = [
        {
            title: 'No',
            key: 'index',
            render: (value, item, index) => (page - 1) * pageSize + index + 1,
        },
        {
            title: 'Status',
            key: 'status',
            render: (value) =>
                new Date(value.endDate) >= new Date() ? 'Active' : 'Inactive',
            filters: [
                { text: 'Active', value: 'Active' },
                { text: 'Inactive', value: 'Inactive' },
            ],
            onFilter: (value, record) =>
                value === 'Active'
                    ? new Date(record.endDate) >= new Date()
                    : new Date(record.endDate) < new Date(),
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: {
                compare: (a, b) =>
                    (a.fullName || '').localeCompare(b.fullName || ''),
            },
            ...getColumnSearchProps('fullName', ...columnSearchParams),
            render: nameLinkFormat,
        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
            sorter: {
                compare: (a, b) =>
                    (a.university || '').localeCompare(b.university || ''),
            },
            ...getColumnSearchProps('university', ...columnSearchParams),
        },
        {
            title: 'Degree Level',
            dataIndex: 'degreeLevel',
            key: 'degreeLevel',
            sorter: {
                compare: (a, b) =>
                    (a.degreeLevel || '').localeCompare(b.degreeLevel || ''),
            },
            ...getColumnSearchProps('degreeLevel', ...columnSearchParams),
        },
        {
            title: 'Faculty',
            dataIndex: 'faculty',
            key: 'faculty',
            sorter: {
                compare: (a, b) =>
                    (a.faculty || '').localeCompare(b.faculty || ''),
            },
            ...getColumnSearchProps('faculty', ...columnSearchParams),
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
            sorter: {
                compare: (a, b) =>
                    (a.course || '').localeCompare(b.course || ''),
            },
            ...getColumnSearchProps('course', ...columnSearchParams),
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            sorter: {
                compare: (a, b) =>
                    (a.branch || '').localeCompare(b.branch || ''),
            },
            ...getColumnSearchProps('branch', ...columnSearchParams),
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    return (
        <Card {...tableStyle}>
            <Typography.Title level={2}>Public Profile Info</Typography.Title>
            {profilesData && (
                <Table
                    columns={profileTableCols}
                    dataSource={profilesData}
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
            )}
            {!profilesData && <Skeleton />}
        </Card>
    );
}

export default DatabaseSearchView;
