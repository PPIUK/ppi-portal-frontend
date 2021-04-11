import React, { useEffect, useState } from 'react';
import {
    Card,
    Tabs,
    Typography,
    Skeleton,
    Table,
    Space,
    Image,
    Grid,
} from 'antd';
import { BarChart, PieChart, CallSplit, School } from '@material-ui/icons';

import axios from 'axios';
import TableauEmbed from '../../components/TableauEmbed';

const tableStyle = {
    style: {
        margin: '2rem 2rem',
        maxWidth: '1030px',
    },
};

const branchTableCols = [
    {
        title: 'Branch',
        dataIndex: ['_id', 'branch'],
        key: 'branch',
    },
    {
        title: 'Count',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        defaultSortOrder: 'descend',
    },
];

const uniTableCols = [
    {
        title: 'University',
        dataIndex: ['_id', 'university'],
        key: 'uni',
    },
    {
        title: 'Count',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        defaultSortOrder: 'descend',
    },
];

function SummaryTable() {
    const [branchData, setBranchData] = useState(null);
    const [uniData, setUniData] = useState(null);
    const [totalMembers, setTotalMembers] = useState(null);
    const screens = Grid.useBreakpoint();

    const generalTableauUrl =
        'https://public.tableau.com/views/PPIUKCondition_16168364479130/PPIUK-Overall?:language=en&:display_count=y&:origin=viz_share_link';

    const branchesTableauUrl =
        'https://public.tableau.com/views/PPIBranchesCondition_16168358589690/PPIBranches?:language=en&:display_count=y&:origin=viz_share_link';

    useEffect(() => {
        axios
            .get('/api/public/members/uni')
            .then((resp) => setUniData(resp.data.data));

        axios.get('/api/public/members/branch').then((resp) => {
            setBranchData(resp.data.data);
            setTotalMembers(
                resp.data.data
                    .map((branch) => branch.count)
                    .reduce((acc, count) => count + acc)
            );
        });
    }, []);
    return (
        <Card {...tableStyle}>
            <Space>
                {screens.lg && (
                    <Image
                        width={100}
                        src="https://ppiuk.org/wp-content/uploads/2017/05/ppiuk.jpg"
                    />
                )}

                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    Statistics: {totalMembers} Members
                </Typography.Title>
            </Space>

            <Tabs defaultActiveKey="General Infographic">
                <Tabs.TabPane
                    tab={
                        <span>
                            <BarChart
                                style={{ fontSize: 15, marginRight: '5px' }}
                            />
                            General Infographic
                        </span>
                    }
                    key="General Infographic"
                >
                    <TableauEmbed url={generalTableauUrl} />
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab={
                        <span>
                            <PieChart
                                style={{ fontSize: 15, marginRight: '5px' }}
                            />
                            Per Branch Infographic
                        </span>
                    }
                    key="Per Branch Infographic"
                >
                    <TableauEmbed url={branchesTableauUrl} />
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab={
                        <span>
                            <CallSplit
                                style={{ fontSize: 15, marginRight: '5px' }}
                            />
                            Branch
                        </span>
                    }
                    key="Branch"
                >
                    {branchData && (
                        <Table
                            columns={branchTableCols}
                            dataSource={branchData}
                        />
                    )}
                    {!branchData && <Skeleton />}
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab={
                        <span>
                            <School
                                style={{ fontSize: 15, marginRight: '5px' }}
                            />
                            University
                        </span>
                    }
                    key="Uni"
                >
                    {uniData && (
                        <Table columns={uniTableCols} dataSource={uniData} />
                    )}
                    {!uniData && <Skeleton />}
                </Tabs.TabPane>
            </Tabs>
        </Card>
    );
}

export default SummaryTable;
