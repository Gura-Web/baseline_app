import { apiClient } from '../index';
export const registInterview = postData => {
  apiClient
    .post(`/api/interview`, postData)
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
