import instanceAxios from '.';

export default (token = null) => {
  if (token) {
    instanceAxios.defaults.headers.common.Authorization = token;
  } else {
    delete instanceAxios.defaults.headers.common.Authorization;
  }
};
