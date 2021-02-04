import { apiClient } from '../index';
export const registInterview = postData => {
  return apiClient
    .post(`/api/interview`, postData)
    .then(response => {
      console.log(response);
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
        error.response.status === 500 ||
        error.response.status === 402
      ) {
        alert('失敗');
        return false;
      }
      if (error.response.status === 400) {
        alert('"面接の内容"は入力必須項目です。');
        return false;
      }
      return false;
    });
};
export const editInterview = (id, postData) => {
  apiClient
    .post(`/api/interview/edit/${id}`, postData)
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

export const showInterview = id => {
  return apiClient
    .get(`/api/interview/show/${id}`)
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
