import api from "../services/axios";

export const fetchPayments = async () => {
    const response = await api.get('/payments');
    return response.data;
}

export const fetchPaymentById = async (
    customerNumber: number,
    checkNumber: string
) => {
    const response = await api.get(
        `/payments/${customerNumber}/${checkNumber}`
    );
    return response.data;
};

export const createPayment = async (payment: any) => {
    const response = await api.post("/payments", payment);
    return response.data;
};

export const updatePayment = async (payment: any) => {
    const response = await api.put(
        `/payments/${payment.id.customerNumber}/${payment.id.checkNumber}`,
        payment
    );
    return response.data;
};

export const deletePayment = async (
    customerNumber: number,
    checkNumber: string
) => {
    await api.delete(`/payments/${customerNumber}/${checkNumber}`);
};