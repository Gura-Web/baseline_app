import axios, { AxiosRequestConfig } from 'axios';

const DEFAULT_API_CONFIG: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_DEV_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
};

export const api = axios.create({
  ...DEFAULT_API_CONFIG,
});
