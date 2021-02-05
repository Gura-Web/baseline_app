import axios, { AxiosRequestConfig } from 'axios';
import { User } from './models';
import camelcaseKeys from 'camelcase-keys';

export const DEFAULT_API_CONFIG: AxiosRequestConfig = {
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

export const getMyProfileFactory = (optionConfig?: AxiosRequestConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const getMyProfile = async () => {
    const response = await instance.get('/api/auth/user');

    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const user: User = camelcaseKeys(response.data);

    return user;
  };

  return getMyProfile;
};
