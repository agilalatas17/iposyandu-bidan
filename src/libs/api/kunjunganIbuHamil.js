import instanceAxios from '../axios';

export const getAllKunjungan = async (ibuHamilId) => {
  const res = await instanceAxios.get(`/api/ibu-hamil/${ibuHamilId}/kunjungan`);
  return res;
};

export const getKunjunganById = async (kunjunganId) => {
  const res = await instanceAxios.get(
    `/api/ibu-hamil/kunjungan/${kunjunganId}`
  );
  return res;
};

export const createKunjunganIbuHamil = async (body) => {
  const res = await instanceAxios.post(`/api/ibu-hamil/kunjungan`, body);
  return res;
};

export const updateKunjunganIbuHamil = async (kunjunganId, body) => {
  const res = await instanceAxios.put(
    `/api/ibu-hamil/kunjungan/${kunjunganId}`,
    body
  );
  return res;
};

export const deleteKunjungan = async (kunjunganId) => {
  const res = await instanceAxios.delete(
    `/api/ibu-hamil/kunjungan/${kunjunganId}`
  );
  return res;
};
