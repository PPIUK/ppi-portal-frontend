import React from 'react';
import { Card, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../../utils/useAuth';

const cardStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function TemporaryTokenView() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { token } = useParams();

    if (auth.user && auth.accessToken) {
        navigate('/app/voting/611fed0682c639c1766608fc/vote/1');
        return (
            <Card {...cardStyle}>
                <Typography>Redirecting...</Typography>
            </Card>
        );
    } else {
        auth.temporaryTokenSignIn(token).then(() => {
            navigate('/app/voting/611fed0682c639c1766608fc/vote/1');
        });
        return (
            <Card {...cardStyle}>
                <Typography>Logging in using temporary token...</Typography>
            </Card>
        );
    }
}

export default TemporaryTokenView;
