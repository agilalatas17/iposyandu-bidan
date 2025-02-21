import instanceAxios from '../axios';

export const getUser = async () => {
  return instanceAxios.get(`/api/user`);
};
