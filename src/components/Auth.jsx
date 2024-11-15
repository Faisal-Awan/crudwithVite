// components/Auth.jsx
import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';

const Auth = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = (values) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onLogin(values);
        }, 1000);
    };

    // Inline styles using const
    const styles = {
        authContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            padding: '20px',
        },
        authForm: {
            maxWidth: '400px',
            width: '100%',
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
        },
        button: {
            width: '100%',
            marginTop: '10px',
        },
    };

    return (
        <div style={styles.authContainer}>
            <Form onFinish={handleLogin} style={styles.authForm}>
                <h2 style={styles.heading}>Login</h2>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please enter your email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={styles.button}
                >
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Auth;
