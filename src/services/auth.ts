import axios, { AxiosRequestConfig } from 'axios';
import { api, DEFAULT_API_CONFIG } from './api';
import { LoginParams } from '../actions/auth/doLogin';

export const doLoginFactory = (
  params: LoginParams,
  optionConfig?: AxiosRequestConfig,
) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const doLogin = async () => {
    // cookieの入手
    await instance.get('/sanctum/csrf-cookie');
    // ログイン処理
    const response = await instance.post('/api/auth/login', { ...params });

    if (response.status !== 200) {
      throw new Error('Server Error');
    }
  };

  return doLogin;
};

export const doLogoutFactory = (optionConfig?: AxiosRequestConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const doLogout = async () => {
    // ログイン処理
    const response = await instance.post('/api/auth/logout');

    if (response.status !== 200) {
      throw new Error('Server Error');
    }
  };

  return doLogout;
};

export const logout = (func: { (): void; (): void }) => {
  api
    .post('/api/auth/logout')
    .then(response => {
      console.log(response.status);
      if (response.status === 200) {
        func();
      }
    })
    .catch(error => console.error(error));
};
