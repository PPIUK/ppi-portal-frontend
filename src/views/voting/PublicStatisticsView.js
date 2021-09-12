import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAuth } from '../../utils/useAuth';
import { useParams } from 'react-router';
import { Card, Collapse, Skeleton } from 'antd';
import VotersStatisticsCharts from './components/VotersStatisticsCharts';

const { Panel } = Collapse;

function PublicStatisticsView() {
    const auth = useAuth();
    const { electionID } = useParams();
    const [electionData, setElectionData] = useState(null);
    const [statisticsData, setStatisticsData] = useState();

    useEffect(() => {
        Axios.get(`/api/voting/${electionID}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((res) => {
            const campaign = res.data.data;
            setElectionData(campaign);
        });
    }, [electionID]);

    useEffect(() => {
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
    }, [electionID]);
    return statisticsData ? (
        <>
            <Card title={electionData.name + ' Statistics'}>
                <Collapse>
                    {statisticsData.map((round, roundIndex) => {
                        return (
                            <Panel
                                header={`Round ${roundIndex + 1}`}
                                key={roundIndex + 1}
                            >
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
