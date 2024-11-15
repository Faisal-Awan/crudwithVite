import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';

// Mock authentication status (replace with your authentication logic)
const isAuthenticated = () => {
  // Example: Check local storage or global auth context
  return localStorage.getItem("user") ? true : false;
};

// Private Route Wrapper Component
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Public Route Wrapper Component (redirect if logged in)
const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/todos" /> : children;
};

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
