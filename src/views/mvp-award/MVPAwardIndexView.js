import React, { useEffect, useState } from 'react';
import { Card, Skeleton, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useAuth } from '../../utils/useAuth';

import { Link, Navigate } from 'react-router-dom';

import axios from 'axios';

export default function MVPAwardIndexView() {
    const auth = useAuth();
    const [formsData, setFormsData] = useState([]);

    useEffect(() => {
        axios
            .get('/api/forms/mvpawards/submissions/all', {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => setFormsData(resp.data.data));
    }, []);

    if (!auth.user.roles.includes('mvpAwardsAccess'))
        return <Navigate to="/app/profile/me" />;

    return formsData.length === 0 ? (
        <Card>
            <Skeleton />
        </Card>
    ) : (
        <Card
            title={
                <span>
                    <UserOutlined /> Submissions
                </span>
            }
        >
            <List
                size="large"
                bordered
                dataSource={formsData}
                renderItem={(item) => (
                    <Link to={`/app/mvp-award/submission/${item._id}`}>
                        <List.Item>{item.fullName}</List.Item>
                    </Link>
                )}
            />
        </Card>
    );
}
