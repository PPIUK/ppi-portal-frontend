import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../utils/useAuth';
import { useParams } from 'react-router';
import { Card, Collapse, Skeleton, Typography } from 'antd';
import VotersStatisticsCharts from './components/VotersStatisticsCharts';

const { Panel } = Collapse;

function PublicStatisticsView() {
    const auth = useAuth();
    const { electionID } = useParams();
    const [electionData, setElectionData] = useState(null);
    const [statisticsData, setStatisticsData] = useState();
    const [activeRound, setActiveRound] = useState();
    const [isActiveVote, setIsActiveVote] = useState(null);

    useEffect(() => {
        Axios.get(`/api/voting/${electionID}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => {
            const campaign = res.data.data;
            setElectionData(campaign);
        });
        Axios.get(`/api/voting/${electionID}/isActiveVote`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => {
            setIsActiveVote(res.data.data);
        });
        Axios.get(`/api/voting/pubstats/${electionID}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => {
            setStatisticsData(res.data.data);
        });
    }, [electionID]);

    useEffect(() => {
        if (electionData) {
            if (electionData.voting.length === 1) {
                setActiveRound(0);
            } else {
                const now = Date.now();
                let set = false;
                let i = 0;
                while (i < electionData.voting.length) {
                    if (
                        electionData.voting[i].endDate <= now ||
                        (i + 1 < electionData.voting.length &&
                            electionData.voting[i + 1].startDate < now)
                    ) {
                        setActiveRound(i);
                        set = true;
                    }
                    i++;
                }
                if (!set) {
                    setActiveRound(0);
                }
            }
        }
    }, [electionData]);

    useEffect(() => {
        if (isActiveVote) {
            const interval = setInterval(() => {
                Axios.get(`/api/voting/pubstats/${electionID}`, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }).then((res) => {
                    setStatisticsData(res.data.data);
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [electionID, isActiveVote]);
    return statisticsData ? (
        <>
            <Card title={electionData.name + ' Statistics'}>
                <Collapse defaultActiveKey={[String(activeRound)]}>
                    {statisticsData.map((round, roundIndex) => {
                        return (
                            <Panel
                                header={`Round ${roundIndex + 1}`}
                                key={String(roundIndex)}
                            >
                                <Typography.Title level={5}>
                                    Current date and time:{' '}
                                    {moment(Date.now()).format(
                                        'DD MMMM YYYY, HH:mm:ss'
                                    )}
                                </Typography.Title>

                                <VotersStatisticsCharts statistics={round} />
                            </Panel>
                        );
                    })}
                </Collapse>
            </Card>
        </>
    ) : (
        <Skeleton />
    );
}

export default PublicStatisticsView;
