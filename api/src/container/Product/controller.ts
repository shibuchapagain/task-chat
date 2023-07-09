// import { JWT_OBJECT } from "./../../types/index";
import { Response } from "express";
import * as ProductService from "./service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseHandler";

export const createCategory = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await ProductService.createCategory(req.body);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const getAllCategory = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await ProductService.getAllCategory();
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const createSubCategory = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await ProductService.createSubCategory(req.body);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const getSubCategoryByCategoryId = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await ProductService.getSubCategoryByCategoryId(
      req.params.id
    );
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const createProduct = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await ProductService.createProduct(
      req.tokenUser.id,
      req.body
    );
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const getProductBySubCategoryId = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await ProductService.getProductBySubCategoryId(
      req.params.id
    );
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const updateProductImage = async (
  req: any,
  res: Response
): Promise<Response | void> => {
  try {
    const data: any = await ProductService.updateProductImage(
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

// export const deleteBookImage = async (
//   req: any,
//   res: Response
// ): Promise<void | Response> => {
//   try {
//     const data: any = await BookService.deleteBookImage(
//       req.tokenUser.id,
//       req.params.id
//     );
//     return sendSuccessResponse({ data, res });
//   } catch (err: any) {
//     return sendErrorResponse({ code: 400, err, res });
//   }
// };

export const searchProduct = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await ProductService.searchProduct(req.query);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const similarProduct = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await ProductService.similarProduct(req.params.id);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};

export const getProduct = async (
  req: any,
  res: Response
): Promise<void | Response> => {
  try {
    const data: any = await ProductService.getProduct(req.params.id);
    return sendSuccessResponse({ data, res });
  } catch (err: any) {
    return sendErrorResponse({ code: 400, err, res });
  }
};
