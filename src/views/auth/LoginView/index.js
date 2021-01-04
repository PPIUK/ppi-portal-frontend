import React, { useState } from 'react';

import {
    Form,
    Input,
    Button,
    Checkbox,
    Card,
    Divider,
    Typography,
    Alert,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useAuth } from '../../../utils/useAuth';

import { Link, Navigate, useNavigate } from 'react-router-dom';

import './index.css';

const formStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

const loginErrorAlert = (message) => {
    return (
        <Alert
            message={message}
            type="error"
            showIcon
            style={{
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottom: 0,
                animation: 'login-feedback-enter 0.5s ease-out',
            }}
        />
    );
};

function LoginView() {
    const [form] = Form.useForm();
    const auth = useAuth();
    const navigate = useNavigate();

    const [loginFeedback, setLoginFeedback] = useState(null);

    const onLoginSubmit = (vals) => {
        auth.signin(vals.username, vals.password)
            .then(() => {
                navigate('/app/profile/me');
            })
            .catch((err) => {
                if (err.response.status === 400 || err.response.status === 404)
                    return setLoginFeedback(
                        loginErrorAlert('Invalid credentials!')
                    );

                if (err.response.status === 401)
                    return setLoginFeedback(
                        loginErrorAlert('Account pending verification.')
                    );

                return setLoginFeedback(
                    loginErrorAlert(
                        'Internal server error. Please try again in a moment'
                    )
                );
            });
    };

    if (auth.user) return <Navigate to="/app/profile/me"></Navigate>;

    return (
        <Card {...formStyle}>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Login
            </Typography.Title>
            <Typography.Text type="secondary" style={{ textAlign: 'center' }}>
                If you have filled out the{' '}
                <Typography.Text strong>PPI UK Census</Typography.Text>, please{' '}
                <Link to="/forgot" component={Typography.Link}>
                    reset your password
                </Link>
                . Otherwise you may{' '}
                <Link to="/register" component={Typography.Link}>
                    register
                </Link>{' '}
                as normal
            </Typography.Text>
            <Divider />
            <Form form={form} onFinish={onLoginSubmit}>
                <Form.Item
                    name="username"
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
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Password is required',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Link className="login-form-forgot" to="/forgot">
                        Forgot password
                    </Link>
                </Form.Item>

                {loginFeedback}

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={
                            loginFeedback
                                ? {
                                      borderTopRightRadius: 0,
                                      borderTopLeftRadius: 0,
                                      borderTop: 0,
                                  }
                                : null
                        }
                    >
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default LoginView;