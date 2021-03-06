import {
    Button,
    Card,
    Form,
    Input,
    Layout,
    Modal,
    Popconfirm,
    Radio,
    Select,
    Typography,
    Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
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

    const [abstractFileList, setAbstractFileList] = useState([]);
    const [studentId1FileList, setStudentId1FileList] = useState([]);
    const [studentId2FileList, setStudentId2FileList] = useState([]);
    const [ktp1FileList, setKtp1FileList] = useState([]);
    const [ktp2FileList, setKtp2FileList] = useState([]);

    const [isUploading, setIsUploading] = useState(false);

    const navigate = useNavigate();

    const beforeUpload = (type, file) => {
        switch (type) {
            case 'abstract':
                setAbstractFileList([file]);
                break;
            case 'studentId1':
                setStudentId1FileList([file]);
                break;
            case 'studentId2':
                setStudentId2FileList([file]);
                break;
            case 'ktp1':
                setKtp1FileList([file]);
                break;
            case 'ktp2':
                setKtp2FileList([file]);
                break;
        }
        return false;
    };

    const onRemove = (type) => {
        switch (type) {
            case 'abstract':
                setAbstractFileList([]);
                return abstractFileList;
            case 'studentId1':
                setStudentId1FileList([]);
                return studentId1FileList;
            case 'studentId2':
                setStudentId2FileList([]);
                return studentId2FileList;
            case 'ktp1':
                setKtp1FileList([]);
                return ktp1FileList;
            case 'ktp2':
                setKtp2FileList([]);
                return ktp2FileList;
        }
    };

    const [form] = Form.useForm();

    const submissionTypes = [
        { label: 'Individual', value: 'Individual' },
        { label: 'Collaboration', value: 'Collaboration' },
    ];

    const onSubmissionTypeChange = (e) => {
        setSubmissionType(e.target.value);
        if (e.target.value === 'Collaboration') {
            setIsCollaboration(true);
        } else {
            setIsCollaboration(false);
        }
    };

    const submit = (vals) => {
        setIsUploading(true);

        const abstractFormData = new FormData();
        abstractFileList.forEach((file) => {
            abstractFormData.append('files[]', file);
        });

        const studentId1FormData = new FormData();
        studentId1FileList.forEach((file) => {
            studentId1FormData.append('files[]', file);
        });

        const ktp1FormData = new FormData();
        ktp1FileList.forEach((file) => {
            ktp1FormData.append('files[]', file);
        });

        const studentId2FormData = new FormData();
        studentId2FileList.forEach((file) => {
            studentId2FormData.append('files[]', file);
        });

        const ktp2FormData = new FormData();
        ktp2FileList.forEach((file) => {
            ktp2FormData.append('files[]', file);
        });

        let submissionId = '';

        axios
            .post('/api/forms/isicsciessay/submit', vals)
            .then((res) => {
                console.log(res.data.submissionId);
                submissionId = res.data.submissionId;
                return axios.post(
                    `/api/forms/isicsciessay/${submissionId}/abstract`,
                    abstractFormData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            })
            .then(() => {
                return axios.post(
                    `/api/forms/isicsciessay/${submissionId}/studentID/1`,
                    studentId1FormData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            })
            .then(() => {
                return axios.post(
                    `/api/forms/isicsciessay/${submissionId}/ktp/1`,
                    ktp1FormData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            })
            .then(() => {
                if (isCollaboration) {
                    return axios.post(
                        `/api/forms/isicsciessay/${submissionId}/studentID/2`,
                        studentId2FormData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );
                }
            })
            .then(() => {
                if (isCollaboration) {
                    return axios.post(
                        `/api/forms/isicsciessay/${submissionId}/ktp/2`,
                        ktp2FormData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );
                }
            })
            .then(() => {
                return axios.post('/api/forms/isicsciessay/submit', {
                    ...vals,
                    abstractSubmitted: true,
                });
            })
            .then(() => {
                setIsUploading(false);
                navigate(`/essay-isic-sci-2021/${submissionId}/submitted`);
            })
            .catch((error) => {
                Modal.error({
                    title: 'Error',
                    content: error.response.data.message,
                });
                setIsUploading(false);
            });
    };

    useEffect(() => {
        document.title = 'ISIC x SCI 2021 Essay Competition';
    });

    return (
        <Layout
            style={{
                background:
                    'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(0,212,240,1) 20%, rgba(4,0,255,1) 100%',
                minHeight: '100vh',
            }}
        >
            <Content
                style={{
                    margin: '24px 16px',
                    marginTop: 24,
                    padding: 24,
                    minHeight: '100vh',
                    overflow: 'initial',
                }}
            >
                <Card>
                    <Typography.Title level={2} style={{ textAlign: 'center' }}>
                        <a href="http://isic2021.ppiuk.org/essay-competition/">
                            ISIC X SCI 2021 Essay Competition
                        </a>
                    </Typography.Title>
                    <Typography.Title level={3} style={{ textAlign: 'center' }}>
                        Registration & Abstract Submission
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
                                {
                                    required: true,
                                    message: 'Please choose the topic!',
                                },
                            ]}
                        >
                            <Select>
                                <Option value="01">01. STEM</Option>
                                <Option value="02">
                                    02. Built Environment & Infrastructure
                                </Option>
                                <Option value="03">
                                    03. Business and Economics
                                </Option>
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
                                {
                                    required: true,
                                    message: 'Please input the title!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Submission Type"
                            name="submissionType"
                        >
                            <Radio.Group
                                options={submissionTypes}
                                onChange={onSubmissionTypeChange}
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                isCollaboration
                                    ? 'Author 1 Name'
                                    : 'Author Name'
                            }
                            name="name1"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={
                                isCollaboration
                                    ? "Author 1's University"
                                    : "Author's University"
                            }
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
                            label={
                                isCollaboration
                                    ? "Author 1's Major"
                                    : "Author's Major"
                            }
                            name="major1"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the major!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={
                                isCollaboration
                                    ? "Author 1's Valid Student ID #"
                                    : "Author's Valid Student ID #"
                            }
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

                        <Form.Item
                            label={
                                isCollaboration
                                    ? "Author 1's Valid Student ID"
                                    : "Author's Valid Student ID"
                            }
                            name="studentId1"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please choose the valid student ID file!',
                                    validator: () => {
                                        if (studentId1FileList.length === 1) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject();
                                    },
                                },
                            ]}
                        >
                            <Upload
                                maxCount={1}
                                accept=".gif,.jpg,.jpeg,.png"
                                beforeUpload={(file) =>
                                    beforeUpload('studentId1', file)
                                }
                                onRemove={() => onRemove('studentId1')}
                                fileList={studentId1FileList}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Select File
                                </Button>
                                <Typography>
                                    (.gif/.jpg/.jpeg/.png file only, max: 5 MB)
                                </Typography>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label={
                                isCollaboration
                                    ? "Author 1's KTP/Passport #"
                                    : "Author's KTP/Passport #"
                            }
                            name="ktpPassportNumber1"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input the KTP/Passport number!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={
                                isCollaboration
                                    ? "Author 1's KTP/Passport"
                                    : "Author's KTP/Passport"
                            }
                            name="ktpPassport1"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please choose the valid KTP/Passport file!',
                                    validator: () => {
                                        if (ktp1FileList.length === 1) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject();
                                    },
                                },
                            ]}
                        >
                            <Upload
                                maxCount={1}
                                accept=".gif,.jpg,.jpeg,.png"
                                beforeUpload={(file) =>
                                    beforeUpload('ktp1', file)
                                }
                                onRemove={() => onRemove('ktp1')}
                                fileList={ktp1FileList}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Select File
                                </Button>
                                <Typography>
                                    (.gif/.jpg/.jpeg/.png file only, max: 5 MB)
                                </Typography>
                            </Upload>
                        </Form.Item>

                        {submissionType === 'Collaboration' && (
                            <>
                                <Form.Item
                                    label="Author 2 Name"
                                    name="name2"
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
                                    label="Author 2's University"
                                    name="university2"
                                    rules={[
                                        {
                                            required: { isCollaboration },
                                            message:
                                                'Please input the university!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Author 2's Major"
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
                                    label="Author 2's Valid Student ID #"
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

                                <Form.Item
                                    label="Author 2's Valid Student ID"
                                    name="studentId2"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please choose the valid student ID file!',
                                            validator: () => {
                                                if (
                                                    isCollaboration &&
                                                    studentId2FileList.length !==
                                                        1
                                                ) {
                                                    return Promise.reject();
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Upload
                                        maxCount={1}
                                        accept=".gif,.jpg,.jpeg,.png"
                                        beforeUpload={(file) =>
                                            beforeUpload('studentId2', file)
                                        }
                                        onRemove={() => onRemove('studentId2')}
                                        fileList={studentId2FileList}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Select File
                                        </Button>
                                        <Typography>
                                            (.gif/.jpg/.jpeg/.png file only,
                                            max: 5 MB)
                                        </Typography>
                                    </Upload>
                                </Form.Item>

                                <Form.Item
                                    label="Author 2's KTP/Passport #"
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

                                <Form.Item
                                    label="Author 2's KTP/Passport"
                                    name="ktpPassport2"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please choose the valid KTP/Passport file!',
                                            validator: () => {
                                                if (
                                                    isCollaboration &&
                                                    ktp2FileList.length !== 1
                                                ) {
                                                    return Promise.reject();
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <Upload
                                        maxCount={1}
                                        accept=".gif,.jpg,.jpeg,.png"
                                        beforeUpload={(file) =>
                                            beforeUpload('ktp2', file)
                                        }
                                        onRemove={() => onRemove('ktp2')}
                                        fileList={ktp2FileList}
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Select File
                                        </Button>
                                        <Typography>
                                            (.gif/.jpg/.jpeg/.png file only,
                                            max: 5 MB)
                                        </Typography>
                                    </Upload>
                                </Form.Item>
                            </>
                        )}

                        <Form.Item
                            label={
                                isCollaboration
                                    ? 'Email Address (Main Author)'
                                    : 'Email Address'
                            }
                            name="emailAddressMain"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input the email address of the main author!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={
                                isCollaboration
                                    ? 'Phone Number (Main Author)'
                                    : 'Phone Number'
                            }
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

                        <Form.Item
                            label="Abstract"
                            name="abstract"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose the abstract file!',
                                },
                                () => ({
                                    validator() {
                                        if (abstractFileList.length === 1) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject();
                                    },
                                }),
                            ]}
                        >
                            <Upload
                                maxCount={1}
                                accept=".doc,.docx"
                                beforeUpload={(file) =>
                                    beforeUpload('abstract', file)
                                }
                                onRemove={() => onRemove('abstract')}
                                fileList={abstractFileList}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Select File
                                </Button>
                                <Typography>
                                    (.doc/.docx file only, max: 5 MB)
                                </Typography>
                            </Upload>
                        </Form.Item>

                        <Popconfirm
                            title="Are you sure? You cannot edit or resubmit after submitting"
                            onConfirm={() => form.submit()}
                            placement="topLeft"
                        >
                            <Form.Item {...tailLayout}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isUploading}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Popconfirm>
                    </Form>

                    <Card style={{ textAlign: 'center' }}>
                        <Typography>
                            If there is any question, kindly seek advice from
                            the committee and contact us at:
                        </Typography>
                        <Typography>
                            Email:{' '}
                            <a href="mailto:isicxsci@gmail.com">
                                isicxsci@gmail.com
                            </a>
                        </Typography>
                        <Typography>Phone: +447927878411 (Ilham) </Typography>
                        <Typography>
                            Instagram:{' '}
                            <a href={'https://www.instagram.com/isic.ppiuk/'}>
                                @isic.ppiuk
                            </a>
                        </Typography>
                    </Card>
                </Card>
            </Content>
        </Layout>
    );
}

export default IsicSciEssayFormView;
