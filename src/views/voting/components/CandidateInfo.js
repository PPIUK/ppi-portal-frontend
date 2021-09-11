import React from 'react';
import { Image, Space, Typography, List, Button } from 'antd';
import download from 'downloadjs';
import Axios from 'axios';
import { useAuth } from '../../../utils/useAuth';
import { useParams } from 'react-router';

const titleMap = {
    cv: 'CV',
    organisationExp: 'Organisation Experience',
    notInOfficeStatement: 'Not In Office Statement',
    motivationEssay: 'Motivation Essay',
};

export default function CandidateInfo({ profile, submission }) {
    const auth = useAuth();
    const { electionID } = useParams();
    return (
        <Space direction="vertical" size={36}>
            <Space align="start" size={12}>
                {profile.profilePicture && (
                    <Image width={100} src={profile.profilePicture} />
                )}
                <Space direction="vertical" align="start">
                    <Typography.Title level={5}>
                        {profile.fullName}
                    </Typography.Title>
                    <Typography.Text>
                        {`${profile.degreeLevel} ${profile.course}, ${profile.university}`}
                    </Typography.Text>
                </Space>
            </Space>
            <List
                size="large"
                itemLayout="horizontal"
                dataSource={Object.entries(submission)}
                renderItem={([key, value]) => {
                    if (['_id', 'candidateID'].includes(key)) return null;
                    if (key === 'videoLink')
                        return (
                            <List.Item
                                actions={[
                                    <a
                                        key={key}
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Typography.Link>URL</Typography.Link>
                                    </a>,
                                ]}
                            >
                                <List.Item.Meta title="Video" />
                            </List.Item>
                        );
                    return (
                        <List.Item
                            actions={[
                                <Button
                                    key={key}
                                    type="primary"
                                    onClick={() =>
                                        Axios.get(
                                            `/api/voting/${electionID}/submission/${profile._id}/${key}`,
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${auth.accessToken}`,
                                                },
                                                responseType: 'blob',
                                            }
                                        ).then((resp) => {
                                            const headerVal =
                                                resp.headers[
                                                    'content-disposition'
                                                ];
                                            const filename = headerVal
                                                .split(';')[1]
                                                .split('=')[1]
                                                .replace('"', '')
                                                .replace('"', '');
                                            download(resp.data, filename);
                                        })
                                    }
                                >
                                    Download
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta title={titleMap[key]} />
                        </List.Item>
                    );
                }}
            />
        </Space>
    );
}
