import { apiClient } from '../index';

export const showCompany = id => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .get(`/api/company/show/${id}`)
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
  });
};
export const detailCompany = id => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .get(`/api/company/detail/${id}`)
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
  });
};

export const editCompany = (id, postData) => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .post(`/api/company/edit/${id}`, postData)
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
          alert('企業を登録したユーザーしか編集できません');
          return false;
        }
        return false;
      });
  });
};

export const insertCompany = postData => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .post('/api/company', postData)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          return true;
        }
      })
      .catch(error => {
        console.error(error);
        if (
          error.response.status === 401 ||
          error.response.status === 422 ||
          error.response.status === 402
        ) {
          alert('未入力の項目が存在します');
          return false;
        }
        return false;
      });
  });
  // return flg;
};

export const companyDetailUser = (company_id, user_id) => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .get(`/api/company/detail/${company_id}/users/${user_id}`)
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
  });
};

export const insertComment = (company_id, comment_content) => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .post('/api/company_comment', {
        company_id,
        comment_content,
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          return true;
        }
      })
      .catch(error => {
        console.error(error);
        if (
          error.response.status === 401 ||
          error.response.status === 422 ||
          error.response.status === 402
        ) {
          alert('コメントを入力してください');
          return false;
        }
        return false;
      });
  });
};
export const editComment = (comment_id, comment_content) => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .post(`/api/company_comment/edit/${comment_id}`, {
        comment_content,
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          return true;
        }
      })
      .catch(error => {
        console.error(error);
        if (
          error.response.status === 401 ||
          error.response.status === 422 ||
          error.response.status === 402
        ) {
          alert('コメントを入力してください');
          return false;
        }
        return false;
      });
  });
};

export const employmentstatusEdit = content => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .post(`/api/employmentstatus/edit`, content)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          return true;
        }
      })
      .catch(error => {
        console.error(error);
        if (
          error.response.status === 401 ||
          error.response.status === 422 ||
          error.response.status === 402
        ) {
          alert('失敗');
          return false;
        }
        return false;
      });
  });
};

export const showEmploymentStatus = id => {
  return apiClient.get('/sanctum/csrf-cookie').then(response => {
    return apiClient
      .get(`/api/employmentstatus/show/${id}`)
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
  });
};
