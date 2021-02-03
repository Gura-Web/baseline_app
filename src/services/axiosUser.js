import { api } from './api';

export const getMyData = notLoginFunc => {
  return api
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
  return api
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
  return api.get('/sanctum/csrf-cookie').then(response => {
    return api
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
  return api.get('/sanctum/csrf-cookie').then(response => {
    return api
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
  return api
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
  return api
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
