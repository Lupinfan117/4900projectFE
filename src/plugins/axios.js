// axios-config.js
import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: 'https://parker2252.pythonanywhere.com/', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    
  },
});

// Add an interceptor for handling request errors
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any request-specific logic here
    const token = localStorage.getItem('token'); // Retrieve your Bearer token from where it's stored (e.g., localStorage)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor for handling response errors
axiosInstance.interceptors.response.use(
  (response) => {
    // You can add any response-specific logic here
    return response;
  },
  (error) => {
    if (error.response.status == 401){
      if (window.location.pathname != '/login'){

        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
