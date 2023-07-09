import express from "express";
import Booking from "./routes";

export default (app: express.Application): void => {
  Booking(app);
};
