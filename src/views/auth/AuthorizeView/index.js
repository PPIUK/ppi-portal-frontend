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

    if (auth.user && auth.accessToken) {
        params.user = auth.user;
        axios.post('/api/auth/authorize', qs.stringify(params), {
            withCredentials: true,
        });

        return (
            <Card {...cardStyle}>
                <Typography>You are logged in. Redirecting...</Typography>
            </Card>
        );
    }
    return (
        <Card {...cardStyle}>
            <LoginView appOAuthLogin={params} />
        </Card>
    );
}

export default AuthorizeView;
