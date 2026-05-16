import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api`
        : "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const analyzeInterview = async (formData) => {
    const response = await API.post("/interview/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" }
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