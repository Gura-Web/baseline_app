import axios, { AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { DEFAULT_API_CONFIG } from './api';
import { Draft, TopInfo } from './models';

export const getTopInfo = (optionConfig?: AxiosRequestConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const getTopInfo = async () => {
    const response = await instance.get(`/api/home`);

    if (response.status !== 200) {
      throw new Error('Server Error');
    }

    const topInfo: TopInfo = camelcaseKeys(response.data, { deep: true });

    return topInfo;
  };

  return getTopInfo;
};
