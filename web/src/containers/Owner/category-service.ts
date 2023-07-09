// export {};
// import ApiEndPoint from './../../../config/apiEndpoint';
import ApiEndPoint from './../../config/apiEndpoint';
import { getRequest, postRequest } from './../../services/httpsRequest';

export const getAllCategory = async () => {
  try {
    const response: any = await getRequest(ApiEndPoint.getAllCategory);
    return response;
  } catch (err) {
    throw err;
  }
};

export const createProduct = async (data: any) => {
  try {
    const response: any = await postRequest(ApiEndPoint.createProduct, data, {
      strict: true,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateProductImage = async (id: string, data: any) => {
  try {
    const response: any = await postRequest(
      ApiEndPoint.updateProductImage + '/' + id,
      data,
      {
        strict: true,
        file: true,
      },
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllSubCategory = async (id: string) => {
  try {
    const response: any = await getRequest(
      ApiEndPoint.getAllSubCategory + '/' + id,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllProducts = async () => {
  try {
    const response: any = await getRequest(ApiEndPoint.getAllProducts);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response: any = await getRequest(ApiEndPoint.getProduct + '/' + id);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getSimilarProduct = async (id: string) => {
  try {
    const response: any = await getRequest(
      ApiEndPoint.getSimilarProduct + '/' + id,
    );
    return response;
  } catch (err) {
    throw err;
  }
};
