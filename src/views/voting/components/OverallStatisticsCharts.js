import { Col, Row, Typography } from 'antd';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Label,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import React from 'react';

import { renderPieChartCustomisedLabel } from './StatisticsCharts';

const CANDIDATE_COLOURS = ['#0088FE', '#00C49F', '#FFBB28', '#ff001e'];

function OverallStatisticsCharts({ round }) {
    return (
        <Row>
            <Col xs={24} xl={12}>
                {round.overall && (
                    <div>
                        <Typography.Title level={3}>
                            Number of Votes per Candidate
                        </Typography.Title>
                        <ResponsiveContainer width="100%" height={300}>
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
                                        value: 'Number of votes',
                                        angle: -90,
                                        position: 'insideLeft',
                                    }}
                                />
                                <Tooltip />
                                <Bar dataKey="votes" fill="#8884d8">
                                    {round.overall.map((entry, index) => (
                                        <Cell
                                            key={entry}
                                            fill={
                                                CANDIDATE_COLOURS[
                                                    index %
                                                        CANDIDATE_COLOURS.length
                                                ]
                                            }
                                        />
                                    ))}
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
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart width="100%" height={300}>
                                <Pie
                                    data={round.overallPercentage}
                                    dataKey="percentage"
                                    isAnimationActive={false}
                                    labelLine={false}
                                    label={renderPieChartCustomisedLabel}
                                    legendType="rect"
                                >
                                    {round.overall.map((entry, index) => (
                                        <Cell
                                            key={entry}
                                            fill={
                                                CANDIDATE_COLOURS[
                                                    index %
                                                        CANDIDATE_COLOURS.length
                                                ]
                                            }
                                        />
                                    ))}
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
    );
}

export default OverallStatisticsCharts;
