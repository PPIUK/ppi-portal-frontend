import {
    Button,
    Card,
    Form,
    Input,
    Modal,
    Popconfirm,
    Radio,
    Select,
    Typography,
    Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import axios from 'axios';

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

function IsicSciEssayFormView() {
    const [submissionType, setSubmissionType] = useState('Individual');
    const [isCollaboration, setIsCollaboration] = useState(false);
    const [form] = Form.useForm();

    const submissionTypes = [
        { label: 'Individual', value: 'Individual' },
        { label: 'Collaboration', value: 'Collaboration' },
    ];

    const onSubmissionTypeChange = (e) => {
        setSubmissionType(e.target.value);
        if (submissionType === 'Collaboration') {
            setIsCollaboration(true);
        } else {
            setIsCollaboration(false);
        }
    };

    const submit = (vals) => {
        axios
            .post('/api/forms/isicsciessay/submit', vals)
            .then(() => {
                Modal.info({
                    title: 'Form Submitted',
                    content: 'Form has been submitted successfully!',
                });
            })
            .catch((error) => {
                Modal.error({
                    title: 'Error',
                    content: error.response.data.message,
                });
            });
    };

    return (
        <Card>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                ISIC X SCI 2021 Essay Competition
            </Typography.Title>

            <Form
                {...layout}
                form={form}
                onFinish={submit}
                requiredMark={false}
                initialValues={{ submissionType: 'Individual' }}
            >
                <Form.Item
                    label="Topic"
                    name="topic"
                    rules={[
                        { required: true, message: 'Please choose the topic!' },
                    ]}
                >
                    <Select>
                        <Option value="01">01. STEM</Option>
                        <Option value="02">
                            02. Built Environment & Infrastructure
                        </Option>
                        <Option value="03">03. Business and Economics</Option>
                        <Option value="04">04. Health</Option>
                        <Option value="05">05. Education</Option>
                        <Option value="06">
                            06. Political Science and Law
                        </Option>
                        <Option value="07">07. Energy</Option>
                        <Option value="08">
                            08. Social Development, Arts and Humanities
                        </Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        { required: true, message: 'Please choose the topic!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Submission Type" name="submissionType">
                    <Radio.Group
                        options={submissionTypes}
                        onChange={onSubmissionTypeChange}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>

                <Form.Item
                    label="Name User 1"
                    name="userName1"
                    rules={[
                        { required: true, message: 'Please input the name!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="University User 1"
                    name="university1"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the university!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Major User 1"
                    name="major1"
                    rules={[
                        { required: true, message: 'Please input the major!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Valid Student ID Number User 1"
                    name="studentIdNumber1"
                    rules={[
                        {
                            required: true,
                            message:
                                'Please input the valid student ID number!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Valid Student ID 1" name="studentId1">
                    <Upload maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="KTP/Passport Number User 1"
                    name="ktpPassportNumber1"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the KTP/Passport number!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="KTP/Passport 1" name="ktpPassport1">
                    <Upload maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                {submissionType === 'Collaboration' && (
                    <>
                        <Form.Item
                            label="Name User 2"
                            name="userName2"
                            rules={[
                                {
                                    required: { isCollaboration },
                                    message: 'Please input the name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="University User 2"
                            name="university2"
                            rules={[
                                {
                                    required: { isCollaboration },
                                    message: 'Please input the university!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Major User 2"
                            name="major2"
                            rules={[
                                {
                                    required: { isCollaboration },
                                    message: 'Please input the major!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Valid Student ID Number User 2"
                            name="studentIdNumber2"
                            rules={[
                                {
                                    required: { isCollaboration },
                                    message:
                                        'Please input the valid student ID number!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Valid Student ID 2" name="studentId2">
                            <Upload maxCount={1}>
                                <Button icon={<UploadOutlined />}>
                                    Select File
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="KTP/Passport Number User 2"
                            name="ktpPassportNumber2"
                            rules={[
                                {
                                    required: { isCollaboration },
                                    message:
                                        'Please input the KTP/Passport number!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="KTP/Passport 2" name="ktpPassport2">
                            <Upload maxCount={1}>
                                <Button icon={<UploadOutlined />}>
                                    Select File
                                </Button>
                            </Upload>
                        </Form.Item>
                    </>
                )}

                <Form.Item
                    label="Email Address (main author)"
                    name="emailAddressMain"
                    rules={[
                        {
                            required: true,
                            message:
                                'Please choose the email address of the main author!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone Number (main author)"
                    name="phoneNumberMain"
                    rules={[
                        {
                            required: true,
                            message:
                                'Please input the phone number of the main author!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Essay" name="essay">
                    <Upload maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                <Popconfirm
                    title="Are you sure? You cannot edit or resubmit after submitting"
                    onConfirm={() => form.submit()}
                    placement="topLeft"
                >
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Popconfirm>
            </Form>
        </Card>
    );
}

export default IsicSciEssayFormView;
