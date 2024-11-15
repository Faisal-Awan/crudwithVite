import React from 'react';
import { Checkbox, Button } from 'antd';

const TodoItem = ({ todo, onDelete, onToggle }) => {
    const styles = {
        todoItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
        },
        completedText: {
            textDecoration: 'line-through',
            color: '#b0b0b0',
        },
        button: {
            marginLeft: '10px',
            padding: '0 8px',
        },
        checkbox: {
            marginRight: '12px',
        },
    };

    return (
        <div style={styles.todoItem}>
            <Checkbox
                checked={todo.completed}
                onChange={onToggle}
                style={styles.checkbox}
            >
                <span style={todo.completed ? styles.completedText : {}}>{todo.name}</span>
            </Checkbox>
            <Button
                type="link"
                danger
                onClick={onDelete}
                style={styles.button}
            >
                Delete
            </Button>
        </div>
    );
};

export default TodoItem;
