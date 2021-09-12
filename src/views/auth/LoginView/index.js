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
    Image,
    Grid,
    Space,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useAuth } from '../../../utils/useAuth';

import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import './index.css';

const formStyle = {
    style: {
        margin: '2rem 2rem',
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

function LoginView({ appOAuthLogin }) {
    const [form] = Form.useForm();
    const auth = useAuth();
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate();
    const screens = Grid.useBreakpoint();

    const [loginFeedback, setLoginFeedback] = useState(null);

    const onLoginSubmit = (vals) => {
        auth.signin(vals.username, vals.password)
            .then(() => {
                if (
                    appOAuthLogin === undefined ||
                    Object.keys(appOAuthLogin).length === 0
                ) {
                    let redirPath = query.get('redirect') || '/app/profile/me';
                    console.log(redirPath);
                    navigate(redirPath);
                }
            })
            .catch((err) => {
                if (err.response.status === 400 || err.response.status === 404)
                    return setLoginFeedback(
                        loginErrorAlert('Invalid credentials!')
                    );

                if (err.response.status === 401)
                    return setLoginFeedback(
                        loginErrorAlert('Account pending verification check your email inbox or spam')
                    );

                return setLoginFeedback(
                    loginErrorAlert(
                        'Internal server error. Please try again in a moment'
                    )
                );
            });
    };

    if (auth.user)
        return (
            <Navigate
                to={query.get('redirect') || '/app/profile/me'}
            ></Navigate>
        );

    return (
        <Card {...formStyle}>
            <Space direction="vertical">
                <Space style={{ width: '100%', justifyContent: 'center' }}>
                    {!screens.lg && (
                        <Image
                            width={100}
                            src="https://ppiuk.org/wp-content/uploads/2017/05/ppiuk.jpg"
                        />
                    )}
                    <Typography.Title level={2} style={{ textAlign: 'center' }}>
                        Login
                    </Typography.Title>
                </Space>
                <Typography.Text
                    type="secondary"
                    style={{ textAlign: 'center' }}
                >
                    If you have filled out the{' '}
                    <Typography.Text strong>PPI UK Census</Typography.Text>,
                    please{' '}
                    <Link to="/forgot" component={Typography.Link}>
                        reset your password
                    </Link>
                    . Otherwise you may{' '}
                    <Link to="/register" component={Typography.Link}>
                        register
                    </Link>{' '}
                    as normal
                </Typography.Text>
            </Space>

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
