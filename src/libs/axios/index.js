import axios from 'axios';
import errorHandler from './errorHandler';
const BASE_URL_API = process.env.NEXT_PUBLIC_URL_API;

const instanceAxios = axios.create({
  baseURL: BASE_URL_API,
});

instanceAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return errorHandler(error);
  }
);

export { default as setAuthorizationHeaders } from './setAuthorizationHeaders';
export default instanceAxios;
