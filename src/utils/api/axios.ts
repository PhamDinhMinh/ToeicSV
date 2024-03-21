import {HOST_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
  AxiosInstance,
  AxiosProgressEvent,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

interface IHttpRequest {
  url: string;
  params?: any;
  data?: any;
  method: Method;
  contentType?: string;
  headers?: any;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

interface IApiMethod {
  GET: Method;
  POST: Method;
  PUT: Method;
  DELETE: Method;
}
export const axiosMethod: IApiMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

class HttpUtil {
  private readonly http: AxiosInstance;
  private current_URL: string;

  constructor() {
    this.current_URL = HOST_SERVER;
    this.http = axios.create({
      baseURL: HOST_SERVER,
      timeout: 10000,
    });
    this.http.interceptors.request.use(
      async config => {
        const headers: any = config.headers;
        const accessToken = await AsyncStorage.getItem('token');

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        return {...config, headers: headers};
      },
      error => {
        return Promise.reject(error);
      },
    );
    this.http.interceptors.response.use((response: AxiosResponse) => {
      if (response.data.result) {
        if (
          response.data.result?.success ||
          response.data.result?.resultCode === null ||
          response.data.result?.resultCode === 200 ||
          (response.data.result?.resultCode === undefined &&
            response.data.success)
        ) {
          return response;
        } else {
          throw response.data.result.error;
        }
      } else {
        if (
          response.data.success ||
          response.data.resultCode === null ||
          // response.data.resultCode === undefined ||
          response.data.resultCode === 200
        ) {
          return {
            ...response,
            data: {
              result: response.data,
            },
          } as AxiosResponse;
        } else {
          throw response.data.error;
        }
      }
    });
  }
  async request<T>({
    url,
    params,
    data,
    method,
    contentType,
    headers,
  }: IHttpRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
      headers: {
        ...headers,
        'Content-Type': contentType || 'application/json',
      },
    };

    const response = await this.http.request(config);

    return response.data as T;
  }

  getCurrentUrlHost() {
    return this.current_URL;
  }
}
export default new HttpUtil();
