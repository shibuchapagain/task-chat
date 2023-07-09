import { ReturnType } from './types';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): ReturnType {
    return {
      url: '/auth/register',
      method: 'post',
      data,
      config: {
        showErr: true,
      },
    };
  },
  login(data: { email: string; password: string }): ReturnType {
    return {
      url: '/auth/login',
      method: 'post',
      data,
      config: {
        showErr: true,
      },
    };
  },

  verifyAccount(data: { email: string; code: number }): ReturnType {
    return {
      url: '/auth/verifyAccount',
      method: 'post',
      data,
      config: {
        showErr: true,
      },
    };
  },

  updateProfile(data: any): ReturnType {
    return {
      url: '/auth/updateProfile',
      method: 'patch',
      data,
      config: {
        showErr: true,
      },
    };
  },
};
