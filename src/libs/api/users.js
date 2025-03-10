import instanceAxios from '../axios';

export const getUser = async () => {
  const res = await instanceAxios.get(`/api/user`);
  return res;
};
