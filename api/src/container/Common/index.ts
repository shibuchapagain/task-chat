import express from "express";
import Common from "./routes";

export default (app: express.Application): void => {
  Common(app);
};
