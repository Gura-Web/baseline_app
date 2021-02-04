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

export const login = (
  email: string,
  password: string,
  active: boolean,
  jumpFunc: { (): void; (): void },
) => {
  api.get('/sanctum/csrf-cookie').then(() => {
    api
      .post('/api/auth/login', {
        // laravel-a@example.com, "password",
        email,
        password,
        active: active ? 1 : 0,
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          jumpFunc();
        }
      })
      .catch(error => {
        console.error(error);
        if (
          error.response.status === 401 ||
          error.response.status === 422 ||
          error.response.status === 500
        ) {
          alert('入力されたメールアドレスかパスワードが間違っています');
        }
      });
  });
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
