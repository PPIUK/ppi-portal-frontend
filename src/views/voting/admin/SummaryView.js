import { FormOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Table,
    Tag,
    Input,
    Form,
    Modal,
    Upload,
    DatePicker,
    message,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../utils/useAuth';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Status',
        key: 'status',
        // eslint-disable-next-line react/display-name
        render: (text, record) => {
            let now = new Date();
            if (now >= new Date(record.nominateEnd)) return 'Post Nomination'; // TODO: check the rounds
            if (now >= new Date(record.nominateStart)) return 'Nomination';
            return 'Inactive';
        },
    },
    {
        title: 'Action',
        key: 'action',
        // eslint-disable-next-line react/display-name
        render: (text, record) => (
            <Link to={`/app/voting/${record._id}/admin`}>
                <Tag color="green">View</Tag>
            </Link>
        ),
    },
];

export default function ElectionSummaryView() {
    const auth = useAuth();
    const [form] = useForm();

    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [bannerList, setBannerList] = useState([]);

    useState(() => {
        Axios.get('/api/voting', {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => setData(res.data.data));
        return () => message.destroy('saveProfileLoading');
    }, []);

    const submitForm = (vals) => {
        let formData = new FormData();
        for (const name in vals) {
            if (vals[name]) {
                formData.append(name, vals[name]);
            }
        }
        formData.append('public', true);
        if (bannerList.length > 0) {
            formData.append('campaignBannerFile', bannerList[0].originFileObj);
        }
        message.loading(
            {
                content: 'Submitting form...',
                key: 'saveProfileLoading',
            },
            0
        );
        Axios.post('/api/voting/admin', formData, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                message.success(
                    {
                        content: 'Election created!',
                        key: 'saveProfileLoading',
                    },
                    4.5
                );
                form.resetFields();
                setModalVisible(false);
            })
            .catch((e) => {
                message.error({
                    content: `Failed to submit: ${e.response.data.message}`,
                    key: 'saveProfileLoading',
                });
            });
    };
    return (
        <>
            <Modal
                visible={modalVisible}
                onOk={() => form.submit()}
                onCancel={() => {
                    form.resetFields();
                    setModalVisible(false);
                }}
                okText="Submit"
                closable={false}
                maskClosable={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="someformidk"
                    onFinish={submitForm}
                >
                    <Form.Item
                        name="name"
                        label="Election Name"
                        rules={[{ required: true }]}
                        hasFeedback
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea placeholder="Description" rows={4} />
                    </Form.Item>
                    <Form.Item name="banner" label="Banner">
                        <Upload
                            accept="image/*"
                            maxCount={1}
                            listType="picture-card"
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: false,
                            }}
                            onChange={(e) =>
                                setBannerList([...e.fileList].slice(-1))
                            }
                            fileList={bannerList}
                            beforeUpload={() => false}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>
                                    {bannerList.length > 0
                                        ? 'Replace'
                                        : 'Upload'}{' '}
                                    Banner
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="voterCutOffEndDate"
                        label="Voter Eligibility Cutoff Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="voterMastersCutOffStartDate"
                        label="Masters' Voters Eligibility Start Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="nominateStart"
                        label="Nomination Phase Start Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        name="nominateEnd"
                        label="Nomination Phase End Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                </Form>
            </Modal>
            <Card
                title={
                    <span>
                        <FormOutlined />
                        &nbsp; Elections
                    </span>
                }
                extra={
                    <Button
                        type="primary"
                        onClick={() => setModalVisible(true)}
                    >
                        + Create Election
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={data === null}
                ></Table>
            </Card>
        </>
    );
}
