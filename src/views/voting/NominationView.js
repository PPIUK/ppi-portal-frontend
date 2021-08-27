import React, { useEffect, useState } from 'react';
import {
    Card,
    Image,
    Skeleton,
    Form,
    Descriptions,
    Space,
    Button,
    Upload,
    Input,
    Alert,
    Tooltip,
    Badge,
    message,
} from 'antd';
import { useNavigate, useParams } from 'react-router';
import Axios from 'axios';
import { useAuth } from '../../utils/useAuth';
import {
    DownloadOutlined,
    QuestionCircleOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import download from 'downloadjs';

export default function NominationView() {
    const auth = useAuth();
    const { electionID } = useParams();
    const [electionData, setElectionData] = useState(null);
    const [electionBanner, setElectionBanner] = useState(null);
    const [submissionData, setSubmissionData] = useState(undefined);

    const [cvFileList, setCVFileList] = useState([]);
    const [orgExp, setOrgExp] = useState([]);
    const [essay, setEssay] = useState([]);
    const [notInOffice, setNotInOffice] = useState([]);

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const currentTime = new Date();

    useEffect(() => {
        Axios.get(`/api/voting/${electionID}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })
            .then((res) => setElectionData(res.data.data))
            .catch(() => navigate('/app/profile/me'));
        Axios.get(`/api/voting/${electionID}/submission`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })
            .then((res) => setSubmissionData(res.data.data))
            .catch(() => setSubmissionData({ new: true }));
        Axios.get(`/api/voting/${electionID}/banner`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            responseType: 'blob',
        })
            .then((res) => {
                let reader = new FileReader();
                reader.readAsDataURL(res.data);
                reader.onload = () => setElectionBanner(reader.result);
            })
            .catch(() => setElectionBanner(null));
        return () => message.destroy('saveLoading');
    }, [electionID]);

    const formSubmit = (vals) => {
        let formData = new FormData();
        formData.append('candidateID', auth.user._id);
        for (const name in vals) {
            if (vals[name]) {
                formData.append(name, vals[name]);
            }
        }
        if (cvFileList.length > 0) {
            formData.append('cv', cvFileList[0].originFileObj);
        }
        if (orgExp.length > 0) {
            formData.append('organisationExp', orgExp[0].originFileObj);
        }
        if (essay.length > 0) {
            formData.append('motivationEssay', essay[0].originFileObj);
        }
        if (notInOffice.length > 0) {
            formData.append(
                'notInOfficeStatement',
                notInOffice[0].originFileObj
            );
        }
        message.loading(
            {
                content: 'Saving submission...',
                key: 'saveLoading',
            },
            0
        );
        let req;
        if (submissionData.new)
            req = Axios.post(`/api/voting/${electionID}/submission`, formData, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                'Content-Type': 'multipart/form-data',
            });
        else
            req = Axios.patch(
                `/api/voting/${electionID}/submission`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    'Content-Type': 'multipart/form-data',
                }
            );
        req.then(() => {
            setSubmissionData({ ...submissionData, ...{ new: false } });
            message.success({
                content: 'Saved successfully!',
                key: 'saveLoading',
            });
        }).catch((e) =>
            message.error({
                content: `Error: ${e.response.data.message}`,
                key: 'saveLoading',
            })
        );
    };

    const downloadFile = (endpoint) => () => {
        Axios.get(
            `/api/voting/${electionID}/submission/${auth.user._id}/${endpoint}`,
            {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                responseType: 'blob',
            }
        ).then((resp) => {
            const headerVal = resp.headers['content-disposition'];
            const filename = headerVal
                .split(';')[1]
                .split('=')[1]
                .replace('"', '')
                .replace('"', '');
            download(resp.data, filename);
        });
    };

    return electionData && submissionData !== undefined ? (
        <>
            {electionBanner && (
                <Image src={electionBanner} width="100%" preview={false} />
            )}
            {currentTime >= new Date(electionData.nominateStart) &&
                currentTime <= new Date(electionData.nominateEnd) && (
                    <Card title={electionData.name}>
                        {!auth.user.studentProof && (
                            <Alert
                                message="You do not currently have student proof uploaded, please go to My Profile and upload it or your submission will be considered invalid"
                                type="warning"
                                showIcon
                            />
                        )}
                        {!submissionData.new && (
                            <Alert
                                message={
                                    'Thank you for your submission. ' +
                                    'You are allowed to complete or update your submission until the ' +
                                    'deadline. The successful candidate will be announced in due course. ' +
                                    'Follow our Instagram account @kpuppi_unitedkingdom or ' +
                                    'explore the hashtag #PPIUKMemilih for any update about PPI UK General ' +
                                    'Election 2021. Send us your enquiries to kpuppiuk@gmail.com'
                                }
                                type="success"
                                showIcon
                            />
                        )}
                        <Form form={form} onFinish={formSubmit}>
                            <Descriptions bordered>
                                <Descriptions.Item label="CV (pdf)" span={3}>
                                    <Form.Item name="cv" noStyle>
                                        <Space>
                                            {submissionData.cv ? (
                                                <Button
                                                    type="primary"
                                                    icon={<DownloadOutlined />}
                                                    onClick={downloadFile('cv')}
                                                >
                                                    Download Saved File
                                                </Button>
                                            ) : null}
                                            <Upload
                                                maxCount={1}
                                                onChange={(e) =>
                                                    setCVFileList(
                                                        [...e.fileList].slice(
                                                            -1
                                                        )
                                                    )
                                                }
                                                fileList={cvFileList}
                                                beforeUpload={() => false}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    Click to Upload New File
                                                </Button>
                                            </Upload>
                                        </Space>
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label="Organisation Experience Proof (pdf)"
                                    span={3}
                                >
                                    <Form.Item name="organisationExp" noStyle>
                                        <Space>
                                            {submissionData.organisationExp ? (
                                                <Button
                                                    type="primary"
                                                    icon={<DownloadOutlined />}
                                                    onClick={downloadFile(
                                                        'organisationExp'
                                                    )}
                                                >
                                                    Download Saved File
                                                </Button>
                                            ) : null}
                                            <Upload
                                                maxCount={1}
                                                onChange={(e) =>
                                                    setOrgExp(
                                                        [...e.fileList].slice(
                                                            -1
                                                        )
                                                    )
                                                }
                                                fileList={orgExp}
                                                beforeUpload={() => false}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    Click to Upload New File
                                                </Button>
                                            </Upload>
                                        </Space>
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Tooltip title="Motivation Essay (800-1000 words)">
                                            Motivation Essay (pdf) &nbsp;
                                            <Badge
                                                count={
                                                    <QuestionCircleOutlined />
                                                }
                                            />
                                        </Tooltip>
                                    }
                                    span={3}
                                >
                                    <Form.Item name="motivationEssay" noStyle>
                                        <Space>
                                            {submissionData.motivationEssay ? (
                                                <Button
                                                    type="primary"
                                                    icon={<DownloadOutlined />}
                                                    onClick={downloadFile(
                                                        'motivationEssay'
                                                    )}
                                                >
                                                    Download Saved File
                                                </Button>
                                            ) : null}
                                            <Upload
                                                maxCount={1}
                                                onChange={(e) =>
                                                    setEssay(
                                                        [...e.fileList].slice(
                                                            -1
                                                        )
                                                    )
                                                }
                                                fileList={essay}
                                                beforeUpload={() => false}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    Click to Upload New File
                                                </Button>
                                            </Upload>
                                        </Space>
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label={
                                        <Tooltip title="Document stating you are not in office for any other UK organisations">
                                            Not in Office Statement (pdf) &nbsp;
                                            <Badge
                                                count={
                                                    <QuestionCircleOutlined />
                                                }
                                            />
                                        </Tooltip>
                                    }
                                    span={3}
                                >
                                    <Form.Item
                                        name="notInOfficeStatement"
                                        noStyle
                                    >
                                        <Space>
                                            {submissionData.notInOfficeStatement ? (
                                                <Button
                                                    type="primary"
                                                    icon={<DownloadOutlined />}
                                                    onClick={downloadFile(
                                                        'notInOfficeStatement'
                                                    )}
                                                >
                                                    Download Saved File
                                                </Button>
                                            ) : null}
                                            <Upload
                                                maxCount={1}
                                                onChange={(e) =>
                                                    setNotInOffice(
                                                        [...e.fileList].slice(
                                                            -1
                                                        )
                                                    )
                                                }
                                                fileList={notInOffice}
                                                beforeUpload={() => false}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    Click to Upload New File
                                                </Button>
                                            </Upload>
                                        </Space>
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    span={3}
                                    label={
                                        <Tooltip title="Video containing your mission, vision, and 3 operation plans (max 3 minutes). Please upload to Google Drive and paste the view link here">
                                            Video Link &nbsp;
                                            <Badge
                                                count={
                                                    <QuestionCircleOutlined />
                                                }
                                            />
                                        </Tooltip>
                                    }
                                >
                                    <Form.Item
                                        name="videoLink"
                                        initialValue={submissionData.videoLink}
                                        noStyle
                                    >
                                        <Input />
                                    </Form.Item>
                                </Descriptions.Item>
                            </Descriptions>
                            <Button
                                type="primary"
                                style={{ width: '100%', marginTop: '12px' }}
                                onClick={() => form.submit()}
                            >
                                Save
                            </Button>
                        </Form>
                    </Card>
                )}
            {currentTime < new Date(electionData.nominateStart) && (
                <Card title={electionData.name}>
                    Nomination phase has not started
                </Card>
            )}
            {currentTime > new Date(electionData.nominateEnd) && (
                <Card title={electionData.name}>
                    Nomination phase has ended
                </Card>
            )}
        </>
    ) : (
        <Skeleton />
    );
}
