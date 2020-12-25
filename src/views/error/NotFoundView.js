import React from 'react';

import { Button, Card, Typography } from 'antd';
import { ErrorOutlineRounded } from '@material-ui/icons';

import { useNavigate } from 'react-router-dom';

function NotFoundView() {
    const navigate = useNavigate();
    return (
        <Card style={{ margin: '3rem 3rem' }}>
            <ErrorOutlineRounded
                style={{ fontSize: 50, width: '100%', fill: 'orange' }}
            />
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                {`We're sorry but we can't find that page...`}
            </Typography.Title>
            <Button
                style={{ width: '100%' }}
                type="primary"
                onClick={() => navigate(-2)}
            >
                Go Back
            </Button>
        </Card>
    );
}

export default NotFoundView;
