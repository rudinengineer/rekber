import axios from "axios";

export const Axios = axios.create({
    baseURL: 'https://rekber-tau.vercel.app/api',
    headers: {
        "Content-Type": "application/json"
    }
})

export const AxiosData = axios.create({
    baseURL: '/api',
    headers: {
        "Content-Type": "multipart/form-data"
    }
})