import api from "../services/axios";

export const fetchOffices = async () => {
    const response = await api.get('/offices');
    return response.data;
}