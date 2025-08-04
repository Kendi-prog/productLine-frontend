import api from "../services/axios";

export const fetchSummary = async () => {
    const response = await api.get('/dashboard/summary');
    return response.data;
}