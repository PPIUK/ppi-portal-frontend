import React from 'react';

import { Form, Input, Button, Card, Divider, Typography, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useAuth } from '../../../utils/useAuth';

import { Navigate, useNavigate } from 'react-router-dom';

import axios from 'axios';

const formStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function resetSuccess(message, navigate) {
    let secondsToGo = 5;
    const modal = Modal.info({
        title: 'Forgot Password',
        content: `${message} You will be redirected in ${secondsToGo} seconds`,
    });
    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            content: `${message} You will be redirected in ${secondsToGo} seconds`,
        });
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
        navigate('/login');
    }, secondsToGo * 1005);
}

function ForgotPasswordView() {
    const [form] = Form.useForm();
    const auth = useAuth();
    const navigate = useNavigate();

    const onResetSubmit = (vals) => {
        axios
            .post('/api/auth/forgot', {
                email: vals.email,
            })
            .catch(() => {})
            .then(() => {
                resetSuccess(
                    'You will receive a password reset link soon if the email entered was valid',
                    navigate
                );
            });
    };

    if (auth.user) return <Navigate to="/app/profile/me"></Navigate>;

    return (
        <Card {...formStyle}>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Forgot Password
            </Typography.Title>
            <Divider />
            <Form form={form} onFinish={onResetSubmit}>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Email is required',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Request Password Reset
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default ForgotPasswordView;
