import axios from 'axios';


// Look for Vercel's environment variable first; fall back to localhost if it's missing
const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : "http://localhost:5000/api"; 

// const API = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
// });


const API_URL = `${BASE_URL}/auth/`;

export const register = async (username , email, password) => {
    try {
        const response = await axios.post(`${API_URL}register`, {
            username,
            email,
            password
        } ,{ withCredentials: true });
        return response.data;
    } catch (error) {
        console.log('Registration error:', error);
    }
}

export const login = async ( email, password) => {
    try {
        console.log('Attempting login with:', { email, password });
        const response = await axios.post(`${API_URL}login`, {
            
            email,
            password
        } ,{ withCredentials: true });
        return response.data;
    } catch (error) {
        console.log('Login error:', error);
    }
}

export const logout = async () => {
    try {
        const response = await axios.get(`${API_URL}logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log('Logout error:', error);
    }
} 

export const getUser = async()=>{
    try {
        const response = await axios.get(`${API_URL}profile`, { withCredentials: true });
        return response.data;
        
    } catch (error) {
        console.log('Get user error:', error);
    }
}