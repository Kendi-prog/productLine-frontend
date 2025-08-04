import api from "../services/axios";

export const fetchPayments = async () => {
    const response = await api.get('/payments');
    return response.data;
}