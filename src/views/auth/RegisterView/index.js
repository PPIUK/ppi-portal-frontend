import React from 'react';

import { Card, Divider, Typography } from 'antd';

import './index.css';

import MandatoryForm from '../../../components/FormDetailsMandatory';
import { Navigate } from 'react-router';

import { useAuth } from '../../../utils/useAuth';

const formStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function RegisterView() {
    const auth = useAuth();

    if (auth.user) return <Navigate to="/app/profile/me"></Navigate>;

    return (
        <Card {...formStyle}>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Register
            </Typography.Title>
            <Divider />
            <MandatoryForm />
        </Card>
    );
}

export default RegisterView;
