// import mongoose from "mongoose";
const mongoose = require("mongoose");
require("dotenv").config();
const Config = require("./config");
// mongoose
//   .connect(Config.MONGO_URL)
//   .then(() => {
//     console.log("DB CONNECT SUCCESSFULLY");
//   })
//   .catch((err) => console.log("NO CONNECTION", err));

mongoose
  .connect(process.env.MONGO_URL || Config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
  })
  .then(() => {
    console.log("DB CONNECT SUCCESSFULLY");
  })
  .catch((err) => console.log("error", err));
