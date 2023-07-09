// export {};
import ApiEndPoint from './../../../config/apiEndpoint';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from './../../../services/httpsRequest';

export const createBook = async (data: any) => {
  try {
    const bookDetails: any = await postRequest(ApiEndPoint.createBook, data, {
      strict: true,
    });
    return bookDetails;
  } catch (err) {
    throw err;
  }
};

export const getMyBooks = async () => {
  try {
    const response: any = await getRequest(ApiEndPoint.getMyBooks, {
      strict: true,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const getBook = async (id: string) => {
  try {
    const response: any = await getRequest(ApiEndPoint.getBook + '/' + id, {
      strict: true,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response: any = await deleteRequest(
      ApiEndPoint.deleteBook + '/' + id,
      {
        strict: true,
      },
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateBook = async (data: any, id: string) => {
  try {
    const bookDetails: any = await patchRequest(
      ApiEndPoint.updateBook + '/' + id,
      data,
      {
        strict: true,
      },
    );
    return bookDetails;
  } catch (err) {
    throw err;
  }
};
