import { message } from 'antd';
import React, { ReactNode, useCallback } from 'react';
import { Timeout } from '../constant';

message.config({
  top: 100,
  duration: 3,
  maxCount: 1,
});

export enum MessageType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export enum MessageText {
  CLIENT_ERROR = '客户端错误！',
  SERVER_ERROR = '服务端错误！',
  PROTOCIL_ERROR = '协议错误！',
  GRAPHQL_ERROR = 'graphQL错误！',
  TIMEOUT = '超时！',
  CRASH = '崩溃！',
  FAILED = '失败',
}

const ApolloError = 'ApolloError';
const AxiosError = 'AxiosError';
const AxiosError_Timeout = (time: number) => `timeout of ${time.toString()}ms exceeded`;

export const useErrorMessage = () => {
  const handleError = (errorMessage: string, err: any) => {
    const response = err?.response;
    let text: string | ReactNode = errorMessage;
    if (response) {
      if (response?.data?.name === ApolloError) {
        const errData = response?.data;
        if (errData?.clientErrors.length) {
          text = `${errorMessage}${MessageText.CLIENT_ERROR}`;
        } else if (errData?.protocolErrors.length) {
          text = `${errorMessage}${MessageText.PROTOCIL_ERROR}`;
        } else if (errData?.graphQLErrors.length) {
          text = (
            <div>
              <h4>{`${errorMessage}${MessageText.GRAPHQL_ERROR}`}</h4>
              <span>{response?.data?.message}</span>
            </div>
          );
        } else {
          text = `${errorMessage}${MessageText.SERVER_ERROR}`;
        }
      } else {
        const msg = response?.data?.config?.errMessage?.detail;
        text = (
          <div>
            <h4>{`${errorMessage}${MessageText.FAILED}`}</h4>
            {msg && <pre style={{ textAlign: 'left' }}>{msg}</pre>}
          </div>
        );
      }
    } else {
      if (err?.name === AxiosError && err?.message === AxiosError_Timeout(Timeout)) {
        text = `${errorMessage}${MessageText.TIMEOUT}`;
      }
    }
    message.error(text);
  };

  const showError = useCallback((type = MessageType.INFO, errorMessage: string, response?: any) => {
    switch (type) {
      case MessageType.SUCCESS:
        message.success(errorMessage);
        break;
      case MessageType.ERROR:
        handleError(errorMessage, response);
        break;
      case MessageType.WARNING:
        message.warning(errorMessage);
        break;
      default:
        message.info(errorMessage);
        break;
    }
  }, []);

  return showError;
};
