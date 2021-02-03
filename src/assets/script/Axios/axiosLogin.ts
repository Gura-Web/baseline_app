import { apiClient } from '../index';

export const login = (
  email: string,
  password: string,
  active: boolean,
  jumpFunc: { (): void; (): void },
) => {
  apiClient.get('/sanctum/csrf-cookie').then(() => {
    apiClient
      .post('/api/auth/login', {
        // laravel-a@example.com, "password",
        email,
        password,
        active,
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
  apiClient
    .post('/api/auth/logout')
    .then(response => {
      console.log(response.status);
      if (response.status === 200) {
        func();
      }
    })
    .catch(error => console.error(error));
};
