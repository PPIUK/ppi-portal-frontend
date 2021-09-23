import { FileSearchOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Divider,
    List,
    Popconfirm,
    Skeleton,
    Space,
    Typography,
} from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { compareTwoStrings } from 'string-similarity';
import { useAuth } from '../../utils/useAuth';
import ProfileDetails from './components/ProfileDetails';

export default function VerifierActionView() {
    const auth = useAuth();
    const { userId } = useParams();

    // FIXME: this is terribly inefficient, if it becomes a problem
    //        make the filtering serverside and use another endpoint
    //        for manual compares. Or add a provider for the /verifier
    //        routes to act as a cache and update every once in a while
    const [allProfiles, setAllProfiles] = useState(null);

    const [profileData, setProfileData] = useState(null);
    const [compareProfileData, setCompareProfileData] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        Axios.get(`/api/profiles`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) =>
            setAllProfiles(
                res.data.data.profiles.map((profile) => ({
                    _id: profile._id,
                    fullName: profile.fullName,
                }))
            )
        );

        Axios.get(`/api/profiles/${userId}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) =>
            res.data.data.roles.includes('verified')
                ? nav('/app/verifier/dashboard', { replace: true })
                : setProfileData(res.data.data)
        );
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
        compare: (profile) =>
            Axios.get(`/api/profiles/${profile._id}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            }).then((res) =>
                setCompareProfileData({ _id: profile._id, ...res.data.data })
            ),
    };

    return (
        <Card
            title={
                <span>
                    <FileSearchOutlined /> Profile Review
                </span>
            }
        >
            {allProfiles && profileData && (
                <>
                    <Typography.Title level={5}>
                        Similar profiles
                    </Typography.Title>
                    <List
                        bordered
                        rowKey={(item) => item._id}
                        itemLayout="horizontal"
                        dataSource={allProfiles.filter(
                            (profile) =>
                                profile._id != userId &&
                                compareTwoStrings(
                                    profile.fullName,
                                    profileData.fullName
                                ) >= 0.8
                        )}
                        renderItem={(item) => (
                            <List.Item
                                onClick={() => handlers.compare(item)}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                <List.Item.Meta
                                    title={`${item.fullName} | ${item._id}`}
                                    description={`Similarity: ${
                                        compareTwoStrings(
                                            item.fullName,
                                            profileData.fullName
                                        ) * 100
                                    }% | Click to compare`}
                                />
                            </List.Item>
                        )}
                    />
                    <Divider />
                </>
            )}
            {profileData ? (
                <ProfileDetails profileData={{ _id: userId, ...profileData }} />
            ) : (
                <Skeleton />
            )}
            {compareProfileData && (
                <>
                    <Divider plain>
                        Comparing with: {compareProfileData.fullName} |{' '}
                        {compareProfileData._id} |{' '}
                        <a onClick={() => setCompareProfileData(null)}>Clear</a>
                    </Divider>
                    <ProfileDetails profileData={compareProfileData} />
                </>
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
