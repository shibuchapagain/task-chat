import { Application } from "express";
import * as Controller from "./controller";
const V1_API = "/api/v1/book/";
import { ROUTES } from "./types";
import {
  authMiddleware,
  requestValidatorMiddleware,
  roleMiddleware,
} from "../../middleware";
import uploader from "./../../services/imageUpload";
import schema from "./schema";

const upload_path = (req, res, next) => {
  req.upload_path = "public/uploads/book";
  next();
};

export default (app: Application): void => {
  app.post(
    `${V1_API}${ROUTES.createBook}`,
    authMiddleware,
    // roleMiddleware(["Owner", "Renter"]),
    Controller.createBook
  );

  app.patch(
    `${V1_API}${ROUTES.updateBook}/:id`,
    authMiddleware,
    Controller.updateBook
  );

  app.delete(
    `${V1_API}${ROUTES.deleteBook}/:id`,
    authMiddleware,
    Controller.deleteBook
  );

  app.get(
    `${V1_API}${ROUTES.getMyBooks}`,
    authMiddleware,
    Controller.getMyBooks
  );

  app.get(`${V1_API}${ROUTES.getBook}/:id`, Controller.getBook);

  app.get(`${V1_API}${ROUTES.searchBook}`, Controller.searchBook);

  // FOR BOOK IMAGE:
  app.post(
    `${V1_API}${ROUTES.createBookImage}/:id`,
    authMiddleware,
    upload_path,
    uploader.array("images"),
    Controller.createBookImage
  );

  app.delete(
    `${V1_API}${ROUTES.deleteBookImage}/:id`,
    authMiddleware,
    Controller.deleteBookImage
  );
};
