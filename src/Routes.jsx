import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';
import UserProfile from './pages/UserProfile';

const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/todos" replace /> : children;
};

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />
            <Route
                path="/todos"
                element={
                    <PrivateRoute>
                        <Todos />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <UserProfile />
                    </PrivateRoute>
                }
            />

            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
