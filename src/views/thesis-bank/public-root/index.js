import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Tree } from 'antd';
import { Link } from 'react-router-dom';

export default function PublicThesesView() {
    const initTreeData = [
        {
            title: 'Clusters',
            key: 'clusters',
            children: [
                {
                    title: 'Economics and Business',
                    key: 'Economics and Business',
                },
                {
                    title: 'Education',
                    key: 'Education',
                },
                {
                    title: 'Energy',
                    key: 'Energy',
                },
                {
                    title: 'Health',
                    key: 'Health',
                },
                {
                    title: 'Infrastructure and Built Environment',
                    key: 'Infrastructure and Built Environment',
                },
                {
                    title: 'Politics and Law',
                    key: 'Politics and Law',
                },
                {
                    title: 'Social Development, Arts and Humanity',
                    key: 'Social Development, Arts and Humanity',
                },
                {
                    title: 'STEM',
                    key: 'STEM',
                },
            ],
        },
    ];

    const [theses, setTheses] = useState(initTreeData);

    useEffect(() => {
        axios.get('/api/thesis/').then((res) => {
            let clusters = theses.find((item) => {
                return item.key === 'clusters';
            });
            for (const cluster of clusters.children) {
                let clusteredTheses = res.data.theses.filter((item) => {
                    return item.cluster === cluster.key;
                });
                cluster.children = clusteredTheses.map((item) => {
                    return {
                        title: (
                            <Link to={`/thesis/${item._id}`}>{item.title}</Link>
                        ),
                        key: item._id,
                    };
                });
            }
            setTheses([clusters]);
        });
    }, []);

    return (
        <Tree
            defaultExpandedKeys={['clusters']}
            selectable={false}
            treeData={theses}
        />
    );
}
