import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Avatar, Typography, message, Spin } from 'antd';
import api from '../api';

const { Title } = Typography;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5',
        padding: '20px',
    },
    card: {
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
    },
    avatar: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
};

export default function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const response = await api.get('/auth/self'); // Update endpoint if necessary
            console.log('Profile Response:', response.data);
            setProfile(response.data?.data || {}); // Adjust based on API structure
        } catch (error) {
            message.error('Failed to fetch user profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div style={styles.container}>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Card bordered={false} style={styles.card}>
                    <div style={styles.avatar}>
                        <Avatar
                            size={100}
                            src={profile?.profileImageUrl || '/default-avatar.png'}
                            alt="Profile Image"
                        />
                    </div>
                    <Title level={3} style={{ textAlign: 'center' }}>
                        {profile?.fullName || 'User Name'}
                    </Title>
                    <Descriptions
                        bordered
                        column={1}
                        size="small"
                        labelStyle={{ fontWeight: 'bold' }}
                    >
                        <Descriptions.Item label="Email">
                            {profile?.email || 'Not Available'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Position">
                            {profile?.positionTitle || 'Not Available'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            {profile?.phone || 'Not Available'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Joined At">
                            {profile?.createdAt
                                ? new Date(profile.createdAt).toLocaleDateString()
                                : 'Not Available'}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            )}
        </div>
    );
}
