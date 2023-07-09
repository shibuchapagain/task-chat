import { Application } from "express";
import * as Controller from "./controller";
const V1_API = "/api/v1/product/";
import { ROUTES } from "./types";
import {
  authMiddleware,
  requestValidatorMiddleware,
  roleMiddleware,
} from "../../middleware";
import uploader from "./../../services/imageUpload";
import schema from "./schema";

const upload_path = (req, res, next) => {
  req.upload_path = "public/uploads/product";
  next();
};

export default (app: Application): void => {
  app.post(
    `${V1_API}${ROUTES.createCategory}`,
    authMiddleware,
    [requestValidatorMiddleware(schema.createCategory)],
    Controller.createCategory
  );

  app.get(`${V1_API}${ROUTES.getAllCategory}`, Controller.getAllCategory);

  app.post(
    `${V1_API}${ROUTES.createSubCategory}`,
    authMiddleware,
    [requestValidatorMiddleware(schema.createSubCategory)],
    Controller.createSubCategory
  );

  app.get(
    `${V1_API}${ROUTES.getSubCategoryByCategoryId}/:id`,
    Controller.getSubCategoryByCategoryId
  );

  app.post(
    `${V1_API}${ROUTES.createProduct}`,
    authMiddleware,
    Controller.createProduct
  );

  app.get(
    `${V1_API}${ROUTES.getProductBySubCategoryId}/:id`,
    Controller.getProductBySubCategoryId
  );

  app.post(
    `${V1_API}${ROUTES.updateProductImage}/:id`,
    authMiddleware,
    upload_path,
    uploader.array("images"),
    Controller.updateProductImage
  );

  app.get(`${V1_API}${ROUTES.searchProduct}`, Controller.searchProduct);
  app.get(`${V1_API}${ROUTES.similarProduct}/:id`, Controller.similarProduct);
  app.get(`${V1_API}${ROUTES.getProduct}/:id`, Controller.getProduct);

  //   app.delete(
  //     `${V1_API}${ROUTES.deleteBookImage}/:id`,
  //     authMiddleware,
  //     Controller.deleteBookImage
  //   );
};
