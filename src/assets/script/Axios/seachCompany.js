import { apiClient } from '../index';

export const searchCompany = param => {
  return apiClient
    .get(`/api/company/search`, {
      params: param,
    })
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
