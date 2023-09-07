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
    },
    validateStatus: status => status >= 200 && status < 300 || status === 422,
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

// 
const requestHandler = (request) => {
    const token = KeyValueStorage.get("token");
    if (token !== 'undefined') {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
};

const responseHandler = (response) => {
    if (response.status === 401) {
        window.location = path.LOGIN;
    }
    if (response.errors) {
        return Promise.reject(response.message);
    }

    return response;
};

const errorHandler = (error) => {
    if (!error.response) {
        console.log('📡 API | Network/Server error')
        return Promise.reject(error)
      }
    
      // all the error responses
      switch (error.response.status) {
        case 400:
          console.error(error.response.status, error.message)
          console.log('📡 API | Nothing to display', 'Data Not Found')
          break
    
        case 401: // authentication error, logout the user
          console.log('📡 API | Please login again', 'Session Expired')
          localStorage.removeItem('user')
          break
    
        case 403:
          console.error(error.response.status, error.message)
          console.log('📡 API | Access denied', 'Data Not Found')
          break
    
        case 404:
          console.error(error.response.status, error.message)
          console.log('📡 API | Dataset not found', 'Data Not Found')
          break
    
        case 422:
          console.error(error.response.status, error.message, error.response.data.detail)
          console.log('📡 API | Validation error', 'Unprocessable Content')
          break
    
        default:
          console.error(error.response.status, error.message)
      }
      return Promise.reject(error)
    //return Promise.reject(error?.response?.data || 'Something went wrong');
};

axiosInstance.defaults.transformRequest = [function (data, headers) {
    // Do nothing if it's not a GET request
    if (headers.method !== 'GET') {
      return data;
    }
  
    // Get the current URL
    const url = headers.url;
  
    // Replace 'http' with 'https' if it exists
    headers.url = url.replace(/^http:\/\//i, 'https://');
  
    return data;
  }];
  

  axiosInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

axiosInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);


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