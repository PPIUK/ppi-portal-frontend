import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Card, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import ThesesTable from '../components/ThesesTable';

export default function ThesisSearchView() {
    const [theses, setTheses] = useState(null);

    useEffect(() => {
        // fetch data
        axios.get(`/api/thesis`).then((res) => {
            setTheses(res.data.theses);
        });
    }, []);
    return (
        <Card
            title={
                <span>
                    <SearchOutlined /> Search
                </span>
            }
        >
            {theses ? (
                <ThesesTable theses={theses} isPublic={false} />
            ) : (
                <Spin />
            )}
        </Card>
    );
}
