import { Col, Row, Typography } from 'antd';
import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const VOTER_COLOURS = ['#0029ff', '#ff0000'];
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

function VotersStatisticsCharts({ statistics }) {
    return statistics.branchesCount.length > 0 ? (
        <>
            <Row>
                <Col xs={24} xl={8}>
                    <Typography.Title level={3}>
                        Number of Voters
                    </Typography.Title>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart width="100%">
                            <Pie
                                data={statistics.votersCount}
                                // startAngle={180}
                                // endAngle={0}
                                innerRadius={50}
                                outerRadius={70}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                isAnimationActive={false}
                                label
                            >
                                {statistics.votersCount.map((entry, index) => (
                                    <Cell
                                        key={entry}
                                        fill={
                                            VOTER_COLOURS[
                                                index % VOTER_COLOURS.length
                                            ]
                                        }
                                    />
                                ))}
                            </Pie>
                            <Legend
                                layout="vertical"
                                verticalAlign="top"
                                align="right"
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
                <Col xs={24} xl={8}>
                    <Typography.Title level={3}>
                        Number of Voters by Branch
                    </Typography.Title>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart width="100%">
                            <Pie
                                data={statistics.branchesCount}
                                dataKey="voters"
                                isAnimationActive={false}
                                legendType="rect"
                                label
                            >
                                {BRANCHES.map((branch, index) => {
                                    return (
                                        <Cell
                                            key={branch}
                                            fill={
                                                BRANCH_COLOURS[
                                                    index %
                                                        BRANCH_COLOURS.length
                                                ]
                                            }
                                        />
                                    );
                                })}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
                <Col xs={24} xl={8}>
                    <Typography.Title level={3}>
                        Number of Voters by Degree Level
                    </Typography.Title>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart width="100%">
                            <Pie
                                data={statistics.degreeLevelCount}
                                dataKey="voters"
                                isAnimationActive={false}
                                legendType="rect"
                                label
                            >
                                {statistics.degreeLevelCount.map(
                                    (entry, index) => {
                                        return (
                                            <Cell
                                                key={index}
                                                fill={
                                                    BRANCH_COLOURS[
                                                        BRANCH_COLOURS.length -
                                                            (index %
                                                                BRANCH_COLOURS.length)
                                                    ]
                                                }
                                            />
                                        );
                                    }
                                )}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <Row>
                <Col xs={24} xl={24}>
                    {statistics.votersBranchCount && (
                        <div>
                            <Typography.Title level={3}>
                                Number of Eligible Voters per Branch
                            </Typography.Title>
                            <ResponsiveContainer width="100%" height={600}>
                                <BarChart data={statistics.votersBranchCount}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend
                                        verticalAlign="bottom"
                                        align="center"
                                    />
                                    <Bar
                                        key="hasVoted"
                                        dataKey="hasVoted"
                                        stackId="a"
                                        fill={VOTER_COLOURS[0]}
                                    />
                                    <Bar
                                        key="hasNotVoted"
                                        dataKey="hasNotVoted"
                                        stackId="a"
                                        fill={VOTER_COLOURS[1]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </Col>
            </Row>
        </>
    ) : (
        <Typography>There is no data for this election round.</Typography>
    );
}

export default VotersStatisticsCharts;
