import { FileSearchOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Descriptions,
    Divider,
    Popconfirm,
    Skeleton,
    Space,
} from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../utils/useAuth';

export default function VerifierActionView() {
    const auth = useAuth();
    const { userId } = useParams();
    const [profileData, setProfileData] = useState(null);
    const nav = useNavigate();

    useEffect(
        () =>
            Axios.get(`/api/profiles/${userId}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            }).then((res) =>
                res.data.data.roles.includes('verified')
                    ? nav('/app/verifier/dashboard', { replace: true })
                    : setProfileData(res.data.data)
            ),
        []
    );

    const handlers = {
        approve: () =>
            Axios.post(
                `/api/verifier/action/${userId}`,
                { action: 'verified' },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            ).then(() => nav('/app/verifier/dashboard', { replace: true })),
        flag: () =>
            Axios.post(
                `/api/verifier/action/${userId}`,
                { action: 'flagged' },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            ).then(() => nav('/app/verifier/dashboard', { replace: true })),
        delete: () =>
            Axios.delete(`/api/verifier/action/${userId}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            }).then(() => nav('/app/verifier/dashboard', { replace: true })),
    };

    return (
        <Card
            title={
                <span>
                    <FileSearchOutlined /> Profile Review
                </span>
            }
        >
            {profileData ? (
                <Descriptions bordered column={4}>
                    <Descriptions.Item label="Full Name" span={4}>
                        {profileData.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label="University" span={4}>
                        {profileData.university}
                    </Descriptions.Item>
                    <Descriptions.Item label="Course" span={4}>
                        {profileData.course}
                    </Descriptions.Item>
                    <Descriptions.Item label="Degree Level" span={4}>
                        {profileData.degreeLevel}
                    </Descriptions.Item>
                    <Descriptions.Item label="Start Date" span={2}>
                        {new Date(profileData.startDate).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="End Date" span={2}>
                        {new Date(profileData.endDate).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email" span={4}>
                        {profileData.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone" span={4}>
                        {profileData.phoneWA}
                    </Descriptions.Item>
                    <Descriptions.Item label="DOB" span={4}>
                        {new Date(profileData.dob).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Origin City" span={4}>
                        {profileData.originCity}
                    </Descriptions.Item>
                    <Descriptions.Item label="UK Address" span={4}>
                        {profileData.addressUK}
                    </Descriptions.Item>
                </Descriptions>
            ) : (
                <Skeleton />
            )}
            <Divider />
            <Space>
                {profileData && (
                    <Button type="primary" onClick={handlers.approve}>
                        Approve
                    </Button>
                )}
                {profileData &&
                    (profileData.roles.includes('flagged') ? (
                        <Popconfirm
                            placement="top"
                            title="Are you sure?"
                            onConfirm={handlers.delete}
                        >
                            <Button type="danger">Delete</Button>
                        </Popconfirm>
                    ) : (
                        <Button type="danger" onClick={handlers.flag}>
                            Flag
                        </Button>
                    ))}
            </Space>
        </Card>
    );
}
