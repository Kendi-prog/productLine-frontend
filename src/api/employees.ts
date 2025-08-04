import api from "../services/axios";

export const fetchEmployees = async () => {
    const response = await api.get('/employees');
    return response.data;
}