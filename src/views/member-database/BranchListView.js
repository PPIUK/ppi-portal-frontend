import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Card, Skeleton, Table, Typography } from 'antd';
import { getColumnSearchProps } from './ColumnSearchProps';
import { useAuth } from '../../utils/useAuth';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';

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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
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
                    branch:
                        auth.user.branch !== 'All'
                            ? params.branchName
                            : undefined,
                },
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => {
                setProfilesData(resp.data.data.profiles);
            });
    };

    const dateFormat = (text) => (
        <Typography>
            {text !== undefined ? moment(text).format('DD-MM-YYYY') : null}
        </Typography>
    );

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
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
            sorter: {
                compare: (a, b) => (a.dob > b.dob ? 1 : a.dob < b.dob ? -1 : 0),
            },
            ...getColumnSearchProps('dob', ...columnSearchParams),
            render: dateFormat,
        },
        {
            title: 'Origin City',
            dataIndex: 'originCity',
            key: 'originCity',
            sorter: {
                compare: (a, b) =>
                    (a.originCity || '').localeCompare(b.originCity || ''),
            },
            ...getColumnSearchProps('originCity', ...columnSearchParams),
        },
        {
            title: 'UK Address',
            dataIndex: 'addressUK',
            key: 'addressUK',
            sorter: {
                compare: (a, b) =>
                    (a.addressUK || '').localeCompare(b.addressUK || ''),
            },
            ...getColumnSearchProps('addressUK', ...columnSearchParams),
        },
        {
            title: 'UK Postcode',
            dataIndex: 'postcodeUK',
            key: 'postcodeUK',
            sorter: {
                compare: (a, b) =>
                    (a.postcodeUK || '').localeCompare(b.postcodeUK || ''),
            },
            ...getColumnSearchProps('postcodeUK', ...columnSearchParams),
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
            render: dateFormat,
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
            render: dateFormat,
        },
        {
            title: 'Funding Source',
            dataIndex: 'fundingSource',
            key: 'fundingSource',
            sorter: {
                compare: (a, b) =>
                    (a.fundingSource || '').localeCompare(
                        b.fundingSource || ''
                    ),
            },
            ...getColumnSearchProps('fundingSource', ...columnSearchParams),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: {
                compare: (a, b) => (a.email || '').localeCompare(b.email || ''),
            },
            ...getColumnSearchProps('email', ...columnSearchParams),
        },
        {
            title: 'Personal Email',
            dataIndex: 'emailPersonal',
            key: 'emailPersonal',
            sorter: {
                compare: (a, b) =>
                    (a.emailPersonal || '').localeCompare(
                        b.emailPersonal || ''
                    ),
            },
            ...getColumnSearchProps('emailPersonal', ...columnSearchParams),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneWA',
            key: 'phoneWA',
            sorter: {
                compare: (a, b) => (a.phoneWA || '').compare(b.phoneWA || ''),
            },
            ...getColumnSearchProps('phoneWA', ...columnSearchParams),
        },
        {
            title: 'LinkedIn',
            dataIndex: 'linkedin',
            key: 'linkedin',
            sorter: {
                compare: (a, b) =>
                    (a.linkedin || '').localeCompare(b.linkedin || ''),
            },
            ...getColumnSearchProps('linkedin', ...columnSearchParams),
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
            <Typography.Title level={2}>
                {params.branchName.charAt(0).toUpperCase() +
                    params.branchName.slice(1)}{' '}
                Branch Profile List
            </Typography.Title>
            {profilesData && (
                <div>
                    <CSVLink
                        filename={`PPI-UK-Branch-${params.branchName}.csv`}
                        data={profilesData.map(
                            ({
                                // eslint-disable-next-line no-unused-vars
                                emailVerified,
                                // eslint-disable-next-line no-unused-vars
                                manuallyVerified,
                                // eslint-disable-next-line no-unused-vars
                                roles,
                                // eslint-disable-next-line no-unused-vars
                                referral,
                                ...others
                            }) => others
                        )}
                    >
                        <Button type="primary">
                            Download Branch Data as CSV file
                        </Button>
                    </CSVLink>

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
                </div>
            )}
            {!profilesData && <Skeleton />}
        </Card>
    );
}

export default BranchListView;
