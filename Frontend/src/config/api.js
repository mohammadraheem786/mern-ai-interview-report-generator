import axios from "axios";

// 1. Grab the URL dynamically based on environment (.env or Vercel settings)
const API_BASE_URL = import.meta.env.VITE_API_URL;

// 2. Create and export an axios instance with that base URL pre-configured
const api = axios.create({
   baseURL: API_BASE_URL,
   withCredentials: true // Crucial if you are using cookies/JWT sessions
});

export default api;