import React, { useEffect, useState } from 'react';
import { Col, Collapse, Row, Skeleton, Typography } from 'antd';
import {
    Cell,
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
} from 'recharts';

const { Panel } = Collapse;

// eslint-disable-next-line no-unused-vars
const BRANCHES = [
    'Aberdeen',
    'Belfast',
    'Birmingham',
    'Bournemouth',
    'Bradford',
    'Brighton',
    'Bristol',
    'Cambridge',
    'Canterbury',
    'Coventry',
    'Cranfield',
    'Durham',
    'Edinburgh',
    'Exeter',
    'Glasgow',
    'Hatfield',
    'Hull',
    'Lancaster',
    'Leeds',
    'Leicester',
    'Liverpool',
    'London',
    'Manchester',
    'Newcastle',
    'Northampton',
    'Norwich',
    'Nottingham',
    'Oxford',
    'Portsmouth',
    'Reading',
    'Sheffield',
    'Southampton',
    'Sunderland',
    'Wales',
    'Warwick',
    'York',
];

const CANDIDATE_COLOURS = ['#0088FE', '#00C49F', '#FFBB28', '#ff001e'];
// eslint-disable-next-line no-unused-vars
const BRANCH_COLOURS = [
    '#ff0033',
    '#e293ff',
    '#0874e7',
    '#c6a200',
    '#e5ab89',
    '#ed898e',
    '#8c9edb',
    '#ea6902',
    '#8c9edb',
    '#fcb7a9',
    '#e4c6ff',
    '#afa2ef',
    '#71ddb2',
    '#eab115',
    '#32569e',
    '#13ad2c',
    '#ce3952',
    '#89f4e1',
    '#087c67',
    '#f2b3be',
    '#6ed8b8',
    '#1ba3b5',
    '#f100ec',
    '#7bf79c',
    '#6889c1',
    '#d3c5f9',
    '#008726',
    '#09248e',
    '#e069b8',
    '#13397a',
    '#ea98ab',
    '#f22b8b',
    '#4c4aad',
    '#a372cc',
    '#6395ce',
    '#bc4c18',
    '#7de0cf',
];
const RADIAN = Math.PI / 180;

function StatisticsCharts({
    statistics,
    votingData,
    candidateProfiles,
    candidatePool,
}) {
    const [roundCandidates, setRoundCandidates] = useState();
    const [statisticsData, setStatisticsData] = useState();

    const renderPieChartCustomisedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    useEffect(() => {
        let roundCandidatesArray = [];
        votingData.forEach((round) => {
            let roundArray = [];
            round.candidates.forEach((candidateID) => {
                let candidate = candidatePool.find((cand) => {
                    return cand._id === candidateID;
                });

                candidate.fullName = candidateProfiles.find((cand) => {
                    return cand._id === candidate.candidateID;
                }).fullName;
                roundArray.push(candidate);
            });
            roundCandidatesArray.push(roundArray);
        });
        setRoundCandidates(roundCandidatesArray);
    }, []);

    useEffect(() => {
        if (roundCandidates && Object.keys(statistics).length > 0) {
            statistics.forEach((round, i) => {
                const candidates = roundCandidates[i];

                if (round.overall) {
                    let sum = 0;
                    round.overall.forEach((stat) => {
                        stat.name = candidates.find((cand) => {
                            return cand._id === stat.candidateID;
                        }).fullName;
                        sum += stat.votes;
                    });

                    round.overallPercentage = round.overall.map((stat) => {
                        stat.percentage = (stat.votes / sum).toFixed(2) * 100;
                        return stat;
                    });
                }

                if (round.candidateToBranch) {
                    round.candidateToBranch.forEach((stat) => {
                        stat.name = candidates.find((cand) => {
                            return cand._id === stat.candidateID;
                        }).fullName;
                    });
                }

                if (round.branchToCandidate) {
                    round.branchToCandidate.forEach((stat) => {
                        candidates.forEach((cand) => {
                            if (cand._id in stat) {
                                stat[cand.fullName] = stat[cand._id];
                                delete stat[cand._id];
                            } else {
                                stat[cand.fullName] = 0;
                            }
                        });
                    });
                }
            });
            setStatisticsData(statistics);
        }
    }, [roundCandidates, statistics]);

    return statisticsData ? (
        <Collapse>
            {statisticsData.map((round, roundIndex) => {
                return (
                    <Panel
                        header={`Round ${roundIndex + 1}`}
                        key={roundIndex + 1}
                    >
                        <Row>
                            <Col xs={24} xl={12}>
                                {round.overall && (
                                    <div>
                                        <Typography.Title level={3}>
                                            Number of Votes per Candidate
                                        </Typography.Title>
                                        <ResponsiveContainer
                                            width="100%"
                                            height={300}
                                        >
                                            <BarChart data={round.overall}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name">
                                                    <Label
                                                        value="Candidates"
                                                        offset={0}
                                                        position="insideBottom"
                                                    />
                                                </XAxis>
                                                <YAxis
                                                    allowDecimals={false}
                                                    label={{
                                                        value:
                                                            'Number of votes',
                                                        angle: -90,
                                                        position: 'insideLeft',
                                                    }}
                                                />
                                                <Tooltip />
                                                <Bar
                                                    dataKey="votes"
                                                    fill="#8884d8"
                                                >
                                                    {round.overall.map(
                                                        (entry, index) => (
                                                            <Cell
                                                                key={entry}
                                                                fill={
                                                                    CANDIDATE_COLOURS[
                                                                        index %
                                                                            CANDIDATE_COLOURS.length
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </Col>
                            <Col xs={24} xl={12}>
                                {round.overallPercentage && (
                                    <div>
                                        <Typography.Title level={3}>
                                            Percentages of Votes per Candidate
                                        </Typography.Title>
                                        <ResponsiveContainer
                                            width="100%"
                                            height={300}
                                        >
                                            <PieChart width="100%" height={300}>
                                                <Pie
                                                    data={
                                                        round.overallPercentage
                                                    }
                                                    dataKey="percentage"
                                                    isAnimationActive={false}
                                                    labelLine={false}
                                                    label={
                                                        renderPieChartCustomisedLabel
                                                    }
                                                    legendType="rect"
                                                >
                                                    {round.overall.map(
                                                        (entry, index) => (
                                                            <Cell
                                                                key={entry}
                                                                fill={
                                                                    CANDIDATE_COLOURS[
                                                                        index %
                                                                            CANDIDATE_COLOURS.length
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value) => {
                                                        return value + '%';
                                                    }}
                                                />
                                                <Legend
                                                    layout="vertical"
                                                    verticalAlign="top"
                                                    align="right"
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xl={24}>
                                {round.candidateToBranch && (
                                    <div>
                                        <Typography.Title level={3}>
                                            Branch Distribution per Candidate
                                        </Typography.Title>
                                        <ResponsiveContainer
                                            width="100%"
                                            height={600}
                                        >
                                            <BarChart
                                                data={round.candidateToBranch}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip />
                                                <Legend />
                                                {BRANCHES.map((branch, i) => {
                                                    return (
                                                        <Bar
                                                            key={branch}
                                                            dataKey={branch}
                                                            stackId="a"
                                                            fill={
                                                                BRANCH_COLOURS[
                                                                    i
                                                                ]
                                                            }
                                                        />
                                                    );
                                                })}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xl={24}>
                                {round.branchToCandidate && (
                                    <div>
                                        <Typography.Title level={3}>
                                            Candidate Distribution per Branch
                                        </Typography.Title>
                                        <ResponsiveContainer
                                            width="100%"
                                            height={600}
                                        >
                                            <BarChart
                                                data={round.branchToCandidate}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="branch" />
                                                <YAxis allowDecimals={false} />
                                                <Tooltip />
                                                <Legend
                                                    verticalAlign="bottom"
                                                    align="center"
                                                />
                                                {roundCandidates[
                                                    roundIndex
                                                ].map((cand, i) => {
                                                    return (
                                                        <Bar
                                                            key={cand.fullName}
                                                            dataKey={
                                                                cand.fullName
                                                            }
                                                            stackId="a"
                                                            fill={
                                                                CANDIDATE_COLOURS[
                                                                    i %
                                                                        CANDIDATE_COLOURS.length
                                                                ]
                                                            }
                                                        />
                                                    );
                                                })}
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        {Object.keys(round).length === 0 && (
                            <Typography>
                                There is no data for this election round.
                            </Typography>
                        )}
                    </Panel>
                );
            })}
        </Collapse>
    ) : (
        <Skeleton />
    );
}

export default StatisticsCharts;
