import { apiClient } from '../index';
export const temporaryRegistationUser = email => {
  return apiClient
    .post('/api/user/temporary_register/1', { email: email })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        return true;
      }
    })
    .catch(error => {
      console.error(error);
      if (error.response.status === 401 || error.response.status === 500) {
        alert('ログイン失敗');
        return false;
      }
      if (error.response.status === 422) {
        alert('そのメールアドレスは既に登録されています');
        return false;
      }
    });
};

export const registerUser = postData => {
  return apiClient
    .post('/api/user/register', postData)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        return true;
      }
    })
    .catch(error => {
      console.error(error);
      if (
        error.response.status === 401 ||
        error.response.status === 422 ||
        error.response.status === 500
      ) {
        return false;
      }
    });
};
