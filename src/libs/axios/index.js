import axios from 'axios';
import errorHandler from './errorHandler';
import { setAuthorization } from './setAuthorization';
const baseUrlAPI = process.env.NEXT_PUBLIC_URL_API;

const instanceAxios = axios.create({
  baseURL: baseUrlAPI,
  headers: {
    'Content-Type': 'application/json',
  },
});

instanceAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return errorHandler(error);
  }
);

export { default as setAuthorization } from './setAuthorization';
export default instanceAxios;
