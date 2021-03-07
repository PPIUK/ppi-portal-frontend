import { Button, Card, message, Space, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/useAuth';
import { Navigate } from 'react-router-dom';

import axios from 'axios';
import download from 'downloadjs';
import { CSVLink } from 'react-csv';

function IsicSciEssaySubmissionView() {
    const [formData, setFormData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const auth = useAuth();

    const downloadZip = (type) => {
        axios
            .get(`/api/forms/isicsciessay/${type}/all`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                responseType: 'blob',
            })
            .then((resp) => {
                download(resp.data, `${type}-${new Date().toISOString()}.zip`);
            })
            .catch((data) => {
                if (data.response.status === 404)
                    message.error('File does not exist');
                else message.error('Internal server error');
            });
    };

    const downloadFile = (type, params) => {
        let uri = '';
        if (type === 'abstract') {
            uri = `/api/forms/isicsciessay/${params.id}/abstract`;
        } else if (type === 'studentId') {
            uri = `/api/forms/isicsciessay/${params.id}/studentID/${params.authorNo}`;
        } else if (type === 'ktp') {
            uri = `/api/forms/isicsciessay/${params.id}/ktp/${params.authorNo}`;
        }
        axios
            .get(uri, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                responseType: 'blob',
            })
            .then((resp) => {
                let headerLine = resp.headers['content-disposition'];
                let startFileNameIndex = headerLine.indexOf('=') + 1;
                let filename = headerLine.substring(
                    startFileNameIndex,
                    headerLine.length
                );
                download(resp.data, filename);
            })
            .catch((data) => {
                if (data.response.status === 404)
                    message.error('File does not exist');
                else message.error('Internal server error');
            });
    };

    const downloadAbstractLink = (text, record) => (
        <a onClick={() => downloadFile('abstract', { id: record._id })}>
            Download
        </a>
    );

    const downloadStudentId1Link = (text, record) => (
        <a
            onClick={() =>
                downloadFile('studentId', { id: record._id, authorNo: 1 })
            }
        >
            Download
        </a>
    );

    const downloadStudentId2Link = (text, record) => {
        if (record.studentIdNumber2) {
            return (
                <a
                    onClick={() =>
                        downloadFile('studentId', {
                            id: record._id,
                            authorNo: 2,
                        })
                    }
                >
                    Download
                </a>
            );
        }
    };

    const downloadKtp1Link = (text, record) => (
        <a onClick={() => downloadFile('ktp', { id: record._id, authorNo: 1 })}>
            Download
        </a>
    );

    const downloadKtp2Link = (text, record) => {
        if (record.ktpPassportNumber2) {
            return (
                <a
                    onClick={() =>
                        downloadFile('ktp', {
                            id: record._id,
                            authorNo: 2,
                        })
                    }
                >
                    Download
                </a>
            );
        }
    };

    const columns = [
        {
            title: 'No',
            key: 'index',
            render: (value, item, index) => (page - 1) * pageSize + index + 1,
        },
        {
            title: 'Submission ID',
            dataIndex: '_id',
            key: 'id',
        },
        {
            title: 'Topic',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Abstract File',
            key: 'abstractFile',
            render: downloadAbstractLink,
        },
        {
            title: 'Submission Type',
            dataIndex: 'submissionType',
            key: 'submissionType',
        },
        {
            title: 'Author 1 Name',
            dataIndex: 'name1',
            key: 'name1',
        },
        {
            title: 'Author 1 University',
            dataIndex: 'university1',
            key: 'university1',
        },
        {
            title: 'Author 1 Major',
            dataIndex: 'major1',
            key: 'major1',
        },
        {
            title: 'Student ID # Author 1',
            dataIndex: 'studentIdNumber1',
            key: 'studentIdNumber1',
        },
        {
            title: 'Student ID Author 1 File',
            key: 'studentId1File',
            render: downloadStudentId1Link,
        },
        {
            title: 'KTP/Passport # Author 1',
            dataIndex: 'ktpPassportNumber1',
            key: 'ktpPassportNumber1',
        },
        {
            title: 'KTP/Passport Author 1 File',
            key: 'ktp1File',
            render: downloadKtp1Link,
        },
        {
            title: 'Email Address (Main Author)',
            dataIndex: 'emailAddressMain',
            key: 'emailAddressMain',
        },
        {
            title: 'Phone Number (Main Author)',
            dataIndex: 'phoneNumberMain',
            key: 'phoneNumberMain',
        },
        {
            title: 'Author 2 Name',
            dataIndex: 'name2',
            key: 'name2',
        },
        {
            title: 'Author 2 University',
            dataIndex: 'university2',
            key: 'university2',
        },
        {
            title: 'Author 2 Major',
            dataIndex: 'major2',
            key: 'major2',
        },
        {
            title: 'Student ID # Author 2',
            dataIndex: 'studentIdNumber2',
            key: 'studentIdNumber2',
        },
        {
            title: 'Student ID Author 2 File',
            key: 'studentId2File',
            render: downloadStudentId2Link,
        },
        {
            title: 'KTP/Passport # Author 2',
            dataIndex: 'ktpPassportNumber2',
            key: 'ktpPassportNumber2',
        },
        {
            title: 'KTP/Passport Author 2 File',
            key: 'ktp2File',
            render: downloadKtp2Link,
        },
    ];

    useEffect(() => {
        axios
            .get('/api/forms/isicsciessay/submissions/all', {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
            .then((res) => {
                setFormData(res.data.data);
            });
    }, []);

    if (!auth.user.roles.includes('isicSciEssayAccess'))
        return <Navigate to="/app/profile/me" />;

    return (
        <Card>
            <Typography.Title level={3}>
                ISIC x SCI Essay 2021 Essay Competition
            </Typography.Title>
            <Typography.Title level={4}>Submissions</Typography.Title>

            <Space>
                <CSVLink
                    filename={`ISICxSCIEssaySubmissions-${new Date().toISOString()}.csv`}
                    data={formData}
                >
                    <Button type="primary">Download Submissions CSV</Button>
                </CSVLink>

                <Button type="primary" onClick={() => downloadZip('abstracts')}>
                    Download All Abstracts
                </Button>

                <Button type="primary" onClick={() => downloadZip('IDs')}>
                    Download All IDs
                </Button>
            </Space>

            <Table
                dataSource={formData}
                columns={columns}
                scroll={{ x: true }}
                pagination={{
                    onChange(current) {
                        setPage(current);
                    },
                    onShowSizeChange(current, size) {
                        setPageSize(size);
                    },
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 20, 50, 100],
                }}
            />
        </Card>
    );
}

export default IsicSciEssaySubmissionView;
