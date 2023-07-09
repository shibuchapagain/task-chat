import express from "express";
import Auth from "./routes";

export default (app: express.Application): void => {
  Auth(app);
};
