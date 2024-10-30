import axios from "axios";

const baseUrl = 'http://localhost:3000/api'

export const Axios = axios.create({
    // baseURL: 'https://rekber-tau.vercel.app/api',
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
})

export const AxiosData = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})