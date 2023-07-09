// export {};
// import ApiEndPoint from './../../../config/apiEndpoint';
import ApiEndPoint from './../../config/apiEndpoint';
import { getRequest, postRequest } from './../../services/httpsRequest';

export const getAllComments = async (id: string) => {
  try {
    const response: any = await getRequest(
      ApiEndPoint.getAllComments + '/' + id,
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const createComment = async (body: any) => {
  try {
    const response: any = await postRequest(ApiEndPoint.createComment, body, {
      strict: true,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
