import api from "../services/axios";

export const fetchOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
}

export const createOrder = async (order: any) => {
    const response = await api.post("/orders", order);
    return response.data;
};