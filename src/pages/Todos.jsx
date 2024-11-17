import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input, Button, List, Card, Typography, message, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
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
    actionButton: {
        marginLeft: '10px',
    },

    actionButtonD: {
        marginLeft: '10px',
        backgroundColor: 'red',
        color: 'white'

    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
};

export default function Todos() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);

    // Fetch logged-in user's profile
    const { data: userProfile } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const response = await api.get('/auth/self');
            return response.data;
        },
        onError: () => message.error('Failed to fetch user profile'),
    });

    // Fetch todos
    const { data: todos, isLoading, isError } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await api.get('/todo');
            return response.data?.data || [];
        },
        onError: () => message.error('Failed to fetch todos'),
    });

    // Add or update todo mutation
    const addOrUpdateTodoMutation = useMutation({
        mutationFn: async (todo) => {
            if (todo.id) {
                // Update existing todo
                await api.put(`/todo/${todo.id}`, {
                    name: todo.name,
                    description: todo.description,
                });
            } else {
                // Add new todo
                await api.post('/todo', {
                    name: todo.name,
                    description: todo.description,
                });
            }
        },
        onSuccess: () => {
            message.success(editingTodo ? 'Todo updated successfully' : 'Todo added successfully');
            queryClient.invalidateQueries(['todos']);
        },
        onError: () => message.error(editingTodo ? 'Failed to update todo' : 'Failed to add todo'),
    });

    // Delete todo mutation
    const deleteTodoMutation = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/todo/${id}`);
        },
        onSuccess: () => {
            message.success('Todo deleted successfully');
            queryClient.invalidateQueries(['todos']);
        },
        onError: () => message.error('Failed to delete todo'),
    });

    // Handle add or update todo
    const handleAddOrUpdateTodo = () => {
        if (!name || !description) return;

        addOrUpdateTodoMutation.mutate({
            id: editingTodo?._id,
            name,
            description,
        });

        setEditingTodo(null);
        setName('');
        setDescription('');
    };

    // Handle edit todo
    const handleEditTodo = (todo) => {
        setEditingTodo(todo);
        setName(todo.name);
        setDescription(todo.description);
    };

    // Handle delete todo
    const handleDeleteTodo = (id) => {
        deleteTodoMutation.mutate(id);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        message.info('Logged out');
        navigate('/');
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading todos</div>;

    return (
        <Layout style={styles.layout}>
            <Content style={styles.content}>
                <div style={styles.header}>
                    <Typography.Text>Welcome, {userProfile?.name || 'User'}😉</Typography.Text>
                    <Button type="default" onClick={handleLogout}>Logout</Button>
                </div>
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
                            onClick={handleAddOrUpdateTodo}
                            style={styles.button}
                            disabled={!name || !description}
                            loading={addOrUpdateTodoMutation.isLoading}
                        >
                            {editingTodo ? 'Update Todo' : 'Add Todo'}
                        </Button>
                    </div>
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
                                        type="primary"
                                        onClick={() => handleEditTodo(todo)}
                                        style={styles.actionButton}
                                    >
                                        Edit
                                    </Button>,
                                    <Button
                                        type="text"
                                        onClick={() => handleDeleteTodo(todo._id)}
                                        style={styles.actionButtonD}
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






// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { Input, Button, List, Card, Typography, message, Layout } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';

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
//     actionButton: {
//         marginLeft: '10px',
//     },
//     header: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '20px',
//     },
// };

// export default function Todos() {
//     const queryClient = useQueryClient();
//     const navigate = useNavigate();
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [editingTodo, setEditingTodo] = useState(null);
//     const [loggedInUser, setLoggedInUser] = useState('');

//     // Fetch logged-in user profile
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const response = await api.get('/auth/self');
//                 setLoggedInUser(response.data?.name || 'User');
//             } catch {
//                 message.error('Failed to fetch user profile');
//             }
//         };
//         fetchUserProfile();
//     }, []);

//     // Fetch todos
//     const { data: todos, isLoading, isError } = useQuery({
//         queryKey: ['todos'],
//         queryFn: async () => {
//             const response = await api.get('/todo');
//             return response.data?.data || [];
//         },
//         onError: () => message.error('Failed to fetch todos'),
//     });

//     // Add todo mutation
//     const addTodoMutation = useMutation({
//         mutationFn: async ({ name, description }) => {
//             await api.post('/todo', { name, description });
//         },
//         onSuccess: () => {
//             message.success('Todo added successfully');
//             queryClient.invalidateQueries(['todos']);
//         },
//         onError: () => message.error('Failed to add todo'),
//     });

//     // Update todo mutation
//     const updateTodoMutation = useMutation({
//         mutationFn: async ({ id, name, description }) => {
//             await api.put(`/todo/${id}`, { name, description });
//         },
//         onSuccess: () => {
//             message.success('Todo updated successfully');
//             queryClient.invalidateQueries(['todos']);
//         },
//         onError: () => message.error('Failed to update todo'),
//     });

//     // Delete todo mutation
//     const deleteTodoMutation = useMutation({
//         mutationFn: async (id) => {
//             await api.delete(`/todo/${id}`);
//         },
//         onSuccess: () => {
//             message.success('Todo deleted successfully');
//             queryClient.invalidateQueries(['todos']);
//         },
//         onError: () => message.error('Failed to delete todo'),
//     });

//     // Handle add or update todo
//     const handleAddOrUpdateTodo = () => {
//         if (editingTodo) {
//             updateTodoMutation.mutate({ id: editingTodo._id, name, description });
//             setEditingTodo(null);
//         } else {
//             addTodoMutation.mutate({ name, description });
//         }
//         setName('');
//         setDescription('');
//     };

//     // Handle edit todo
//     const handleEditTodo = (todo) => {
//         setEditingTodo(todo);
//         setName(todo.name);
//         setDescription(todo.description);
//     };

//     // Handle delete todo
//     const handleDeleteTodo = (id) => {
//         deleteTodoMutation.mutate(id);
//     };

//     // Handle logout
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');

//         message.info('Logged out');
//         navigate('/');
//     };

//     if (isLoading) return <div>Loading...</div>;
//     if (isError) return <div>Error loading todos</div>;

//     return (
//         <Layout style={styles.layout}>
//             <Content style={styles.content}>
//                 <div style={styles.header}>
//                     <Typography.Text>Welcome, {loggedInUser}😉</Typography.Text>
//                     <Button type="default" onClick={handleLogout}>Logout</Button>

//                 </div>
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
//                             onClick={handleAddOrUpdateTodo}
//                             style={styles.button}
//                             disabled={!name || !description}
//                             loading={addTodoMutation.isLoading || updateTodoMutation.isLoading}
//                         >
//                             {editingTodo ? 'Update Todo' : 'Add Todo'}
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
//                                         type="primary"
//                                         onClick={() => handleEditTodo(todo)}
//                                         style={styles.actionButton}
//                                     >
//                                         Edit
//                                     </Button>,
//                                     <Button
//                                         type="danger"
//                                         onClick={() => handleDeleteTodo(todo._id)}
//                                         style={styles.actionButton}
//                                         loading={deleteTodoMutation.isLoading}
//                                     >
//                                         Delete
//                                     </Button>,
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
