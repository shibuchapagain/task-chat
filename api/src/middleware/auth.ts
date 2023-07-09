import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_OBJECT } from "../types";
import { sendErrorResponse } from "../utils/responseHandler";

export type tokenObject = {
  id: string;
  role: string;
  expiresAt: string;
};

export interface RequestObject extends Request {
  tokenUser?: tokenObject;
}

export default (req: RequestObject, res: Response, next: NextFunction): any => {
  try {
    if (!req.headers.authorization) {
      return sendErrorResponse({
        code: 401,
        res,
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const tokenUser: tokenObject = <JWT_OBJECT>(
      jwt.verify(token, process.env.JWT_SECRET)
    );
    if (tokenUser?.id) {
      req.tokenUser = tokenUser;
      next();
    } else {
      return sendErrorResponse({
        code: 401,
        res,
      });
    }
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return sendErrorResponse({
        code: 401,
        err,
        res,
      });
    }
    return sendErrorResponse({
      err,
      res,
      code: 500,
    });
  }
};
