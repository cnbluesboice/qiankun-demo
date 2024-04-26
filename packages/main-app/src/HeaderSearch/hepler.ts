import { sentryIntegration, MessageType } from 'common-tools';
import { userLogOut } from '../https';

export const logOutFn = (router: any, showMessage: any) => {
  const logOut = () => {
    userLogOut()
      .then(() => {
        showMessage(MessageType.SUCCESS, '登出成功！');
        setTimeout(() => {
          router.push('/view/user/login');
        }, 500);
      })
      .catch((err: any) => {
        showMessage(MessageType.ERROR, '登出', err);
        throw new Error(err);
      });
  };
  sentryIntegration(logOut, 'User_userLogOut', 'User');
};
