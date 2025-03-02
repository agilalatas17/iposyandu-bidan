import instanceAxios from '../axios';

export const registerUser = async (credentials) => {
  const res = await instanceAxios.post('/api/auth/register', credentials);
  return res;
};

export const loginUser = async (credentials) => {
  const res = await instanceAxios.post('/api/auth/login', credentials);
  return res;
};

export const logoutUser = async () => {
  const res = await instanceAxios.post('/api/auth/logout');
  return res;
};

export const refreshTokenUser = async (credentials) => {
  const res = await instanceAxios.post('/api/refresh-token', credentials);
  return res;
};
