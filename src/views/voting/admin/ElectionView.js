import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Card,
    DatePicker,
    Descriptions,
    Form,
    Image,
    Input,
    List,
    message,
    Skeleton,
    Space,
    Tabs,
    Table,
    Upload,
    Typography,
} from 'antd';
import { useAuth } from '../../../utils/useAuth';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import Modal from 'antd/lib/modal/Modal';
import CandidateInfo from '../components/CandidateInfo';
import { getColumnSearchProps } from '../../member-database/ColumnSearchProps';
import StatisticsCharts from '../components/StatisticsCharts';

const { TabPane } = Tabs;

export default function ElectionAdminView() {
    const auth = useAuth();
    const { electionID } = useParams();
    const [electionData, setElectionData] = useState(null);
    const [electionBanner, setElectionBanner] = useState(null);
    const [bannerList, setBannerList] = useState([]);
    const [candidateProfiles, setCandidateProfiles] = useState(null);

    const [voterList, setVoterList] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [statisticsData, setStatisticsData] = useState([]);

    const [modalProfile, setModalProfile] = useState(null);
    const [modalSubmission, setModalSubmission] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const nameLinkFormat = (text, row) => (
        <Link to={`/app/profile/${row._id}`} component={Typography.Link}>
            {text}
        </Link>
    );

    const dateFormat = (text) => (
        <Typography>
            {text !== undefined ? moment(text).format('DD-MM-YYYY') : null}
        </Typography>
    );

    let columnSearchParams = [
        searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
    ];

    const voterTableCols = [
        {
            title: 'No',
            key: 'index',
            render: (value, item, index) => (page - 1) * pageSize + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: {
                compare: (a, b) =>
                    (a.fullName || '').localeCompare(b.fullName || ''),
            },
            ...getColumnSearchProps('fullName', ...columnSearchParams),
            render: nameLinkFormat,
        },
        {
            title: 'Degree Level',
            dataIndex: 'degreeLevel',
            key: 'degreeLevel',
            sorter: {
                compare: (a, b) =>
                    (a.degreeLevel || '').localeCompare(b.degreeLevel || ''),
            },
            ...getColumnSearchProps('degreeLevel', ...columnSearchParams),
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            sorter: {
                compare: (a, b) =>
                    a.startDate > b.startDate
                        ? 1
                        : a.startDate < b.startDate
                        ? -1
                        : 0,
            },
            ...getColumnSearchProps('startDate', ...columnSearchParams),
            render: dateFormat,
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            sorter: {
                compare: (a, b) =>
                    a.endDate > b.endDate ? 1 : a.endDate < b.endDate ? -1 : 0,
            },
            ...getColumnSearchProps('endDate', ...columnSearchParams),
            render: dateFormat,
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            sorter: {
                compare: (a, b) =>
                    (a.branch || '').localeCompare(b.branch || ''),
            },
            ...getColumnSearchProps('branch', ...columnSearchParams),
        },
    ];

    const submitForm = (vals) => {
        let formData = new FormData();
        for (const name in vals) {
            if (vals[name]) {
                formData.append(name, vals[name]);
            }
        }
        if (bannerList.length > 0) {
            formData.append('campaignBannerFile', bannerList[0].originFileObj);
        }
        message.loading(
            {
                content: 'Saving details...',
                key: 'saveElectionLoading',
            },
            0
        );
        axios
            .patch(`/api/voting/admin/${electionID}`, formData, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                message.success(
                    {
                        content: 'Election details saved!',
                        key: 'saveElectionLoading',
                    },
                    4.5
                );
                axios
                    .get(`/api/voting/${electionID}`, {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                    })
                    .then((resp) => {
                        setElectionData(resp.data.data);
                    });
                axios
                    .get(`/api/voting/${electionID}/banner`, {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                        responseType: 'blob',
                    })
                    .then((res) => {
                        let reader = new FileReader();
                        reader.readAsDataURL(res.data);
                        reader.onload = () => setElectionBanner(reader.result);
                    });
            })
            .catch((e) => {
                message.error({
                    content: `Failed to save: ${e.response.data.message}`,
                    key: 'saveElectionLoading',
                });
            });
    };

    useEffect(() => {
        Axios.get(`/api/voting/${electionID}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })
            .then((res) => {
                const election = res.data.data;
                setElectionData(election);
                let profiles = [];
                let promises = [];
                election.candidatePool.forEach((candidate) => {
                    promises.push(
                        Axios.get(
                            `/api/profiles/${candidate.candidateID}/public`,
                            {
                                headers: {
                                    Authorization: `Bearer ${auth.accessToken}`,
                                },
                            }
                        ).then((resp) => {
                            let profile = resp.data.data;
                            return profile.profilePicture
                                ? Axios.get(
                                      `/api/profiles/${candidate.candidateID}/profilepicture`,
                                      {
                                          headers: {
                                              Authorization: `Bearer ${auth.accessToken}`,
                                          },
                                          responseType: 'blob',
                                      }
                                  ).then((pic) => {
                                      return new Promise((resolve) => {
                                          let reader = new FileReader();
                                          reader.readAsDataURL(pic.data);
                                          reader.onload = () => {
                                              profile.profilePicture =
                                                  reader.result;
                                              profiles.push(resp.data.data);
                                              resolve();
                                          };
                                      });
                                  })
                                : profiles.push(profile);
                        })
                    );
                });
                Promise.all(promises).then(() =>
                    setCandidateProfiles(profiles)
                );
            })
            .catch(() => navigate('/app/profile/me'));
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
        Axios.get(`/api/voting/admin/${electionID}/voters`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => {
            setVoterList(res.data.data);
        });
        Axios.get(`/api/voting/admin/${electionID}/stats`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => {
            setStatisticsData(res.data.data);
        });
    }, [electionID]);

    useEffect(() => {
        const interval = setInterval(() => {
            Axios.get(`/api/voting/admin/${electionID}/stats`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            }).then((res) => {
                setStatisticsData(res.data.data);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [electionID]);

    return electionData ? (
        <>
            <Modal
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <CandidateInfo
                    profile={modalProfile}
                    submission={modalSubmission}
                />
            </Modal>
            <Card title={electionData.name}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Edit Election Details" key="1">
                        <Form form={form} onFinish={submitForm}>
                            <Descriptions bordered>
                                <Descriptions.Item
                                    label="Election Name"
                                    span={3}
                                >
                                    <Form.Item
                                        name="name"
                                        initialValue={electionData.name}
                                        rules={[{ required: true }]}
                                        hasFeedback
                                        noStyle
                                    >
                                        <Input />
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="Description" span={3}>
                                    <Form.Item
                                        name="description"
                                        initialValue={electionData.description}
                                        rules={[{ required: true }]}
                                        noStyle
                                    >
                                        <Input.TextArea rows={4} />
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item label="Banner" span={3}>
                                    <Form.Item name="banner" noStyle>
                                        <Space>
                                            {electionData.banner ? (
                                                <Image
                                                    width={200}
                                                    loading={
                                                        electionBanner === null
                                                    }
                                                    src={electionBanner}
                                                />
                                            ) : null}
                                            <Upload
                                                accept="image/*"
                                                maxCount={1}
                                                listType="picture-card"
                                                showUploadList={{
                                                    showPreviewIcon: false,
                                                    showRemoveIcon: false,
                                                }}
                                                onChange={(e) =>
                                                    setBannerList(
                                                        [...e.fileList].slice(
                                                            -1
                                                        )
                                                    )
                                                }
                                                fileList={bannerList}
                                                beforeUpload={() => false}
                                            >
                                                <div>
                                                    <PlusOutlined />
                                                    <div
                                                        style={{ marginTop: 8 }}
                                                    >
                                                        {bannerList.length > 0
                                                            ? 'Replace'
                                                            : 'Upload'}{' '}
                                                        Banner
                                                    </div>
                                                </div>
                                            </Upload>
                                        </Space>
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label="Voter Eligibility Cutoff Date"
                                    span={3}
                                >
                                    <Form.Item
                                        name="voterCutOffEndDate"
                                        initialValue={moment(
                                            electionData.voterCutOffEndDate
                                        )}
                                        rules={[{ required: true }]}
                                        noStyle
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label="Masters' Voters Eligibility Start Date"
                                    span={3}
                                >
                                    <Form.Item
                                        name="voterMastersCutOffStartDate"
                                        initialValue={moment(
                                            electionData.voterMastersCutOffStartDate
                                        )}
                                        rules={[{ required: true }]}
                                        noStyle
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label="Nomination Phase Start Date"
                                    span={3}
                                >
                                    <Form.Item
                                        name="nominateStart"
                                        initialValue={moment(
                                            electionData.nominateStart
                                        )}
                                        rules={[{ required: true }]}
                                        noStyle
                                    >
                                        <DatePicker showTime />
                                    </Form.Item>
                                </Descriptions.Item>
                                <Descriptions.Item
                                    label="Nomination Phase End Date"
                                    span={3}
                                >
                                    <Form.Item
                                        name="nominateEnd"
                                        initialValue={moment(
                                            electionData.nominateEnd
                                        )}
                                        rules={[{ required: true }]}
                                        noStyle
                                    >
                                        <DatePicker showTime />
                                    </Form.Item>
                                </Descriptions.Item>
                            </Descriptions>
                            <Button
                                block
                                type="primary"
                                onClick={() => form.submit()}
                            >
                                Save
                            </Button>
                        </Form>
                    </TabPane>
                    <TabPane tab="View Candidates" key="2">
                        {candidateProfiles ? (
                            <List
                                size="large"
                                itemLayout="horizontal"
                                dataSource={electionData.candidates}
                                renderItem={(candidate) => {
                                    const profile = candidateProfiles.find(
                                        (prof) =>
                                            prof._id === candidate.candidateID
                                    );
                                    return (
                                        <List.Item
                                            actions={[
                                                <Button
                                                    type="primary"
                                                    key="more-info"
                                                    onClick={() => {
                                                        setModalProfile(
                                                            profile
                                                        );
                                                        setModalSubmission(
                                                            candidate
                                                        );
                                                        setModalVisible(true);
                                                    }}
                                                >
                                                    <a>More Info</a>
                                                </Button>,
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    profile.profilePicture ? (
                                                        <Image
                                                            width={50}
                                                            src={
                                                                profile.profilePicture
                                                            }
                                                        />
                                                    ) : null
                                                }
                                                title={profile.fullName}
                                                description={`${profile.degreeLevel} ${profile.course}, ${profile.university}`}
                                            />
                                        </List.Item>
                                    );
                                }}
                            />
                        ) : (
                            <Skeleton />
                        )}
                    </TabPane>
                    <TabPane tab="Manage Voting Rounds" key="3"></TabPane>
                    <TabPane tab="View Final Voter List" key="4">
                        {voterList ? (
                            <Table
                                columns={voterTableCols}
                                dataSource={voterList}
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
                                scroll={{ x: true }}
                            />
                        ) : (
                            <Skeleton />
                        )}
                    </TabPane>
                    <TabPane tab="View Live Statistics" key="5">
                        {statisticsData ? (
                            <StatisticsCharts
                                statistics={statisticsData}
                                votingData={electionData.voting}
                                candidateProfiles={candidateProfiles}
                                candidatePool={electionData.candidatePool}
                            />
                        ) : (
                            <Skeleton />
                        )}
                    </TabPane>
                </Tabs>
            </Card>
        </>
    ) : (
        <Skeleton />
    );
}
