import api from "../services/axios";

export const fetchOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
}

export const createOrder = async (order: any) => {
    const response = await api.post("/orders", order);
    return response.data;
};

export const updateOrder = async (order: any) => {
    const response = await api.put(
        `/orders/${order.orderNumber}`,
        order
    );
    return response.data;
};

export const deleteOrder = async (orderNumber: number) => {
    await api.delete(`/orders/${orderNumber}`);
};