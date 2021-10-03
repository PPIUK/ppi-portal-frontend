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
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const { confirm } = Modal;
const { useBreakpoint } = Grid;

function VotingPhaseView() {
    const { electionID, roundID } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();
    const [electionData, setElectionData] = useState(null);
    const [roundData, setRoundData] = useState(null);
    const [candidateProfiles, setCandidateProfiles] = useState([]);

    const [isVoteButtonVisible, setIsVoteButtonVisible] = useState(true);

    const [hasVoted, setHasVoted] = useState(false);
    const [isEligible, setIsEligible] = useState(false);

    const screens = useBreakpoint();

    const showVoteConfirm = (profile) => {
        confirm({
            title: `Vote for ${profile.fullName}`,
            icon: <ExclamationCircleOutlined />,
            content: `Are you sure you want to vote for ${profile.fullName}?
             You can only do this once and you cannot undo this action.`,
            onOk() {
                message.info('Processing...');
                Axios.post(
                    `/api/voting/${electionID}/vote/${roundID}/${profile.voteID}`,
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
                        message.success('Voted successfully!');
                    })
                    .catch((err) => {
                        message.error(err.response.data.message);
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
            Axios.get(`/api/voting/${electionID}/round/${roundID}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            })
                .then((res) => {
                    const votingRound = res.data.data;
                    setRoundData(votingRound);

                    if (new Date() < new Date(votingRound.startDate))
                        return navigate('/app/profile/me');

                    if (new Date() >= new Date(votingRound.endDate)) {
                        setIsVoteButtonVisible(false);
                    }

                    let profiles = [];
                    let promises = [];
                    votingRound.candidates.forEach((candidateID) => {
                        let candidate = election.candidatePool.find(
                            (c) => c._id == candidateID
                        );
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
                                                  profiles.push({
                                                      ...profile,
                                                      voteID: candidate._id,
                                                  });
                                                  resolve();
                                              };
                                          });
                                      })
                                    : profiles.push({
                                          ...profile,
                                          voteID: candidate._id,
                                      });
                            })
                        );
                    });
                    Promise.all(promises).then(() =>
                        setCandidateProfiles(profiles)
                    );
                })
                .then(() => {
                    Axios.get(
                        `/api/voting/${electionID}/eligibility/${roundID}`,
                        {
                            headers: {
                                Authorization: `Bearer ${auth.accessToken}`,
                            },
                        }
                    ).then((resp) => {
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
        });
    }, [electionID, roundID]);

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
                                value={roundData.endDate}
                                onFinish={() => {
                                    setIsVoteButtonVisible(false);
                                }}
                            />
                        </Card>
                        <Timeline>
                            <Timeline.Item color="green">
                                Candidate nomination phase started:{' '}
                                {moment(electionData.nominateStart).format(
                                    'DD MMMM YYYY, HH:mm:ss'
                                )}
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                Candidate nomination phase ended:{' '}
                                {moment(electionData.nominateEnd).format(
                                    'DD MMMM YYYY, HH:mm:ss'
                                )}
                            </Timeline.Item>
                            {roundID === '1' && (
                                <>
                                    <Timeline.Item color="green">
                                        Voting phase 1 started:{' '}
                                        {moment(
                                            electionData.voting[0].startDate
                                        ).format('DD MMMM YYYY, HH:mm:ss')}
                                    </Timeline.Item>
                                    <Timeline.Item color="green">
                                        Voting phase 1 ended:{' '}
                                        {moment(
                                            electionData.voting[0].endDate
                                        ).format('DD MMMM YYYY, HH:mm:ss')}
                                    </Timeline.Item>
                                </>
                            )}
                            <Timeline.Item
                                color={
                                    new Date() < new Date(roundData.endDate)
                                        ? 'blue'
                                        : 'green'
                                }
                            >
                                Voting phase {roundID === '1' ? ' 2' : ''}{' '}
                                started:{' '}
                                {moment(roundData.startDate).format(
                                    'DD MMMM YYYY, HH:mm:ss'
                                )}
                            </Timeline.Item>
                            {new Date() < new Date(roundData.endDate) && (
                                <Timeline.Item color="gray">
                                    Voting phase {roundID === '1' ? ' 2' : ''}{' '}
                                    ends:{' '}
                                    {moment(roundData.endDate).format(
                                        'DD MMMM YYYY, HH:mm:ss'
                                    )}
                                </Timeline.Item>
                            )}
                            {new Date() >= new Date(roundData.endDate) && (
                                <Timeline.Item color="green">
                                    Voting phase {roundID === '1' ? ' 2' : ''}{' '}
                                    ended:{' '}
                                    {moment(roundData.endDate).format(
                                        'DD MMMM YYYY, HH:mm:ss'
                                    )}
                                </Timeline.Item>
                            )}
                        </Timeline>
                    </Space>
                    <Divider />
                    {new Date() >= new Date(roundData.endDate) && (
                        <div style={{ textAlign: 'center' }}>
                            <Typography.Title level={5}>
                                Voting phase for this round has ended.
                            </Typography.Title>
                            <Divider />
                        </div>
                    )}
                    {hasVoted && (
                        <div style={{ textAlign: 'center' }}>
                            <Typography.Title level={5}>
                                {/* TODO: should probably be dynamic in the future */}
                                You have voted in this General Election round.
                                Thank you for your participation.
                            </Typography.Title>
                            <Divider />
                        </div>
                    )}
                    {!auth.user.roles.includes('verified') && (
                        <div style={{ textAlign: 'center' }}>
                            <Typography.Title level={5}>
                                {/* TODO: should probably be dynamic in the future */}
                                You account is awaiting verification.
                            </Typography.Title>
                            <Divider />
                        </div>
                    )}
                    {auth.user.roles.includes('verified') && !isEligible && (
                        <div style={{ textAlign: 'center' }}>
                            {
                                //FIXME: this should be dynamic
                            }
                            <Typography.Title level={5}>
                                <p>Apologies.</p>

                                <p>
                                    According to the Regulatory Document of the
                                    PPI UK General Election 2021/22 Chapter 20
                                    about Eligible Voters, you are not eligible
                                    to vote in the election. Eligible voters
                                    also had to be registered in the portal by 1
                                    October 2021.
                                </p>

                                <p>
                                    Access the document{' '}
                                    <a href="https://ppiuk.org/wp-content/uploads/Dokumen-Ketentuan-Pemilihan-Umum-PPI-UK-21-22-070921.pdf">
                                        here.
                                    </a>
                                </p>

                                <p>
                                    If you think that this is incorrect, contact
                                    us now via{' '}
                                    <a href="mailto:kpuppiuk@gmail.com">
                                        kpuppiuk@gmail.com
                                    </a>
                                </p>
                            </Typography.Title>
                            <Divider />
                        </div>
                    )}
                    <Typography.Title level={4}>Candidates</Typography.Title>
                    <List
                        size="large"
                        itemLayout={!screens.xs ? 'horizontal' : 'vertical'}
                        dataSource={roundData.candidates}
                        renderItem={(candidate) => {
                            const profile = candidateProfiles.find(
                                (prof) => prof.voteID === candidate
                            );
                            return (
                                <List.Item
                                    actions={[
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
                                        description={
                                            'Number ' +
                                            (roundData.candidates.indexOf(
                                                candidate
                                            ) +
                                                1)
                                        }
                                    />
                                </List.Item>
                            );
                        }}
                    />
                </Space>
            )}
        </Card>
    );
}

export default VotingPhaseView;
