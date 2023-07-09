import { Request, Response, NextFunction } from "express";
// import { ROLES } from "../types";

type TokenObject = {
  id: number;
  role: string;
  expiresAt: string;
};

interface RequestObject extends Request {
  tokenUser?: TokenObject;
}

export type ROLES = ("Seller" | "Buyer" | "Agent")[];

export const roleMiddleware =
  (roles: ROLES) =>
  async (req: RequestObject, res: Response, next: NextFunction) => {
    try {
      const loggedInUserRole: any = req.tokenUser?.role;
      if (roles?.includes(loggedInUserRole)) {
        next();
      } else {
        return res.status(401).json({
          error: true,
          message: "You don't have permission.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: err,
      });
    }
  };
