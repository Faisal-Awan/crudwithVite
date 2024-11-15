// src/pages/Todos.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Input, Button, List, Card, Typography, message, Layout, Row, Col } from 'antd';

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
        maxWidth: 600,
        padding: '20px',
    },
    card: {
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
        marginBottom: '10px',
    },
    button: {
        marginTop: '10px',
        width: '100%',
    },
    todoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deleteButton: {
        marginLeft: '10px',
    },
};

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const fetchTodos = async () => {
        try {
            const response = await api.get('/todo');
            setTodos(response.data);
        } catch (error) {
            message.error('Failed to fetch todos');
        }
    };

    const handleAddTodo = async () => {
        try {
            await api.post('/todo', { name, description });
            setName('');
            setDescription('');
            fetchTodos();
            message.success('Todo added successfully');
        } catch (error) {
            message.error('Failed to add todo');
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await api.delete(`/todo/${id}`);
            fetchTodos();
            message.success('Todo deleted successfully');
        } catch (error) {
            message.error('Failed to delete todo');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.card}>
                    <Title level={2} style={{ textAlign: 'center' }}>Todo List</Title>

                    {/* Todo Form */}
                    <div>
                        <Input
                            placeholder="Todo Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                        />
                        <Input
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={styles.input}
                        />
                        <Button
                            type="primary"
                            onClick={handleAddTodo}
                            style={styles.button}
                            disabled={!name || !description} // Disable button if fields are empty
                        >
                            Add Todo
                        </Button>
                    </div>

                    {/* Todo List */}
                    <List
                        style={{ marginTop: '20px' }}
                        header={<div>Todo Items</div>}
                        bordered
                        dataSource={todos}
                        renderItem={(todo) => (
                            <List.Item
                                key={todo._id}
                                style={styles.todoItem}
                                actions={[
                                    <Button
                                        type="danger"
                                        onClick={() => handleDeleteTodo(todo._id)}
                                        style={styles.deleteButton}
                                    >
                                        Delete
                                    </Button>
                                ]}
                            >
                                <div>
                                    <strong>{todo.name}</strong>
                                    <p>{todo.description}</p>
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            </Content>
        </Layout>
    );
}
