import { apiClient } from '../index';
export const indexDraft = () => {
  return apiClient
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

export const registDraft = postData => {
  apiClient
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
export const deleteDraft = id => {
  apiClient
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
