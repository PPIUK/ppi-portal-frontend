import React from 'react';
import { Form, Input, Button } from 'antd';

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };
  const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
  };

// define validation rules for the form fields
const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
]

/**
 * Login form component for signup.
 */
class LoginForm extends React.Component {
    
  render() { 
    return (
        <div style={{marginTop: "2rem"}}>
            <Form {...formItemLayout} name="login" onFinish={this.login} scrollToFirstError >
                <Form.Item name="username" label="Username" rules={usernameRules} >
                    <Input placeholder="please input your university email"/>
                </Form.Item>
                <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
                    <Input.Password placeholder="password"/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        </div>
    );
  };
};

export default LoginForm;
