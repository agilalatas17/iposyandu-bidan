import { message } from 'antd';
import instanceAxios, { setAuthorizationHeaders } from '.';
import { refreshTokenUser } from '../api/auth';
import { setCookie } from '../cookies';

export default function errorHandler(error) {
  if (error) {
    let textMessage;
    if (error.response) {
      const originalRequest = error.config;
      const { response } = error;

      if (response.status === 500) {
        textMessage = 'Internal server error.';
      } else if (response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = localStorage.getItem('iposyandubidan:access_token');
        const session = token ? JSON.parse(token) : null;

        return refreshTokenUser({
          refreshToken: session.refreshToken,
          noTelp: session.noTelp,
        }).then((res) => {
          if (res.data) {
            setAuthorizationHeaders(res.data.token);
            localStorage.setItem(
              'iposyandubidan:access_token',
              JSON.stringify({
                ...session,
                token: res.data.token,
              })
            );

            originalRequest.headers.authorization = res.data.token;

            return instanceAxios(originalRequest);
          } else {
            window.location.href = '/auth/login';
            localStorage.removeItem('iposyandubidan:access_token');
            setCookie('iposyandubidan:user', '');
          }
        });
      } else {
        textMessage = response.data?.message;
      }

      if (response.status === 404) {
        message.open({
          type: 'info',
          content: textMessage,
        });
      }
      message.open({
        type: 'error',
        content: textMessage,
      });

      return Promise.reject(error);
    }

    message.error('Network or unexpected error occurred.');

    return Promise.reject(error);
  }
}
