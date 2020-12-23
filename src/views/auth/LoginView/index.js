import React from 'react';

import { Form, Input, Button, Checkbox, Card, Divider, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useAuth } from '../../../utils/useAuth';

import { Navigate, useNavigate } from 'react-router-dom';

import './index.css';

const formStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function LoginView() {
    const [form] = Form.useForm();
    const auth = useAuth();
    const navigate = useNavigate();

    const onLoginSubmit = (vals) => {
        auth.signin(vals.username, vals.password).then(() => {
            navigate('/app/profile/me');
        });
    };

    if (auth.user) return <Navigate to="/app/profile/me"></Navigate>;

    return (
        <Card {...formStyle}>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Login
            </Typography.Title>
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

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    Or <a href="/register">register now!</a>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default LoginView;
