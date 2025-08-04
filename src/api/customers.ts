import api from "../services/axios";

export const fetchCustomers = async () => {
    const response = await api.get('/customers');
    return response.data;
}