// import { JWT_OBJECT } from "./../../types/index";
import { Response } from "express";
import * as BookService from "./service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";

export const createBook = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await BookService.createBook(req.tokenUser.id, req.body);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const updateBook = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await BookService.updateBook(
      req.tokenUser.id,
      req.params.id,
      req.body
    );
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const deleteBook = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await BookService.deleteBook(
      req.tokenUser.id,
      req.params.id
    );
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const getMyBooks = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await BookService.getMyBooks(req.tokenUser.id);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const getBook = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await BookService.getBook(req.params.id);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const searchBook = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await BookService.searchBook(req.query);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

// FOR BOOK IMAGE:
export const createBookImage = async (
  req: any,
  res: Response
): Promise<Response | void> => {
  try {
    const data: any = await BookService.createBookImage(
      req.tokenUser.id,
      req.params.id,
      req.files
    );
    sendSuccessResponse({
      res,
      data,
    });
  } catch (error: any) {
    res.send().json({ error: true, message: error });
  }
};

export const deleteBookImage = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await BookService.deleteBookImage(
      req.tokenUser.id,
      req.params.id
    );
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};
