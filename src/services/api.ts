import axios, { AxiosRequestConfig } from 'axios';
import { User } from './models';

export const DEFAULT_API_CONFIG: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_DEV_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
};

export const api = axios.create({
  ...DEFAULT_API_CONFIG,
});

export const getMyProfileFactory = (optionConfig?: AxiosRequestConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const getMyProfile = async () => {
    const response = await instance.get('/api/auth/user');

    console.log('取った来た');

    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const { data } = response;

    // 値のマッピング
    const user: User = {
      desiredOccupations: 0,
      email: '',
      iconImageUrl: data.icon_image_url,
      id: data.id,
      lastName: data.last_name,
      sex: 0,
      studentNumber: data.student_number,
      yearOfGraduation: 0,
      firstName: data.first_name,
    };

    return user;
  };

  return getMyProfile;
};
