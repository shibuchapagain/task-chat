import express from "express";
import Auth from "./container/Auth";
import Book from "./container/Book";
import Product from "./container/Product";
import Booking from "./container/Booking";
import Common from "./container/Common";

export default (app: express.Application): void => {
  Auth(app);
  Book(app);
  Product(app);
  Booking(app);
  Common(app);

  app.get("/version", (req, res) =>
    res.json(`thrift - 0002 ${process.env.ENV}`)
  );
  app.get("*", (req, res) => res.json("This URL doesn't exist"));
};
