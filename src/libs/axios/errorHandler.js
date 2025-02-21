import { message } from 'antd';

export default function errorHandler(error) {
  if (error) {
    let textMessage;
    if (error.response) {
      const { response } = error;

      if (response.status === 500) {
        textMessage = 'Internal server error.';
      } else {
        textMessage = response.data?.message;
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
