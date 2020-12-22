import React from 'react';

import { Form, Input, Button, Card, Divider, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.css';

const formStyle = {
    style: {
        margin: '3rem 3rem',
    },
};

function RegisterView() {
    const [form] = Form.useForm();
    return (
        <Card {...formStyle}>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                Register
            </Typography.Title>
            <Divider />
            <Form form={form}>
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
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="register-form-button"
                    >
                        Register
                    </Button>
                    Already a member? <a href="/login">Login here!</a>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default RegisterView;
