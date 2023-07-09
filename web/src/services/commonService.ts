import ApiEndPoint from './../config/apiEndpoint';
import { postRequest } from './httpsRequest';

export const createMessage = async data => {
  try {
    const response: any = await postRequest(ApiEndPoint.createMessage, data, {
      strict: true,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const ReadAllNotification = async () => {
  try {
    const response: any = await postRequest(
      ApiEndPoint.readAllNotification,
      {},
      {
        strict: true,
      },
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export const ReadNotification = async (id: string) => {
  try {
    const response: any = await postRequest(
      ApiEndPoint.readNotification + '/' + id,
      {},
      {
        strict: true,
      },
    );
    return response;
  } catch (err) {
    throw err;
  }
};
