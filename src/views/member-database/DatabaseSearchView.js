import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Skeleton, Table, Typography } from 'antd';

const tableStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

const profileTableCols = [
    {
        title: 'Name',
        dataIndex: 'fullName',
        key: 'name',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
        title: 'University',
        dataIndex: 'university',
        key: 'university',
        sorter: (a, b) => a.university.localeCompare(b.university),
    },
    {
        title: 'Degree Level',
        dataIndex: 'degreeLevel',
        key: 'degreeLevel',
        sorter: (a, b) => a.degreeLevel.localeCompare(b.degreeLevel),
    },
    {
        title: 'Faculty',
        dataIndex: 'faculty',
        key: 'faculty',
        sorter: (a, b) => a.faculty.localeCompare(b.faculty),
    },
    {
        title: 'Course',
        dataIndex: 'course',
        key: 'course',
        sorter: (a, b) => a.course.localeCompare(b.course),
    },
    {
        title: 'Branch',
        dataIndex: 'branch',
        key: 'branch',
        sorter: (a, b) => a.branch.localeCompare(b.branch),
    },
];

function DatabaseSearchView() {
    const [profilesData, setProfilesData] = useState(null);
    const [paginationData, setPaginationData] = useState({
        paginate: true,
        limit: 10,
        page: 1,
    });
    const accessToken = localStorage.getItem('oauth-access-token');

    const handleTableChange = (pagination) => {
        axios
            .get('/api/profiles/public', {
                params: pagination,
                headers: {
                    Authorization: 'Bearer '.concat(accessToken),
                },
            })
            .then((resp) => {
                setProfilesData(resp.data.data.profiles);
                setPaginationData({
                    paginate: true,
                    current: resp.data.data.page,
                    pageSize: resp.data.data.limit,
                    total: resp.data.data.totalProfiles,
                });
            });
    };

    useEffect(() => {
        axios
            .get('/api/profiles/public', {
                params: paginationData,
                headers: {
                    Authorization: 'Bearer '.concat(accessToken),
                },
            })
            .then((resp) => {
                setProfilesData(resp.data.data.profiles);
                setPaginationData({
                    paginate: true,
                    current: resp.data.data.page,
                    pageSize: resp.data.data.limit,
                    total: resp.data.data.totalProfiles,
                });
            });
    }, []);
    return (
        <Card {...tableStyle}>
            <Typography.Title level={2}>Public Profile Info</Typography.Title>
            {profilesData && (
                <Table
                    columns={profileTableCols}
                    dataSource={profilesData}
                    pagination={paginationData}
                    onchange={handleTableChange}
                />
            )}
            {!profilesData && <Skeleton />}
        </Card>
    );
}

export default DatabaseSearchView;
