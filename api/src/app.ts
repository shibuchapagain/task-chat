import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { app, httpServer } from "./server";
require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors";
import "./socket";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();
app.use(morgan("dev")); // use morgan with the 'tiny' format
app.use(cors());
// const db =
//   "mongodb+srv://shibuchapagain12:shibuchapagain@cluster0.ogaireo.mongodb.net/thrift?retryWrites=true&w=majority";

// const db = "mongodb://localhost:27017/thrift";

// mongoose
//   .connect(db)
//   .then(() => {
//     console.log("db connect successfully");
//   })
//   .catch((err) => {
//     console.log("no connection", err);
//   });

require("./config/database");
app.use("/images", express.static(process.cwd() + "/public/uploads"));

import routes from "./routes";
routes(app);
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`server at http on port: ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server running at ${PORT}`);
// });

// export default app;
