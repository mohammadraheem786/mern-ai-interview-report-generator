import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
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