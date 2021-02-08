import { useAuth } from '../../../utils/useAuth';
import { Card, Typography } from 'antd';
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useNavigate, useLocation } from 'react-router';
import qs from 'qs';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

const cardStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function AuthorizeView() {
    const auth = useAuth();
    // const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    // FIXME: Maybe need to convert this user?
    params.user = auth.user;
    console.log(params);

    if (auth.user && auth.accessToken) {
        useEffect(() => {
            console.log('test');
            axios.post(
                'http://localhost:3000/api/auth/authorize',
                qs.stringify(params)
            );
            console.log('test1');
        });

        // useEffect(() => {
        //     setTimeout(() => {
        //         navigate('/app/profile/me');
        //     }, 5 * 1005);
        // });

        return (
            <Card {...cardStyle}>
                <Typography>You are logged in. Redirecting...</Typography>
            </Card>
        );
    }
    return (
        <Card {...cardStyle}>
            <Typography>You are NOT logged in.</Typography>
        </Card>
    );
}

export default AuthorizeView;
