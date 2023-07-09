import { Application } from "express";
import * as Controller from "./controller";
const V1_API = "/api/v1/booking/";
import { ROUTES } from "./types";
import {
  authMiddleware,
  requestValidatorMiddleware,
  roleMiddleware,
} from "../../middleware";
import schema from "./schema";

export default (app: Application): void => {
  app.post(
    `${V1_API}${ROUTES.book}/:id`,
    authMiddleware,
    // [requestValidatorMiddleware(schema.book)],
    roleMiddleware(["Buyer", "Agent"]),
    Controller.book
  );

  app.post(
    `${V1_API}${ROUTES.accept}/:id`,
    authMiddleware,
    // [requestValidatorMiddleware(schema.accept)],
    roleMiddleware(["Seller"]),
    Controller.accept
  );

  app.post(
    `${V1_API}${ROUTES.cancel}/:id`,
    authMiddleware,
    roleMiddleware(["Seller", "Agent"]),
    Controller.cancel
  );

  app.post(
    `${V1_API}${ROUTES.decline}/:id`,
    authMiddleware,
    roleMiddleware(["Seller"]),
    Controller.decline
  );

  // app.get(`${V1_API}${ROUTES.getAllCategory}`, Controller.getAllCategory);

  // app.post(
  //   `${V1_API}${ROUTES.createSubCategory}`,
  //   authMiddleware,
  //   [requestValidatorMiddleware(schema.createSubCategory)],
  //   Controller.createSubCategory
  // );

  // app.get(
  //   `${V1_API}${ROUTES.getSubCategoryByCategoryId}/:id`,
  //   Controller.getSubCategoryByCategoryId
  // );

  // app.post(
  //   `${V1_API}${ROUTES.createProduct}`,
  //   authMiddleware,
  //   Controller.createProduct
  // );

  // app.get(
  //   `${V1_API}${ROUTES.getProductBySubCategoryId}/:id`,
  //   Controller.getProductBySubCategoryId
  // );

  // app.post(
  //   `${V1_API}${ROUTES.updateProductImage}/:id`,
  //   authMiddleware,
  //   upload_path,
  //   uploader.array("images"),
  //   Controller.updateProductImage
  // );

  // app.get(`${V1_API}${ROUTES.searchProduct}`, Controller.searchProduct);
  // app.get(`${V1_API}${ROUTES.similarProduct}/:id`, Controller.similarProduct);
  // app.get(`${V1_API}${ROUTES.getProduct}/:id`, Controller.getProduct);

  // //   app.delete(
  // //     `${V1_API}${ROUTES.deleteBookImage}/:id`,
  // //     authMiddleware,
  // //     Controller.deleteBookImage
  // //   );
};
