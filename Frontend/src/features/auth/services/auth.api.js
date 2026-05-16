import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:5000/api";

const API_URL = `${BASE_URL}/auth/`;

export const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}register`, {
            username, email, password
        });
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        console.log('Registration error:', error);
    }
}

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}login`, {
            email, password
        });
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        console.log('Login error:', error);
    }
}

export const logout = async () => {
    try {
        localStorage.removeItem("token");
        return { message: "Logged out successfully" };
    } catch (error) {
        console.log('Logout error:', error);
    }
}

export const getUser = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const response = await axios.get(`${API_URL}profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log('Get user error:', error);
    }
}