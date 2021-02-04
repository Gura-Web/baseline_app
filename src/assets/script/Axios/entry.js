import { apiClient } from '../index';
export const indexEntry = id => {
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

export const registEntry = postData => {
  return apiClient
    .post(`/api/entry`, postData)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        // alert("成功");
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
        alert('失敗');
        return true;
      }
      return true;
    });
};
