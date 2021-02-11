import React, { useEffect, useState } from 'react';
import { Card, Button, Skeleton, Descriptions, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useAuth } from '../../utils/useAuth';

import { Navigate, useParams } from 'react-router-dom';

import axios from 'axios';

import download from 'downloadjs';

export default function MVPAwardIndexView() {
    const params = useParams();
    const auth = useAuth();
    const [formData, setFormData] = useState(null);
    const [submitter, setSubmitter] = useState(null);
    const [nominee, setNominee] = useState(null);
    const [fileError, setFileError] = useState('');

    const downloadAttachment = () => {
        axios
            .get(
                `/api/forms/mvpawards/submissions/${params.userID}?file=file`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    responseType: 'blob',
                }
            )
            .then((resp) => {
                download(resp.data, 'CV.pdf');
            })
            .catch((data) => {
                if (data.response.status === 404)
                    setFileError('File does not exist');
                else setFileError('Internal server error');
            });
    };

    useEffect(() => {
        axios
            .get(`/api/forms/mvpawards/submissions/${params.userID}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((resp) => {
                setFormData(resp.data.data);
                axios
                    .get(`/api/profiles/${resp.data.data.user}`, {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                    })
                    .then((resp) => setSubmitter(resp.data.data));

                axios
                    .get(`/api/profiles/${resp.data.data.nominatedUser}`, {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                    })
                    .then((resp) => setNominee(resp.data.data));
            });
    }, []);

    if (!auth.user.roles.includes('mvpAwardsAccess'))
        return <Navigate to="/app/profile/me" />;

    return !formData || !submitter || !nominee ? (
        <Card>
            <Skeleton />
        </Card>
    ) : (
        <Card
            title={
                <span>
                    <UserOutlined /> MVP Awards Form Submission -{' '}
                    {submitter.fullName} - {formData.submitterType}
                </span>
            }
        >
            <Descriptions title="Contact Details" bordered size="middle">
                <Descriptions.Item label="Email (Uni)" span={3}>
                    {submitter.email}
                </Descriptions.Item>
                <Descriptions.Item label="Email (Personal)" span={3}>
                    {submitter.emailPersonal}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number" span={3}>
                    {submitter.phoneWA}
                </Descriptions.Item>
            </Descriptions>
            <br />
            <Descriptions title="Summary" bordered size="middle">
                <Descriptions.Item label="Nominated Member" span={3}>
                    {nominee.fullName}
                </Descriptions.Item>

                <Descriptions.Item label="Area of Study" span={3}>
                    {formData.areaOfStudy}
                </Descriptions.Item>

                <Descriptions.Item label="Award Types" span={3}>
                    {formData.awardTypes.map((val) => {
                        return (
                            <>
                                {val}
                                <br />
                            </>
                        );
                    })}
                </Descriptions.Item>
            </Descriptions>
            <br />
            {formData.awardIndicators.map(
                (val) =>
                    val && (
                        <>
                            <Descriptions
                                title={val.award}
                                bordered
                                size="small"
                            >
                                {val.indicators.map((indicator) => (
                                    <Descriptions.Item
                                        key={indicator.name}
                                        label={indicator.name}
                                        span={3}
                                    >
                                        {indicator.subindicators.map(
                                            (subindicator) => (
                                                <>
                                                    <Typography.Text strong>
                                                        {subindicator.name}
                                                    </Typography.Text>
                                                    <br />
                                                    <Typography.Text>
                                                        {
                                                            subindicator.elaboration
                                                        }
                                                    </Typography.Text>
                                                    <br />
                                                    <br />
                                                </>
                                            )
                                        )}
                                    </Descriptions.Item>
                                ))}
                            </Descriptions>
                            <br />
                        </>
                    )
            )}

            <Descriptions size="middle" bordered title="Supporting Documents">
                <Descriptions.Item span={3} label="CV">
                    <Button onClick={downloadAttachment}>Download File</Button>
                    <Typography.Text type="danger">{fileError}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Statement">
                    {formData.statement}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
}
