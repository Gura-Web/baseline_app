import axios from 'axios';

const apiClient = axios.create({
  // baseURL: "127.0.0.1:57752",
  // baseURL: "http://localhost:8000",
  baseURL: process.env.REACT_APP_DEV_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

export default apiClient;
