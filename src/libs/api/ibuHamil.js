import instanceAxios from '../axios';

export const countIbuHamil = async () => {
  const res = await instanceAxios.get('/api/ibu-hamil/jumlah-data');
  return res;
};

export const getAllIbuHamil = async () => {
  const res = await instanceAxios.get('/api/ibu-hamil');
  return res;
};

export const getIbuHamilById = async (ibuHamilId) => {
  const res = await instanceAxios.get(`/api/ibu-hamil/${ibuHamilId}`);
  return res;
};

export const createIbuHamil = async (body) => {
  const res = await instanceAxios.post(`/api/ibu-hamil/create`, body);
  return res;
};

export const updateIbuHamil = async (ibuHamilId, body) => {
  const res = await instanceAxios.put(`/api/ibu-hamil/${ibuHamilId}`, body);
  return res;
};

export const deleteIbuHamil = async (ibuHamilId) => {
  const res = await instanceAxios.delete(`/api/ibu-hamil/${ibuHamilId}`);
  return res;
};
