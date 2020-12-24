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
        dataIndex: ['fullName'],
        key: 'name',
    },
    {
        title: 'University',
        dataIndex: ['university'],
        key: 'university',
    },
    {
        title: 'Degree Level',
        dataIndex: ['degreeLevel'],
        key: 'degreeLevel',
    },
    {
        title: 'Faculty',
        dataIndex: ['faculty'],
        key: 'university',
    },
    {
        title: 'Course',
        dataIndex: ['course'],
        key: 'course',
    },
    {
        title: 'Branch',
        dataIndex: ['branch'],
        key: 'branch',
    },
];

function DatabaseSearchView() {
    const [profilesData, setProfilesData] = useState(null);
    const accessToken = localStorage.getItem('oauth-access-token');
    let config = {
        headers: {
            Authorization: 'Bearer '.concat(accessToken),
        },
    };

    useEffect(() => {
        axios
            .get('/api/profiles/public', config)
            .then((resp) => setProfilesData(resp.data.data.profiles));
    }, []);

    return (
        <Card {...tableStyle}>
            <Typography.Title level={2}>Public Profile Info</Typography.Title>
            {profilesData && (
                <Table columns={profileTableCols} dataSource={profilesData} />
            )}
            {!profilesData && <Skeleton />}
        </Card>
    );
}

export default DatabaseSearchView;
