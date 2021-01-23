import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, Skeleton, Table, Typography } from 'antd';
import { getColumnSearchProps } from './ColumnSearchProps';
import { useAuth } from '../../utils/useAuth';

const baseURL =
    process.env.NODE_ENV == 'production'
        ? 'https://portal.ppiuk.org'
        : 'http://localhost:3001';

const tableStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function DatabaseSearchView() {
    const auth = useAuth();

    const [profilesData, setProfilesData] = useState(null);
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

    let columnSearchParams = [
        searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
    ];

    const profileTableCols = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: {
                compare: (a, b) => a.fullName.localeCompare(b.fullName),
            },
            ...getColumnSearchProps('fullName', ...columnSearchParams),
            // eslint-disable-next-line react/display-name
            render: (text, row) => (
                <Typography.Link href={`${baseURL}/app/profile/${row._id}`}>
                    {text}
                </Typography.Link>
            ),
        },
        {
            title: 'University',
            dataIndex: 'university',
            key: 'university',
            sorter: {
                compare: (a, b) => a.university.localeCompare(b.university),
            },
            ...getColumnSearchProps('university', ...columnSearchParams),
        },
        {
            title: 'Degree Level',
            dataIndex: 'degreeLevel',
            key: 'degreeLevel',
            sorter: {
                compare: (a, b) => a.degreeLevel.localeCompare(b.degreeLevel),
            },
            ...getColumnSearchProps('degreeLevel', ...columnSearchParams),
        },
        {
            title: 'Faculty',
            dataIndex: 'faculty',
            key: 'faculty',
            sorter: {
                compare: (a, b) => a.faculty.localeCompare(b.faculty),
            },
            ...getColumnSearchProps('faculty', ...columnSearchParams),
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
            sorter: {
                compare: (a, b) => a.course.localeCompare(b.course),
            },
            ...getColumnSearchProps('course', ...columnSearchParams),
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            sorter: {
                compare: (a, b) => a.branch.localeCompare(b.branch),
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
                    scroll={{ x: true }}
                />
            )}
            {!profilesData && <Skeleton />}
        </Card>
    );
}

export default DatabaseSearchView;
