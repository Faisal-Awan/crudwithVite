import React from 'react';
import { List, Row, Col, Card, Button, Typography } from 'antd';
import TodoItem from './TodoItem';

const { Title } = Typography;

const TodoList = ({ todos, onDelete, onToggle }) => {

    const styles = {
        container: {
            padding: '20px',
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#1890ff',
        },
        row: {
            display: 'flex',
            justifyContent: 'center',
        },
        card: {
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
        },
        cardHover: {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        },
        cardActions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        deleteButton: {
            marginLeft: '10px',
        },
        description: {
            fontSize: '14px',
            color: '#555',
            marginTop: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <Title level={2} style={styles.title}>Todo List</Title>
            <Row gutter={[16, 16]} style={styles.row}>
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <List
                        grid={{
                            gutter: 16,
                            column: 1,
                        }}
                        dataSource={todos}
                        renderItem={(todo) => (
                            <List.Item key={todo.id}>
                                <Card
                                    title={todo.name}
                                    bordered={false}
                                    style={styles.card}
                                    hoverable
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.cardHover.boxShadow}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = styles.card.boxShadow}
                                    extra={
                                        <div style={styles.cardActions}>
                                            <Button onClick={() => onToggle(todo.id)} type="primary">
                                                {todo.completed ? 'Undo' : 'Complete'}
                                            </Button>
                                            <Button
                                                type="danger"
                                                onClick={() => onDelete(todo.id)}
                                                style={styles.deleteButton}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    }
                                >
                                    <p style={styles.description}>{todo.description}</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default TodoList;
