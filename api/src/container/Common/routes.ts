import { Application } from "express";
import * as Controller from "./controller";
const V1_API = "/api/v1/common/";
import { ROUTES } from "./types";
import {
  authMiddleware,
  requestValidatorMiddleware,
  roleMiddleware,
} from "../../middleware";
import schema from "./schema";

export default (app: Application): void => {
  app.post(
    `${V1_API}${ROUTES.createMessage}`,
    authMiddleware,
    Controller.createMessage
  );

  app.post(
    `${V1_API}${ROUTES.createChat}`,
    authMiddleware,
    Controller.createChat
  );

  app.get(
    `${V1_API}${ROUTES.getConversations}`,
    authMiddleware,
    Controller.getConversations
  );

  app.get(
    `${V1_API}${ROUTES.getConversationChats}/:id`,
    authMiddleware,
    Controller.getConversationChats
  );

  app.post(
    `${V1_API}${ROUTES.createComment}`,
    authMiddleware,
    Controller.createComment
  );

  app.get(
    `${V1_API}${ROUTES.getAllComments}/:id`,
    // authMiddleware,
    Controller.getAllComments
  );

  app.post(
    `${V1_API}${ROUTES.readAllNotification}`,
    authMiddleware,
    Controller.readAllNotification
  );

  app.post(
    `${V1_API}${ROUTES.readNotification}/:id`,
    authMiddleware,
    Controller.readNotification
  );
};
