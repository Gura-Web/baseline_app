import {apiClient} from '../index';
export const showCompany = (id) => {
    return apiClient.get("/sanctum/csrf-cookie").then((response) => {
      return apiClient
        .get(`/api/company/show/${id}`)
        .then((response) => {
          if (response.status !== 200) {
            return false;
          }
          return response;
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 401 || error.response.status === 422 || error.response.status === 500) {
            alert("データ取得失敗")
          }
        });
    });
  };
export const detailCompany = (id) => {
    return apiClient.get("/sanctum/csrf-cookie").then((response) => {
      return apiClient
        .get(`/api/company/detail/${id}`)
        .then((response) => {
          if (response.status !== 200) {
            return false;
          }
          return response;
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 401 || error.response.status === 422 || error.response.status === 500) {
            alert("データ取得失敗")
          }
        });
    });
  };


  export const editCompany = (id,postData) => {
    apiClient.get("/sanctum/csrf-cookie").then((response) => {
      apiClient
        .post(`/api/company/edit/${id}`, postData)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("成功");
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 401 || error.response.status === 422 || error.response.status === 500) {
            alert("失敗");
          }
        });
    });
  };

  export const insertCompany = (postData) => {
    apiClient.get("/sanctum/csrf-cookie").then((response) => {
      apiClient
        .post("/api/company", postData)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 401 || error.response.status === 422 ) {
            alert("登録失敗");
          }
        });
    });
  };
  