import {
    DownloadOutlined,
    FileSearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Button,
    Card,
    Descriptions,
    Divider,
    Image,
    Popconfirm,
    Skeleton,
    Space,
    Tag,
} from 'antd';
import Axios from 'axios';
import download from 'downloadjs';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../utils/useAuth';

export default function VerifierActionView() {
    const auth = useAuth();
    const { userId } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        Axios.get(`/api/profiles/${userId}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) =>
            res.data.data.roles.includes('verified')
                ? nav('/app/verifier/dashboard', { replace: true })
                : setProfileData(res.data.data)
        );

        Axios.get(`/api/profiles/${userId}/profilepicture`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            responseType: 'blob',
        }).then((res) => {
            let reader = new FileReader();
            reader.readAsDataURL(res.data);
            reader.onload = () => setProfileImage(reader.result);
        });
    }, []);

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
        block: () =>
            Axios.post(
                `/api/verifier/action/${userId}`,
                { action: 'blocked' },
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
                    <Descriptions.Item label="Profile Picture" span={4}>
                        {profileData.profilePicture ? (
                            <Image
                                src={profileImage}
                                loading={profileImage == null}
                                style={{ maxWidth: '200px' }}
                            />
                        ) : (
                            <UserOutlined style={{ fontSize: '64px' }} />
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="Email Verification Status"
                        span={4}
                    >
                        <Tag
                            color={profileData.emailVerified ? 'green' : 'red'}
                        >
                            {profileData.emailVerified
                                ? 'Verified'
                                : 'Unverified'}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Proof of Student Status" span={4}>
                        {profileData.studentProof ? (
                            <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                onClick={() =>
                                    Axios.get(
                                        `/api/profiles/${userId}/studentproof`,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${auth.accessToken}`,
                                            },
                                            responseType: 'blob',
                                        }
                                    ).then((resp) => {
                                        const headerVal =
                                            resp.headers['content-disposition'];
                                        const filename = headerVal
                                            .split(';')[1]
                                            .split('=')[1]
                                            .replace('"', '')
                                            .replace('"', '');
                                        download(resp.data, filename);
                                    })
                                }
                            >
                                Download Proof
                            </Button>
                        ) : (
                            'No Proof'
                        )}
                    </Descriptions.Item>
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
                    (profileData.roles.includes('blocked') ||
                        !profileData.roles.includes('flagged')) && (
                        <Button type="danger" onClick={handlers.flag}>
                            Flag
                        </Button>
                    )}
                {profileData &&
                    (profileData.roles.includes('flagged') ||
                        !profileData.roles.includes('blocked')) && (
                        <Button type="danger" onClick={handlers.block}>
                            Block
                        </Button>
                    )}

                {profileData &&
                    (profileData.roles.includes('flagged') ||
                        profileData.roles.includes('blocked')) && (
                        <Popconfirm
                            placement="top"
                            title="Are you sure?"
                            onConfirm={handlers.delete}
                        >
                            <Button type="danger">Delete</Button>
                        </Popconfirm>
                    )}
            </Space>
        </Card>
    );
}
