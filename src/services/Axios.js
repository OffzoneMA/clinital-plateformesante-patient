import axios  from 'axios';
import { ORIGIN,TOKEN } from './api';
import { toast } from 'react-toastify';
// import keyValueStorage from '../utils/storage/keyValueStorage';

let axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    responseType: "json",
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    validateStatus: status => (status >= 200 && status < 300) || status === 422,
});
// Create a cancellation token source outside the interceptors


axiosInstance.interceptors.request.use(
  (config) => {
    // Assign the cancellation token
  let token= localStorage.getItem('user')?.token;
  if(token!=null){
    config.headers.token = localStorage.getItem('user').token;
    config.headers.Authorization = `Bearer ${token}` ;
    return config;
  }else{
    return;
  }
   
}, error => {
    return Promise.reject(error);
});

const requestHandler = (request) => {

    if (TOKEN !== 'undefined') {
        request.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return request;
};

const responseHandler = (response) => {
  
  if (response && response.status === 401) {
    // Handle 401 error - remove token and redirect to login
    toast.error('📡 API | Please login again', 'Session Expired');
    console.log('📡 API | Please login again', 'Session Expired');
    localStorage.removeItem('user'); // Remove token
    window.location = "/"; // Redirect to login
  }
    if (response.errors) {
        return Promise.reject(response.message);
    }

    return response;
};

const errorHandler = (error) => {
    if (!error.response) {
        console.error('📡 API | Network/Server error'+error)
        return Promise.reject(error)
      }
      else if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message); // Handle cancellation
      }
      // all the error responses
      switch (error.response.status) {
        case 400:
          toast.error('📡 API | Nothing to display Data Not Found'+error.response.status+" "+error.message)
          console.error(error.response.status, error.message)
          console.log('📡 API | Nothing to display', 'Data Not Found')
          break
    
        case 401: // authentication error, logout the user
        toast.error('📡 API | Please login again', 'Session Expired')
          console.log('📡 API | Please login again', 'Session Expired')
          localStorage.removeItem('user')
          break
    
        case 403:
          toast.error('📡 API | Access denied Data Not Found'+error.response.status+" "+error.message)
          console.error(error.response.status, error.message)
          console.log('📡 API | Access denied', 'Data Not Found')
          break
    
        case 404:
          toast.error('📡 API | Dataset not found Data Not Found '+error.response.status+" "+error.message)
          console.error(error.response.status, error.message)
          console.log('📡 API | Dataset not found', 'Data Not Found')
          break
    
        case 422:
          toast.error('📡 API | Validation error Unprocessable Content '+error.response.status+" "+error.message+" "+error.response.data.detail)
          console.error(error.response.status, error.message, error.response.data.detail)
          console.log('📡 API | Validation error', 'Unprocessable Content')
          break
    
        default:
          toast.error(error.response.status, error.message)
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