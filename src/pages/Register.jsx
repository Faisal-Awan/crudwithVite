import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Layout, Typography, Card, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import api from '../api';

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
    formItem: {
        width: '100%',
    },
    content: {
        width: '100%',
        maxWidth: 500,
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
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        marginLeft: '50px'
    },
    loginButton: {
        textAlign: 'center',
        marginTop: '10px',
    },
};

export default function Register() {
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: async (values) => {
            return api.post('/auth/register', values);
        },
        onSuccess: () => {
            message.success('Registration successful');
            navigate('/login');
        },
        onError: (error) => {
            console.error('Registration failed:', error);
            message.error('Registration failed, please try again.');
        },
    });


    const handleRegister = (values) => {
        registerMutation.mutate(values);
    };

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.card}>
                    <Title level={2} style={styles.title}>Register</Title>
                    <Form
                        name="register-form"
                        onFinish={handleRegister}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        <div style={styles.buttonContainer}>
                            <Form.Item style={styles.formItem}>
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    loading={registerMutation.isLoading}
                                >
                                    Register
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                    <div style={styles.loginButton}>
                        <Button
                            type="link"
                            onClick={() => navigate('/login')}
                        >
                            Already have an account? Login here
                        </Button>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
}










// import React, { useState } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';
// import { Form, Input, Button, Layout, Typography, Card, message, Row, Col } from 'antd';

// const { Title } = Typography;
// const { Content } = Layout;

// const styles = {
//     layout: {
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         background: '#f0f2f5',
//     },
//     formItem: {
//         width: '100%',
//     },
//     content: {
//         width: '100%',
//         maxWidth: 500,
//         padding: '20px',
//     },
//     card: {
//         padding: '20px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//     title: {
//         textAlign: 'center',
//         marginBottom: '20px',
//     },
//     buttonContainer: {
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         marginTop: '20px',
//         marginLeft: '50px'

//     },
//     loginButton: {
//         textAlign: 'center',
//         marginTop: '10px',
//     },
// };

// export default function Register() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const navigate = useNavigate();

//     const handleRegister = async (values) => {
//         try {
//             await api.post('/auth/register', { email: values.email, password: values.password, name: values.name });
//             message.success('Registration successful');
//             navigate('/login');
//         } catch (error) {
//             console.error('Registration failed', error);
//             message.error('Registration failed, please try again.');
//         }
//     };


//     return (
//         <Layout style={styles.layout}>
//             <Content style={styles.content}>
//                 <Card bordered={false} style={styles.card}>
//                     <Title level={2} style={styles.title}>Register</Title>
//                     <Form
//                         name="register-form"
//                         onFinish={handleRegister}
//                         initialValues={{ email, password, name }}
//                         labelCol={{ span: 6 }}
//                         wrapperCol={{ span: 18 }}
//                     >

//                         <Form.Item
//                             label="Name"
//                             name="name"
//                             rules={[{ required: true, message: 'Please input your name!' }]}
//                         >
//                             <Input
//                                 placeholder="Enter your name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                         </Form.Item>


//                         <Form.Item
//                             label="Email"
//                             name="email"
//                             rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
//                         >
//                             <Input
//                                 placeholder="Enter your email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </Form.Item>


//                         <Form.Item
//                             label="Password"
//                             name="password"
//                             rules={[{ required: true, message: 'Please input your password!' }]}
//                         >
//                             <Input.Password
//                                 placeholder="Enter your password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </Form.Item>

//                         <div style={styles.buttonContainer}>
//                             <Form.Item style={styles.formItem}>
//                                 <Button type="primary" block htmlType="submit">
//                                     Register
//                                 </Button>
//                             </Form.Item>
//                         </div>
//                     </Form>
//                     <div style={styles.loginButton}>
//                         <Button
//                             type="link"
//                             onClick={() => navigate('/login')}
//                         >
//                             Already have an account? Login here
//                         </Button>
//                     </div>
//                 </Card>
//             </Content>
//         </Layout>
//     );
// }
