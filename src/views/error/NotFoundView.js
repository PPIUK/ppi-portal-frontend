import React from 'react';

import { Card, Typography } from 'antd';
import { ErrorOutlineRounded } from '@material-ui/icons';

function NotFoundView() {
    return (
        <Card style={{ margin: '3rem 3rem' }}>
            <ErrorOutlineRounded
                style={{ fontSize: 50, width: '100%', fill: 'orange' }}
            />
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                {`We're sorry but we can't find that page...`}
            </Typography.Title>
        </Card>
    );
}

export default NotFoundView;
