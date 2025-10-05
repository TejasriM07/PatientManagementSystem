import axios from 'axios';

// API configuration for Patient Management System
let baseURL = process.env.REACT_APP_API_URL || 'https://patientmanagementsystem-gy67.onrender.com/api';

// If environment variable is set but doesn't end with /api, add it
if (process.env.REACT_APP_API_URL && !process.env.REACT_APP_API_URL.endsWith('/api')) {
  baseURL = process.env.REACT_APP_API_URL + '/api';
}

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Handle unauthorized error (clear token and redirect to login)
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 404:
          console.error('Resource not found:', error.response.config.url);
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;