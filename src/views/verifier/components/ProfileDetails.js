import { DownloadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Descriptions, Image, Tag } from 'antd';
import Axios from 'axios';
import download from 'downloadjs';
import React, { useState } from 'react';
import { useAuth } from '../../../utils/useAuth';

export default function ProfileDetails({ profileData }) {
    const auth = useAuth();
    const [profileImage, setProfileImage] = useState(null);
    Axios.get(`/api/profiles/${profileData._id}/profilepicture`, {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
        responseType: 'blob',
    }).then((res) => {
        let reader = new FileReader();
        reader.readAsDataURL(res.data);
        reader.onload = () => setProfileImage(reader.result);
    });
    return (
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
            <Descriptions.Item label="Email Verification Status" span={4}>
                <Tag color={profileData.emailVerified ? 'green' : 'red'}>
                    {profileData.emailVerified ? 'Verified' : 'Unverified'}
                </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Proof of Student Status" span={4}>
                {profileData.studentProof ? (
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={() =>
                            Axios.get(
                                `/api/profiles/${profileData._id}/studentproof`,
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
    );
}
