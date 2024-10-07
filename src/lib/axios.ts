import axios from "axios";

export const Axios = axios.create({
    baseURL: 'http://localhost:3000/api',
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