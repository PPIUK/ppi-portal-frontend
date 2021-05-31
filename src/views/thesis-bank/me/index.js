import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useAuth } from '../../../utils/useAuth';
import { Card, Spin } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import ThesesTable from '../components/ThesesTable';

export default function ThesisMySubmissionsView() {
    const auth = useAuth();
    const [theses, setTheses] = useState(null);

    useEffect(() => {
        // fetch data
        axios.get(`/api/thesis?uploadedBy=${auth.user._id}`).then((res) => {
            setTheses(res.data.theses);
        });
    }, []);
    return (
        <Card
            title={
                <span>
                    <CopyOutlined /> My Submissions
                </span>
            }
        >
            {theses ? <ThesesTable theses={theses} /> : <Spin />}
        </Card>
    );
}
