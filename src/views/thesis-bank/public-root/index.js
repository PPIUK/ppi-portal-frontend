import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Collapse, Typography } from 'antd';
import ThesesTable from '../components/ThesesTable';

const { Panel } = Collapse;

export default function PublicThesesView() {
    const initData = [
        {
            cluster: 'Economics and Business',
        },
        {
            cluster: 'Education',
        },
        {
            cluster: 'Energy',
        },
        {
            cluster: 'Health',
        },
        {
            cluster: 'Infrastructure and Built Environment',
        },
        {
            cluster: 'Politics and Law',
        },
        {
            cluster: 'Social Development, Arts and Humanity',
        },
        {
            cluster: 'STEM',
        },
    ];

    const [theses, setTheses] = useState(null);

    useEffect(() => {
        axios.get('/api/thesis/').then((res) => {
            for (const cluster of initData) {
                cluster.theses = res.data.theses.filter((item) => {
                    return item.cluster === cluster.cluster;
                });
            }
            setTheses(initData);
        });
    }, []);

    const selectCluster = (name) => {
        return theses.find((item) => item.cluster === name).theses;
    };

    return (
        <div>
            <Typography.Title level={3}>Clusters</Typography.Title>

            <Collapse 
                bordered={false} 
                defaultActiveKey={['1','2','3','4','5','6','7','8']} 
                expandIconPosition={'right'}>
                <Panel
                    header="Economics and Business"
                    key="Economics and Business"
                >
                    {theses && (
                        <ThesesTable
                            theses={selectCluster('Economics and Business')}
                            isPublic={true}
                        />
                    )}
                </Panel>
                <Panel header="Education" key="Education">
                    {theses && (
                        <ThesesTable
                            theses={selectCluster('Education')}
                            isPublic={true}
                        />
                    )}
                </Panel>
                <Panel header="Energy" key="Energy">
                    {theses && (
                        <ThesesTable
                            theses={selectCluster('Energy')}
                            isPublic={true}
                        />
                    )}
                </Panel>
                <Panel header="Health" key="Health">
                    {theses && (
                        <ThesesTable
                            theses={selectCluster('Health')}
                            isPublic={true}
                        />
                    )}
                </Panel>
                <Panel
                    header="Infrastructure and Built Environment"
                    key="Infrastructure and Built Environment"
                >
                    {theses && (
                        <ThesesTable
                            theses={selectCluster(
                                'Infrastructure and Built Environment'
                            )}
                            isPublic={true}
                        />
                    )}
                </Panel>
                <Panel header="Politics and Law" key="Politics and Law">
                    {theses && (
                        <ThesesTable
                            theses={selectCluster('Politics and Law')}
                            isPublic={true}
                        />
                    )}
                </Panel>
                <Panel
                    header="Social Development, Arts and Humanity"
                    key="Social Development, Arts and Humanity"
                >
                    {theses && (
                        <ThesesTable
                            theses={selectCluster(
                                'Social Development, Arts and Humanity'
                            )}
                            isPublic={true}
                        />
                    )}
                </Panel>
                <Panel header="STEM" key="STEM">
                    {theses && (
                        <ThesesTable
                            theses={selectCluster('STEM')}
                            isPublic={true}
                        />
                    )}
                </Panel>
            </Collapse>
        </div>
    );
}
