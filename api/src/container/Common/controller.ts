// import { JWT_OBJECT } from "./../../types/index";
import { Response } from "express";
import * as CommonService from "./service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";

export const createMessage = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await CommonService.createMessage(req.body);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const createChat = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await CommonService.createChat(req.body);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const getConversations = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await CommonService.getConversations(
      req.tokenUser.id,
      req.tokenUser.role
    );
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const getConversationChats = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await CommonService.getConversationChats(req.params.id);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const createComment = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await CommonService.createComment(
      req.tokenUser.id,
      req.body
    );
    sendSuccessResponse({ data, res });
  } catch (err) {
    console.log(err);
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const getAllComments = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data = await CommonService.getAllComments(req.params.id, req.query);
    sendSuccessResponse({ data, res });
  } catch (err) {
    console.log(err);
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const readAllNotification = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    console.log(req.tokenUser.id, "check user idddd");
    const data: any = await CommonService.readAllNotification(req.tokenUser.id);
    sendSuccessResponse({ data, res });
  } catch (err) {
    console.log(err);
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const readNotification = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await CommonService.readNotification(req.params.id);
    sendSuccessResponse({ data, res });
  } catch (err) {
    console.log(err);
    return sendErrorResponse({ code: 400, err, res });
  }
};
