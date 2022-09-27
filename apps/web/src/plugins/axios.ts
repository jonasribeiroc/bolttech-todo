import axios, { AxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';

const createAxiosInstance = (config?: AxiosRequestConfig) => {
  const cookies = parseCookies();

  const newInstance = axios.create({
    ...config,
    headers: {
      Authorization: `Bearer ${cookies['token']}`,
    },
  });

  newInstance.interceptors.request.use(function (config) {
    const cookies = parseCookies();
    config.headers.Authorization = `Bearer ${cookies['token']}`;

    return config;
});

  return newInstance;
};

export default createAxiosInstance;