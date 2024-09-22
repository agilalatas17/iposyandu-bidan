import { axiosInstance } from '@/config/axiosService';

// const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// export const fetchIbuHamil = async (id = null) => {
//   const resource = id ? `${baseUrl}/ibu-hamil/${id}` : `${baseUrl}/ibu-hamil`;
//   const res = await fetch(resource);
//   const ibuHamil = await res.json();

//   return ibuHamil.data;
// };

export const fetchIbuHamil = {
  getData: async () => {
    return await axiosInstance.get(`/ibu-hamil`);
  },

  getDataById: async (id) => {
    return await axiosInstance.get(`/ibu-hamil/${id}`);
  },

  createData: async (body) => {
    return await axiosInstance.post(`/ibu-hamil`, body);
  },

  updateData: async (id, body) => {
    return await axiosInstance.put(`/ibu-hamil/${id}`, body);
  },

  deleteData: (id) => {
    return axiosInstance.delete(`/ibu-hamil/${id}`);
  },
};
