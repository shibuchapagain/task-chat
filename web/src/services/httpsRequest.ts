import axiosInstance from './axios';

export const postRequest = async (
  url: string,
  data: any,
  config: any = null,
) => {
  try {
    let header: any = {};
    if (config?.strict) {
      let token = localStorage.getItem('thrift_token');
      header = {
        headers: {
          authorization: 'Bearer ' + token,
        },
      };
    }
    if (config?.file) {
      header = {
        headers: {
          ...header.headers,
          'content-type': 'multipart/form-data',
        },
      };
    }
    const response = await axiosInstance.post(url, data, header);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getRequest = async (url: string, config: any = null) => {
  try {
    let header: any = {};
    if (config?.strict) {
      let token = localStorage.getItem('thrift_token');
      header = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    }
    const response = await axiosInstance.get(url, header);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteRequest = async (url: string, config: any = null) => {
  try {
    let header: any = {};
    if (config?.strict) {
      let token = localStorage.getItem('thrift_token');
      header = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    }
    const response = await axiosInstance.delete(url, header);
    return response;
  } catch (err) {
    throw err;
  }
};

export const patchRequest = async (
  url: string,
  data: any,
  config: any = null,
) => {
  try {
    let header: any = {};
    if (config?.strict) {
      let token = localStorage.getItem('thrift_token');
      header = {
        headers: {
          authorization: 'Bearer ' + token,
        },
      };
    }
    if (config?.file) {
      header = {
        headers: {
          ...header.headers,
          'content-type': 'multipart/form-data',
        },
      };
    }
    const response = await axiosInstance.patch(url, data, header);
    return response;
  } catch (err) {
    throw err;
  }
};
