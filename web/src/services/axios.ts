import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  timeoutErrorMessage: 'server timed out...',
  headers: {
    // accept: 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => {
    if (response?.status === 200) {
      return response.data;
    }
  },
  reject => {
    if (reject.response.error === 401) {
      localStorage.removeItem('thrift_token');
      localStorage.removeItem('thrift_user');
      window.location.href = '/login';
    } else if (reject.response.status === 403) {
      toast.warning('You do not have privilege to access this');
      window.location.href = '/';
    } else if (reject.response.status === 404) {
      toast.warning('This URL does not exist');
    } else if (reject.response.error === 400) {
      toast.warning(reject?.response?.message);
    } else if (reject?.response?.error === 500) {
      toast.warning(reject?.response?.message);
    } else {
      console.log(reject.response.data, 'this is on reject handling');
      return reject.response.data;
    }
  },
);

export default axiosInstance;
