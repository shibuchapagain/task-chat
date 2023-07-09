import express from "express";
import Product from "./routes";

export default (app: express.Application): void => {
  Product(app);
};
