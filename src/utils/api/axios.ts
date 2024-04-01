import axios from 'axios';
import {HOST_SERVER} from '@env';
import QueryString from 'qs';
import {getToken} from './token';

const axiosClient = axios.create({
  baseURL: HOST_SERVER,
  timeout: 30000,
});

axiosClient.interceptors.request.use(async config => {
  const tokenString = await getToken();
  if (tokenString) {
    config.headers.Authorization = `Bearer ${tokenString}`;
  }
  config.paramsSerializer = params => QueryString.stringify(params);
  return config;
});

axiosClient.interceptors.request.use(request => {
  return request;
});

axiosClient.interceptors.response.use(
  response => {
    try {
      if (response.status === 200) {
        if (response && response.data) {
          return {...response.data, ...response};
        }
        throw response;
      } else {
        throw response.data.result.error;
      }
    } catch (error) {
      throw error;
    }
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response);
    } else {
      return Promise.reject(new Error('An unknown error occurred'));
    }
  },
);

export default axiosClient;
