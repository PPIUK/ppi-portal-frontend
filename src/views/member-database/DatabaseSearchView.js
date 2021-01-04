import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Skeleton, Table, Typography } from 'antd';
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

const profileTableCols = [
    {
        title: 'Name',
        dataIndex: 'fullName',
        key: 'fullName',
        sorter: true,
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
        sorter: true,
    },
    {
        title: 'Degree Level',
        dataIndex: 'degreeLevel',
        key: 'degreeLevel',
        sorter: true,
    },
    {
        title: 'Faculty',
        dataIndex: 'faculty',
        key: 'faculty',
        sorter: true,
    },
    {
        title: 'Course',
        dataIndex: 'course',
        key: 'course',
        sorter: true,
    },
    {
        title: 'Branch',
        dataIndex: 'branch',
        key: 'branch',
        sorter: true,
    },
];

function DatabaseSearchView() {
    const auth = useAuth();

    const [profilesData, setProfilesData] = useState(null);
    const [paginationData, setPaginationData] = useState(null);

    const getData = (page, params = false) => {
        let sort;
        if (params.sortField === 'fullName' || !params.sortField) {
            sort = 'full_name:';
        } else if (params.sortField === 'degreeLevel') {
            sort = 'degree_level:';
        } else if (params.sortField) {
            sort = params.sortField;
            sort += ':';
        }
        if (params.sortOrder === 'ascend' || !params.sortOrder) {
            sort += 'asc';
        } else if (params.sortOrder === 'descend') {
            sort += 'desc';
        }

        axios
            .get('/api/profiles/public', {
                params: {
                    paginate: true,
                    limit: 10,
                    page,
                    sort,
                },
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => {
                setProfilesData(resp.data.data.profiles);
                setPaginationData({
                    total: resp.data.data.totalProfiles,
                });
            });
    };

    const onTableChange = (pagination, filters, sorter) => {
        console.log(sorter);
        getData(pagination.current, {
            sortField: sorter.field,
            sortOrder: sorter.order,
        });
    };

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
                    pagination={paginationData}
                    onChange={onTableChange}
                />
            )}
            {!profilesData && <Skeleton />}
        </Card>
    );
}

export default DatabaseSearchView;
