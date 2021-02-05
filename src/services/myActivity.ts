import axios, { AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { api, DEFAULT_API_CONFIG } from './api';
import { User } from './models';

export const getMyActivityFactory = (
  id?: number,
  optionConfig?: AxiosRequestConfig,
) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const getMyActivity = async () => {
    const response = await instance.get(`/api/mypage/${id}`);

    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const user: User = camelcaseKeys(response.data);

    return user;
  };

  return getMyActivity;
};

export const getOldMyActivity = (id: number) => {
  return api
    .get(`/api/my_activity/show/1`)
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
        alert('検索失敗');
      }
    });
};
export const registMyActivity = (content: any) => {
  api
    .post(`/api/my_activity`, content)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        // alert("成功");
      }
    })
    .catch(error => {
      console.error(error);
      if (
        error.response.status === 401 ||
        error.response.status === 422 ||
        error.response.status === 500
      ) {
        alert('失敗');
      }
    });
};
export const editMyActivity = (id: number, content: any) => {
  api
    .post(`/api/my_activity/edit/${id}`, { content })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        // alert("成功");
      }
    })
    .catch(error => {
      console.error(error);
      if (
        error.response.status === 401 ||
        error.response.status === 422 ||
        error.response.status === 500
      ) {
        alert('失敗');
      }
    });
};
export const deleteMyActivity = (id: number) => {
  api
    .post(`/api/post/delete/${id}`)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        // alert("成功");
      }
    })
    .catch(error => {
      console.error(error);
      if (
        error.response.status === 401 ||
        error.response.status === 422 ||
        error.response.status === 500
      ) {
        alert('失敗');
      }
    });
};
