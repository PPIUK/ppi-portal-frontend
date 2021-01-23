import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Card, Skeleton, Table, Typography } from 'antd';
import { getColumnSearchProps } from './ColumnSearchProps';
import { useAuth } from '../../utils/useAuth';
import { Navigate, useParams } from 'react-router-dom';

const baseURL =
    process.env.NODE_ENV == 'production'
        ? 'https://portal.ppiuk.org'
        : 'http://localhost:3001';

const tableStyle = {
    style: {
        margin: '1rem 1rem',
    },
};

function BranchListView() {
    const auth = useAuth();
    const params = useParams();

    if (
        !auth.user.roles.includes('dataAccess') ||
        !(auth.user.branch.toUpperCase() === params.branchName.toUpperCase())
    )
        return <Navigate to="/app/profile/me" />;

    const [profilesData, setProfilesData] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const getData = () => {
        let sort = 'full_name:asc';
        axios
            .get('/api/profiles/', {
                params: {
                    paginate: false,
                    sort: sort,
                    branch: params.branchName,
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
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
            sorter: {
                compare: (a, b) => (a.dob > b.dob ? 1 : a.dob < b.dob ? -1 : 0),
            },
            ...getColumnSearchProps('dob', ...columnSearchParams),
            // eslint-disable-next-line no-undef
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Origin City',
            dataIndex: 'originCity',
            key: 'originCity',
            sorter: {
                compare: (a, b) => a.originCity.localeCompare(b.originCity),
            },
            ...getColumnSearchProps('originCity', ...columnSearchParams),
        },
        {
            title: 'UK Address',
            dataIndex: 'addressUK',
            key: 'addressUK',
            sorter: {
                compare: (a, b) => a.addressUK.localeCompare(b.addressUK),
            },
            ...getColumnSearchProps('addressUK', ...columnSearchParams),
        },
        {
            title: 'UK Postcode',
            dataIndex: 'postcodeUK',
            key: 'postcodeUK',
            sorter: {
                compare: (a, b) => a.postcodeUK.localeCompare(b.postcodeUK),
            },
            ...getColumnSearchProps('postcodeUK', ...columnSearchParams),
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
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            sorter: {
                compare: (a, b) =>
                    a.startDate > b.startDate
                        ? 1
                        : a.startDate < b.startDate
                        ? -1
                        : 0,
            },
            ...getColumnSearchProps('startDate', ...columnSearchParams),
            // eslint-disable-next-line no-undef
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            sorter: {
                compare: (a, b) =>
                    a.endDate > b.endDate ? 1 : a.endDate < b.endDate ? -1 : 0,
            },
            ...getColumnSearchProps('endDate', ...columnSearchParams),
            // eslint-disable-next-line no-undef
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Funding Source',
            dataIndex: 'fundingSource',
            key: 'fundingSource',
            sorter: {
                compare: (a, b) =>
                    a.fundingSource.localeCompare(b.fundingSource),
            },
            ...getColumnSearchProps('fundingSource', ...columnSearchParams),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: {
                compare: (a, b) => a.email.localeCompare(b.email),
            },
            ...getColumnSearchProps('email', ...columnSearchParams),
        },
        {
            title: 'Personal Email',
            dataIndex: 'emailPersonal',
            key: 'emailPersonal',
            sorter: {
                compare: (a, b) =>
                    a.emailPersonal.localeCompare(b.emailPersonal),
            },
            ...getColumnSearchProps('emailPersonal', ...columnSearchParams),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneWA',
            key: 'phoneWA',
            sorter: {
                compare: (a, b) => a.phoneWA.localeCompare(b.phoneWA),
            },
            ...getColumnSearchProps('phoneWA', ...columnSearchParams),
        },
        {
            title: 'LinkedIn',
            dataIndex: 'linkedin',
            key: 'linkedin',
            sorter: {
                compare: (a, b) => a.linkedin.localeCompare(b.linkedin),
            },
            ...getColumnSearchProps('linkedin', ...columnSearchParams),
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
            <Typography.Title level={2}>
                {params.branchName.charAt(0).toUpperCase() +
                    params.branchName.slice(1)}{' '}
                Branch Profile List
            </Typography.Title>
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

export default BranchListView;
