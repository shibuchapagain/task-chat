import ApiEndPoint from './../config/apiEndpoint';
import { getRequest, postRequest } from './httpsRequest';
import Socket from './../socket';
import axios from 'axios';
// import { useRoot } from './../RootProvider';

export const Login = async (data: any) => {
  try {
    const userDetails: any = await postRequest(ApiEndPoint.login, data);
    const user = JSON.stringify(userDetails?.data?.userDetails);
    const token = userDetails?.data?.token;
    localStorage.setItem('thrift_user', user);
    localStorage.setItem('thrift_token', token);
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Socket.connectSocket();
    return userDetails;
  } catch (err) {
    throw err;
  }
};

export const getMyProfile = async () => {
  try {
    const userDetails: any = await getRequest(ApiEndPoint.getMyProfile, {
      strict: true,
    });
    return userDetails;
  } catch (err) {
    throw err;
  }
};

export const verifyToken = async () => {
  try {
    const userDetails = await getRequest(ApiEndPoint.verifyToken, {
      strict: true,
    });
    if (userDetails) {
      return userDetails;
    } else {
      throw userDetails;
    }
  } catch (err) {
    throw err;
  }
};

export const verifyAccount = async data => {
  try {
    const userDetails: any = await postRequest(ApiEndPoint.verifyAccount, data);
    return userDetails;
  } catch (err) {
    throw err;
  }
};
