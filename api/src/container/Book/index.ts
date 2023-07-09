import express from "express";
import Book from "./routes";

export default (app: express.Application): void => {
  Book(app);
};
