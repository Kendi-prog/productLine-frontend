import api from "../services/axios";

export const fetchOffices = async () => {
    const response = await api.get('/offices');
    return response.data;
}

export const createOffice = async (office: any) => {
    const response = await api.post("/offices", office);
    return response.data;
};