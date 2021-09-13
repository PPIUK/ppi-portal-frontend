import React from 'react';

import { Form, Input, Button, Card, Divider, Typography, Modal } from 'antd';

import { useAuth } from '../../../utils/useAuth';

import { Navigate, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

const formStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function resetSuccess(message, navigate) {
    let secondsToGo = 5;
    const modal = Modal.info({
        title: 'Reset Password',
        content: `${message}. You will be redirected in ${secondsToGo} seconds`,
    });
    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            content: `${message}. You will be redirected in ${secondsToGo} seconds`,
        });
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
        navigate('/login');
    }, secondsToGo * 1005);
}

const passwordRules = [{ required: true, message: 'Please enter a password!' }];
const confirmPasswordRules = [
    {
        required: true,
        message: 'Please confirm your password',
    },
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }

            return Promise.reject(
                'The two passwords that you entered do not match!'
            );
        },
    }),
];

function PasswordResetView() {
    const [form] = Form.useForm();
    const { token } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();

    const onResetSubmit = (vals) => {
        axios
            .post(`/api/auth/reset-password/${token}`, {
                password: vals.password,
            })
            .then(() => {
                resetSuccess('Password reset successfully!', navigate);
            })
            .catch(() => {
                Modal.error({
                    title: 'Reset Password',
                    content:
                        'A server error has occured. Please try again in a moment',
                });
            });
    };

    if (auth.user) return <Navigate to="/app/profile/me"></Navigate>;

    return (
        <Card {...formStyle}>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Reset Password
            </Typography.Title>
            <Divider />
            <Form form={form} onFinish={onResetSubmit}>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={passwordRules}
                    hasFeedback
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="passwordConfirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    rules={confirmPasswordRules}
                    hasFeedback
                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default PasswordResetView;
