import axios from 'axios';
import errorHandler from './errorHandler';
const { NEXT_PUBLIC_URL_API } = process.env;

const instanceAxios = axios.create({
  baseURL: NEXT_PUBLIC_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// instanceAxios.interceptors.response.use((response) => {
//   response, errorHandler;
// });

export default instanceAxios;
