import { api, DEFAULT_API_CONFIG } from './api';
import axios, { AxiosRequestConfig } from 'axios';
import { Draft, User } from './models';
import camelcaseKeys from 'camelcase-keys';

export const getDraftFactory = (optionConfig?: AxiosRequestConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const getDraft = async () => {
    const response = await instance.get(`/api/draft`);

    console.log(response);

    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const drafts: Draft[] = camelcaseKeys(response.data, { deep: true });

    return drafts;
  };

  return getDraft;
};

export const registDraftFactory = (
  contents: string,
  optionConfig?: AxiosRequestConfig,
) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const registDraft = async () => {
    const response = await instance.post(`/api/draft`, { content: contents });

    console.log(response);

    if (response.status !== 200) {
      throw new Error('Server Error');
    }
  };

  return registDraft;
};

export const indexDraft = () => {
  return api
    .get(`/api/draft`)
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
        alert('データ取得失敗');
      }
    });
};

export const registDraft = (postData: any) => {
  api
    .post(`/api/draft`, postData)
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
export const deleteDraft = (id: number) => {
  api
    .post(`/api/draft/delete/${id}`)
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
