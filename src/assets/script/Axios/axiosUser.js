import { apiClient } from '../index';

export const getMyData = notLoginFunc => {
  return apiClient
    .get('/api/auth/user')
    .then(response => {
      if (response.status !== 200) {
        return false;
      }
      return response;
    })
    .catch(error => {
      console.error(error);
      if (
        error.response.status === 401 ||
        error.response.status === 422 ||
        error.response.status === 500
      ) {
        notLoginFunc();
      }
    });
};

export const editProfile = (user_id, postData) => {
  console.log(user_id, postData);
  return apiClient
    .post(`/api/user/edit/${user_id}`, postData)
    .then(response => {
      if (response.status !== 200) {
        return false;
      }
      console.log(response);
      return response;
    })
    .catch(error => {
      console.error(error);
      if (
        error.response.status === 401 ||
        error.response.status === 422 ||
        error.response.status === 500
      ) {
      }
    });
};

export const deleteAccount = user_id => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .post(`/api/user/delete/${user_id}`)
      .then(response => {
        if (response.status !== 200) {
          return false;
        }
        console.log(response);
        return response;
      })
      .catch(error => {
        console.error(error);
        if (
          error.response.status === 401 ||
          error.response.status === 422 ||
          error.response.status === 500
        ) {
        }
      });
  });
};

export const passwordResetMail = postData => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .post(`/api/auth/password_reset_mail`, postData)
      .then(response => {
        if (response.status !== 200) {
          return false;
        }
        console.log(response);
        return true;
      })
      .catch(error => {
        console.error(error);
        if (
          error.response.status === 401 ||
          error.response.status === 422 ||
          error.response.status === 500
        ) {
        }
      });
  });
};

export const passwordReset = postData => {
  return apiClient
    .post(`/api/auth/password_reset`, postData)
    .then(response => {
      if (response.status !== 200) {
        return false;
      }
      console.log(response);
      return true;
    })
    .catch(error => {
      console.error(error);
      if (
        error.response.status === 401 ||
        error.response.status === 422 ||
        error.response.status === 500
      ) {
      }
    });
};

export const passwordChange = postData => {
  return apiClient
    .post(`/api/auth/password_change`, postData)
    .then(response => {
      if (response.status !== 200) {
        return false;
      }
      console.log(response);
      return true;
    })
    .catch(error => {
      console.error(error);
      if (
        error.response.status === 401 ||
        error.response.status === 422 ||
        error.response.status === 500
      ) {
      }
    });
};
