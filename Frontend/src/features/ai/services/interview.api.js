import axios from "axios";

// Look for Vercel's environment variable first; fall back to localhost if it's missing
const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : "http://localhost:5000/api"; 

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const analyzeInterview = async (formData) => {
    const response = await API.post("/interview/analyze", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};

export const getMyReports = async () => {
    const response = await API.get("/interview/my-reports");
    return response.data;
};

export const getReportById = async (id) => {
    const response = await API.get(`/interview/${id}`);
    return response.data;
};

export const deleteReport = async (id) => {
    const response = await API.delete(`/interview/${id}`);
    return response.data;
};