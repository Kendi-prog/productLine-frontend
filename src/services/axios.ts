import axios from "axios";

const api = axios.create({
    baseURL: "https://productline-backend-production.up.railway.app/api",
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;