import api from "../services/axios";

export const fetchOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
}