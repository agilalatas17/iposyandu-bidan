import { notification } from 'antd';

export default function errorHandler(error) {
  if (error) {
    let message;

    if (error.response) {
      if (error.response.status === 500) {
        message = 'Internal server error.';
      } else {
        message = error.response.data.message;
      }

      notification.error({
        message: 'Error',
        description: message,
      });

      return Promise.reject(error);
    }

    notification.error({
      message: 'Error',
      description: 'Network or unexpected error occurred.',
    });

    return Promise.reject(error);
  }
}
