import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/useAuth';
import axios from 'axios';
import { useParams } from 'react-router';

import { Card, Descriptions, Image, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function ProfileView() {
    const { profileId } = useParams();
    const auth = useAuth();
    const [profile, setProfile] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        axios
            .get(`/api/profiles/${profileId}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => {
                setProfile(resp.data.data);
            });

        axios
            .get(`/api/profiles/${profileId}/profilepicture`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                responseType: 'blob',
            })
            .then((res) => {
                let reader = new FileReader();
                reader.readAsDataURL(res.data);
                reader.onload = () => setProfileImage(reader.result);
            });
    }, []);

    return (
        <Card>
            {profile ? (
                <Descriptions bordered column={4}>
                    <Descriptions.Item label="Profile Picture" span={4}>
                        {profile.profilePicture ? (
                            <Image
                                src={profileImage}
                                loading={profileImage == null}
                                style={{ maxWidth: '200px' }}
                            />
                        ) : (
                            <UserOutlined style={{ fontSize: '64px' }} />
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Full Name" span={4}>
                        {profile.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label="University" span={4}>
                        {profile.university}
                    </Descriptions.Item>
                    <Descriptions.Item label="Degree Level" span={4}>
                        {profile.degreeLevel}
                    </Descriptions.Item>
                    <Descriptions.Item label="Faculty" span={4}>
                        {profile.faculty}
                    </Descriptions.Item>
                    <Descriptions.Item label="Course" span={4}>
                        {profile.course}
                    </Descriptions.Item>
                    {profile.startDate && (
                        <Descriptions.Item label="Start Date" span={2}>
                            {new Date(profile.startDate).toLocaleDateString()}
                        </Descriptions.Item>
                    )}
                    {profile.endDate && (
                        <Descriptions.Item label="End Date" span={2}>
                            {new Date(profile.endDate).toLocaleDateString()}
                        </Descriptions.Item>
                    )}
                    {profile.email && (
                        <Descriptions.Item label="Email" span={4}>
                            {profile.email}
                        </Descriptions.Item>
                    )}
                    {profile.emailPersonal && (
                        <Descriptions.Item label="Personal Email" span={4}>
                            {profile.emailPersonal}
                        </Descriptions.Item>
                    )}
                    {profile.phoneWA && (
                        <Descriptions.Item label="Phone" span={4}>
                            {profile.phoneWA}
                        </Descriptions.Item>
                    )}
                    {profile.dob && (
                        <Descriptions.Item label="Date of Birth" span={4}>
                            {new Date(profile.dob).toLocaleDateString()}
                        </Descriptions.Item>
                    )}
                    {profile.originCity && (
                        <Descriptions.Item label="Origin City" span={4}>
                            {profile.originCity}
                        </Descriptions.Item>
                    )}
                    {profile.addressUK && (
                        <Descriptions.Item label="UK Address" span={4}>
                            {profile.addressUK}
                        </Descriptions.Item>
                    )}
                </Descriptions>
            ) : (
                <Skeleton />
            )}
        </Card>
    );
}
