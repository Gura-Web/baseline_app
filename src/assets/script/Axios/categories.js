import { apiClient } from '../index';
export const showEntry = id => {
  return apiClient
    .get(`/api/entry/show/${id}`)
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
