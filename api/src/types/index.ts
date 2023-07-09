export type ErrorObject = {
  error: true;
  message: string;
  data?: null;
};

export type SuccessObject = {
  error: false;
  data: unknown;
};

export type DefaultReturnType = ErrorObject | SuccessObject;

export type ROLES = {
  role: "Seller" | "Buyer" | "Agent" | "Admin";
};

export type PaginationObject = {
  data: unknown[];
  totalCount: number;
};

// export enum ROLES {}

export type JWT_OBJECT = {
  id: string;
  role: "Seller" | "Buyer" | "Agent" | "Admin";
  expiresAt: string;
};

export interface Pagination {
  limit: number;
  offset: number;
  count: number;
}
