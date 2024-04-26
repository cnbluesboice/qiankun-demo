import axios from 'axios';
import { nanoid } from 'nanoid';
import { Timeout, USER_ERROR_STATUS } from './constant';

const axiosInstance = axios.create({
  // withCredentials: true,
  timeout: Timeout,
});

const CancelToken = axios.CancelToken;
export const axiosSource = CancelToken.source();

const axiosRetry = (axiosInstance: any, retries = 3) => {
  axiosInstance.interceptors.request.use(
    function (config: any) {
      config.headers.requestId = nanoid();
      return config;
    },
    function (error: any) {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(undefined, (err: any) => {
    const config = err?.config;
    if (err?.response?.status.toString().startsWith('5') || !err?.response?.status) {
      if (!config?.retry) config.retry = 0;
      if (config?.retry < retries) {
        config.retry += 1;
        return new Promise((resolve: any) => {
          setTimeout(() => resolve(axiosInstance(config)), 500);
        });
      }
    } else if (USER_ERROR_STATUS.includes(err?.response?.status)) {
      return Promise.reject(err);
    }
    return Promise.reject(err);
  });

  return axiosInstance;
};

const axiosWithRetries = axiosRetry(axiosInstance);

export default axiosWithRetries;
