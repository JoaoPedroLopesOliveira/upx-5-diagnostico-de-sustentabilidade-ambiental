import axios from 'axios';

const api = axios.create({
    baseURL: "https://diagnostico-sustentabilidade.onrender.com",
});

export default api;