import axiosWithRetries from './instance';
import { parseCookie } from 'common-tools';

export enum Methods {
  POST = 'POST',
  GET = 'GET',
}

export const httpServer = async (
  req: any,
  method: string,
  path: string,
  body?: any,
  headers?: any
) => {
  const cookies = parseCookie(req);
  // console.log(cookies, 'cookies_55555555');
  const header: any = {
    ...headers,
    Authorization: cookies.tokenStr,
    Database: headers?.Database || cookies.database,
  };
  if (method === Methods.GET) {
    return await axiosWithRetries.get(path, { headers: header });
  }
  if (method === Methods.POST) {
    return await axiosWithRetries.post(path, body, { headers: header });
  }
};
