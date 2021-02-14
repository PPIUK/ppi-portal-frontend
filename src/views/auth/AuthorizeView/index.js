import React from 'react';
import { Card, Typography } from 'antd';
import { useLocation } from 'react-router';
import qs from 'qs';
import axios from 'axios';

import { useAuth } from '../../../utils/useAuth';
import LoginView from '../LoginView';

const cardStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function AuthorizeView() {
    const auth = useAuth();
    const location = useLocation();
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    params.user = auth.user;

    if (auth.user && auth.accessToken) {
        axios.post(
            'http://localhost:3000/api/auth/authorize',
            qs.stringify(params)
        );

        return (
            <Card {...cardStyle}>
                <Typography>You are logged in. Redirecting...</Typography>
            </Card>
        );
    }
    return (
        <Card {...cardStyle}>
            <LoginView />
        </Card>
    );
}

export default AuthorizeView;
