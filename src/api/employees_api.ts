import api from "../services/axios";

export const fetchEmployees = async () => {
    const response = await api.get('/employees');
    return response.data;
}

export const createEmployee = async (employee: any) => {
    const response = await api.post("/employees", employee);
    return response.data;
};