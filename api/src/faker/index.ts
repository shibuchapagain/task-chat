import auth from "./auth";
import category from "./category";
import Auth from "./../model/Auth";
import Category from "./../model/Category";
const mongoose = require("mongoose");

const init = async (): Promise<void> => {
  try {
    mongoose
      .connect(
        "mongodb+srv://shibuchapagain12:shibuchapagain@cluster0.ogaireo.mongodb.net/thrift?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectTimeoutMS: 30000,
          socketTimeoutMS: 60000,
        }
      )
      .then(() => {
        console.log("DB CONNECT SUCCESSFULLY");
      })
      .catch((err) => console.log("error", err));
    await Promise.all([
      auth.map(async (authData) => {
        await Auth.create(authData);
      }),
      category.map(async (categoryData) => {
        await Category.create(categoryData);
      }),
    ]);
    console.log("faker completed");
    return;
  } catch (err) {
    console.log("faker err", err);
  }
};

init();
