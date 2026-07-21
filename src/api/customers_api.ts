import api from "../services/axios";

export const fetchCustomers = async () => {
    const response = await api.get('/customers');
    return response.data;
}

export const createCustomer = async (customer: any) => {
    const response = await api.post("/customers/save", customer);
    return response.data;
};

export const updateCustomer = async (customer: any) => {
    const response = await api.put(
        `/customers/${customer.customerNumber}`,
        customer
    );
    return response.data;
};

export const deleteCustomer = async (customerNumber: number) => {
    await api.delete(`/customers/${customerNumber}`);
};