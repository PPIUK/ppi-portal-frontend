import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
    Avatar,
    Button,
    Card,
    Divider,
    Grid,
    Image,
    List,
    message,
    Modal,
    Space,
    Statistic,
    Timeline,
    Typography,
} from 'antd';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';

import { useAuth } from '../../utils/useAuth';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import CandidateInfo from './components/CandidateInfo';

const { confirm } = Modal;
const { useBreakpoint } = Grid;

function VotingPhaseView() {
    const { electionID, roundID } = useParams();
    const auth = useAuth();
    const [electionData, setElectionData] = useState(null);
    const [roundData, setRoundData] = useState(null);
    const [candidateProfiles, setCandidateProfiles] = useState([]);

    const [isVoteButtonVisible, setIsVoteButtonVisible] = useState(true);
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

    const [hasVoted, setHasVoted] = useState(false);
    const [isEligible, setIsEligible] = useState(false);

    const [chosenCandidate, setChosenCandidate] = useState(null);
    const [chosenProfile, setChosenProfile] = useState(null);

    const screens = useBreakpoint();

    const showInfoModal = (candidate, profile) => {
        setChosenCandidate(candidate);
        setChosenProfile(profile);
        setIsInfoModalVisible(true);
    };

    const handleInfoModalCancel = () => {
        setIsInfoModalVisible(false);
    };

    const showVoteConfirm = (profile) => {
        confirm({
            title: `Vote for ${profile.fullName}`,
            icon: <ExclamationCircleOutlined />,
            content: `Are you sure you want to vote for ${profile.fullName}?
             You can only do this once and you cannot undo this action.`,
            onOk() {
                Axios.post(
                    `/api/voting/${electionID}/vote/${roundID}/${profile._id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                    }
                )
                    .then(() => {
                        setIsVoteButtonVisible(false);
                        setHasVoted(true);
                    })
                    .catch((err) => {
                        message.error(err.data.message);
                    });
            },
        });
    };

    useEffect(() => {
        setCandidateProfiles([]);
        setIsVoteButtonVisible(true);
        setHasVoted(false);
        Axios.get(`/api/voting/${electionID}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => {
            const election = res.data.data;
            setElectionData(election);
        });
        Axios.get(`/api/voting/${electionID}/round/${roundID}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })
            .then((res) => {
                const votingRound = res.data.data;
                setRoundData(votingRound);

                let profiles = [];
                let promises = [];
                votingRound.candidates.forEach((candidate) => {
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
            .then(() => {
                Axios.get(`/api/voting/${electionID}/eligibility`, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }).then((resp) => {
                    setIsEligible(resp.data.data);
                    if (resp.data.data === false) {
                        setIsVoteButtonVisible(false);
                    }
                });
            })
            .then(() => {
                Axios.get(`/api/voting/${electionID}/hasVoted/${roundID}`, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }).then((resp) => {
                    setHasVoted(resp.data.data);
                    if (resp.data.data === true) {
                        setIsVoteButtonVisible(false);
                    }
                });
            });
    }, [electionID]);

    return (
        <Card title={electionData !== null && electionData.name}>
            {electionData !== null && candidateProfiles.length > 0 && (
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Typography.Text>
                        {electionData.description}
                    </Typography.Text>
                    <Divider />
                    <Space size="large" align="start">
                        <Card>
                            <Statistic.Countdown
                                title="Voting closes in"
                                value={roundData.voteEnd}
                                onFinish={() => {
                                    setIsVoteButtonVisible(false);
                                }}
                            />
                        </Card>
                        <Timeline>
                            <Timeline.Item color="green">
                                Candidate nomination phase started:{' '}
                                {moment(electionData.nominateStart).format(
                                    'DD MMMM YYYY, hh:mm:ss'
                                )}
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                Candidate nomination phase ended:{' '}
                                {moment(electionData.nominateEnd).format(
                                    'DD MMMM YYYY, hh:mm:ss'
                                )}
                            </Timeline.Item>
                            <Timeline.Item color="blue">
                                Voting phase started:{' '}
                                {moment(roundData.voteStart).format(
                                    'DD MMMM YYYY, hh:mm:ss'
                                )}
                            </Timeline.Item>
                            <Timeline.Item color="gray">
                                Voting phase ends:{' '}
                                {moment(roundData.voteEnd).format(
                                    'DD MMMM YYYY, hh:mm:ss'
                                )}
                            </Timeline.Item>
                        </Timeline>
                    </Space>
                    <Divider />
                    {hasVoted && (
                        <div style={{ textAlign: 'center' }}>
                            <Typography.Title level={5}>
                                You have voted in this campaign. Thank you for
                                your participation.
                            </Typography.Title>
                            <Divider />
                        </div>
                    )}
                    {!isEligible && (
                        <div style={{ textAlign: 'center' }}>
                            <Typography.Title level={5}>
                                You are not eligible to vote in this campaign.
                            </Typography.Title>
                            <Divider />
                        </div>
                    )}
                    <Typography.Title level={4}>Candidates</Typography.Title>
                    <List
                        size="large"
                        itemLayout={!screens.xs ? 'horizontal' : 'vertical'}
                        dataSource={electionData.candidates}
                        renderItem={(candidate) => {
                            const profile = candidateProfiles.find(
                                (prof) => prof._id === candidate.candidateID
                            );
                            return (
                                <List.Item
                                    actions={[
                                        <Button
                                            type="primary"
                                            onClick={() =>
                                                showInfoModal(
                                                    candidate,
                                                    profile
                                                )
                                            }
                                            key="more-info"
                                        >
                                            <a>More Info</a>
                                        </Button>,
                                        isVoteButtonVisible && (
                                            <Button
                                                type="primary"
                                                style={{
                                                    backgroundColor: 'green',
                                                }}
                                                onClick={() =>
                                                    showVoteConfirm(profile)
                                                }
                                                key="vote"
                                            >
                                                <a>Vote</a>
                                            </Button>
                                        ),
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            profile.profilePicture ? (
                                                <Image
                                                    width={20}
                                                    loading={
                                                        !profile.profilePicture
                                                    }
                                                    src={profile.profilePicture}
                                                />
                                            ) : (
                                                <Avatar
                                                    shape="square"
                                                    size={20}
                                                    icon={<UserOutlined />}
                                                />
                                            )
                                        }
                                        title={profile.fullName}
                                        description={`${profile.degreeLevel} ${profile.course}, ${profile.university}`}
                                    />
                                </List.Item>
                            );
                        }}
                    />
                    {chosenCandidate !== null && (
                        <Modal
                            title={chosenProfile.fullName}
                            visible={isInfoModalVisible}
                            onCancel={handleInfoModalCancel}
                            footer={null}
                            width={350}
                        >
                            <CandidateInfo
                                profile={chosenProfile}
                                submission={chosenCandidate}
                            />
                        </Modal>
                    )}
                </Space>
            )}
        </Card>
    );
}

export default VotingPhaseView;
