// src/pages/Login.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Layout, Typography, Card, message } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

const styles = {
    layout: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
    },
    content: {
        width: '100%',
        maxWidth: 450,
        padding: '20px',
    },
    card: {
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    formItem: {
        width: '100%',
    },
    button: {
        marginTop: '10px',
        width: '100%',
    },
    registerButton: {
        marginTop: '10px',
        textAlign: 'center',
    },
};

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            const response = await api.post('/auth/login', {
                email: values.email,
                password: values.password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/todos');
        } catch (error) {
            console.error('Login failed', error);
            message.error('Login failed, please check your credentials.');
        }
    };

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.card}>
                    <Title level={2} style={styles.title}>Login</Title>
                    <Form
                        name="login-form"
                        onFinish={handleLogin}
                        initialValues={{ email, password }}
                        labelCol={{ span: 6 }} // Label width
                        wrapperCol={{ span: 18 }} // Input width
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                            style={styles.formItem}
                        >
                            <Input
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            style={styles.formItem}
                        >
                            <Input.Password
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item style={styles.formItem}>
                            <Button type="primary" htmlType="submit" block style={styles.button}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Register Button */}
                    <div style={styles.registerButton}>
                        <Button
                            type="link"
                            onClick={() => navigate('/register')}
                        >
                            Don't have an account? Register here
                        </Button>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
}
