import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { Input, Button, List, Card, Typography, message, Layout } from 'antd';

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
    const queryClient = useQueryClient();

    const { data: todos, isLoading, isError, refetch } = useQuery(
        ['todos'],
        async () => {
            const response = await api.get('/todo');
            return Array.isArray(response.data?.data) ? response.data.data : [];
        },
        {
            onError: () => message.error('Failed to fetch todos'),
            onSuccess: (data) => {
            },
        }
    );

    const addTodoMutation = useMutation(
        async (newTodo) => {
            return await api.post('/todo', newTodo);  // Make sure the API call is correct
        },
        {
            onSuccess: () => {
                message.success('Todo added successfully');
                queryClient.invalidateQueries(['todos']);  // Refetch todos after adding
            },
            onError: () => {
                message.error('Failed to add todo');
            },
        }
    );

    const deleteTodoMutation = useMutation(
        async (id) => {
            await api.delete(`/todo/${id}`);
        },
        {
            onSuccess: () => {
                message.success('Todo deleted successfully');
                queryClient.invalidateQueries('todos');
            },
            onError: () => message.error('Failed to delete todo'),
        }
    );

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleAddTodo = () => {
        addTodoMutation.mutate({ name, description });
        setName('');
        setDescription('');
    };

    const handleDeleteTodo = (id) => {
        deleteTodoMutation.mutate(id);
    };

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <Card bordered={false} style={styles.card}>
                    <Title level={2} style={{ textAlign: 'center' }}>Todo List</Title>

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
                            disabled={!name || !description}
                            loading={addTodoMutation.isLoading}
                        >
                            Add Todo
                        </Button>
                    </div>

                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Failed to load todos.</div>}

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
                                        loading={deleteTodoMutation.isLoading}
                                    >
                                        Delete
                                    </Button>,
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








// import React, { useEffect, useState } from 'react';
// import api from '../api';
// import { Input, Button, List, Card, Typography, message, Layout } from 'antd';

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
//     content: {
//         width: '100%',
//         maxWidth: 600,
//         padding: '20px',
//     },
//     card: {
//         padding: '20px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//     input: {
//         marginBottom: '10px',
//     },
//     button: {
//         marginTop: '10px',
//         width: '100%',
//     },
//     todoItem: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     deleteButton: {
//         marginLeft: '10px',
//     },
// };

// export default function Todos() {
//     const [todos, setTodos] = useState([]);
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');

//     const fetchTodos = async () => {
//         try {
//             const response = await api.get('/todo');
//             console.log('API Response:', response.data);

//             // Extract todos from the "data" key
//             const fetchedTodos = Array.isArray(response.data?.data) ? response.data.data : [];
//             setTodos(fetchedTodos);
//         } catch (error) {
//             message.error('Failed to fetch todos');
//             setTodos([]); // Ensure todos is reset in case of an error
//         }
//     };


//     const handleAddTodo = async () => {
//         try {
//             await api.post('/todo', { name, description });
//             setName('');
//             setDescription('');
//             fetchTodos();
//             message.success('Todo added successfully');
//         } catch (error) {
//             message.error('Failed to add todo');
//         }
//     };

//     const handleDeleteTodo = async (id) => {
//         try {
//             await api.delete(`/todo/${id}`);
//             fetchTodos();
//             message.success('Todo deleted successfully');
//         } catch (error) {
//             message.error('Failed to delete todo');
//         }
//     };

//     useEffect(() => {
//         fetchTodos();
//     }, []);

//     return (
//         <Layout style={styles.layout}>
//             <Content style={styles.content}>
//                 <Card bordered={false} style={styles.card}>
//                     <Title level={2} style={{ textAlign: 'center' }}>Todo List</Title>

//                     <div>
//                         <Input
//                             placeholder="Todo Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             style={styles.input}
//                         />
//                         <Input
//                             placeholder="Description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             style={styles.input}
//                         />
//                         <Button
//                             type="primary"
//                             onClick={handleAddTodo}
//                             style={styles.button}
//                             disabled={!name || !description}
//                         >
//                             Add Todo
//                         </Button>
//                     </div>

//                     <List
//                         style={{ marginTop: '20px' }}
//                         header={<div>Todo Items</div>}
//                         bordered
//                         dataSource={todos}
//                         renderItem={(todo) => (
//                             <List.Item
//                                 key={todo._id}
//                                 style={styles.todoItem}
//                                 actions={[
//                                     <Button
//                                         type="danger"
//                                         onClick={() => handleDeleteTodo(todo._id)}
//                                         style={styles.deleteButton}
//                                     >
//                                         Delete
//                                     </Button>
//                                 ]}
//                             >
//                                 <div>
//                                     <strong>{todo.name}</strong>
//                                     <p>{todo.description}</p>
//                                 </div>
//                             </List.Item>
//                         )}
//                     />
//                 </Card>
//             </Content>
//         </Layout>
//     );
// }
