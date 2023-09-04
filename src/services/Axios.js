import axios from 'axios';
import { ORIGIN } from './api';

const BASE_URL = "apidb.clinital.io";

let axiosInstance = axios.create({
    baseURL: BASE_URL,
    responseType: "json",
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

axiosInstance.interceptors.request.use(config => {
    config.headers.token = localStorage.getItem('user').token;
    config.headers.Authorization = localStorage.getItem('user').token;

    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    if (process.env.NODE_ENV === 'production') {
        const { error } = response;

        if (error) {
            return Promise.reject(error);
        }

        return response;
    }

    return response;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;