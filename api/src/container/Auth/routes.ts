import { Application } from "express";
import * as Controller from "./controller";
const V1_API = "/api/v1/auth/";
import { ROUTES } from "./types";
import {
  authMiddleware,
  requestValidatorMiddleware,
  roleMiddleware,
} from "../../middleware";
import uploader from "./../../services/imageUpload";
import schema from "./schema";

const upload_path = (req, res, next) => {
  req.upload_path = "public/uploads/user";
  next();
};

export default (app: Application): void => {
  app.post(
    `${V1_API}${ROUTES.register}`,
    [requestValidatorMiddleware(schema.register)],
    Controller.Register
  );

  app.post(
    `${V1_API}${ROUTES.login}`,
    [requestValidatorMiddleware(schema.login)],
    Controller.login
  );

  app.post(
    `${V1_API}${ROUTES.verifyAccount}`,
    [requestValidatorMiddleware(schema.verifyAccount)],
    Controller.verifyAccount
  );

  app.get(
    `${V1_API}${ROUTES.getMyProfile}`,
    authMiddleware,
    Controller.getMyProfile
  );

  app.get(
    `${V1_API}${ROUTES.verifyToken}`,
    authMiddleware,
    Controller.verifyToken
  );

  app.patch(
    `${V1_API}${ROUTES.updateProfile}`,
    authMiddleware,
    // roleMiddleware(["Renter", "Seeker", "Owner"]),
    Controller.updateProfile
  );

  app.post(
    `${V1_API}${ROUTES.updateAvatar}`,
    authMiddleware,
    upload_path,
    uploader.single("image"),
    Controller.updateAvatar
  );

  // app.get(`${V1_API}geocode/:address`, Controller.getAddress);
  // app.get(`${V1_API}getAddressFromLatLng`, Controller.getAddressFromLatLng);
};
