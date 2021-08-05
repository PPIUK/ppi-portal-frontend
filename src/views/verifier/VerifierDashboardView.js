import { FileSearchOutlined, FlagOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row, Statistic, Table, Tag } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';

const columns = [
    {
        title: 'Name',
        dataIndex: 'fullName',
        key: 'name',
    },
    {
        title: 'Action',
        key: 'action',
        // eslint-disable-next-line react/display-name
        render: (text, record) => (
            <Link to={`/app/verifier/review/${record._id}`}>
                <Tag color="green">Review</Tag>
            </Link>
        ),
    },
];

export default function VerifierDashboardView() {
    const auth = useAuth();
    const [pending, setPending] = useState(null);
    const [flagged, setFlagged] = useState(null);

    useEffect(() => {
        Axios.get('/api/verifier/pending', {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => setPending(res.data.profiles));
        Axios.get('/api/verifier/flagged', {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => setFlagged(res.data.profiles));
    }, []);
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card>
                        <Row>
                            <Col flex="1 1 0px">
                                <Row justify="center">
                                    <Col>
                                        <Statistic
                                            title="Pending (Unverified)"
                                            prefix={<FileSearchOutlined />}
                                            value={pending ? pending.length : 0}
                                            loading={pending === null}
                                            valueStyle={{
                                                color: '#3f8600',
                                                textAlign: 'center',
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col flex="0">
                                <Divider
                                    type="vertical"
                                    style={{ height: '100%' }}
                                />
                            </Col>
                            <Col flex="1 1 0px">
                                <Row justify="center">
                                    <Col>
                                        <Statistic
                                            title="Flagged"
                                            prefix={<FlagOutlined />}
                                            value={flagged ? flagged.length : 0}
                                            loading={flagged === null}
                                            valueStyle={{
                                                color: '#cf1322',
                                                textAlign: 'center',
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col flex="1 1 0px">
                    <Card>
                        <Table columns={columns} dataSource={pending} />
                    </Card>
                </Col>
                <Col flex="1 1 0px">
                    <Card>
                        <Table columns={columns} dataSource={flagged} />
                    </Card>
                </Col>
            </Row>
        </>
    );
}
