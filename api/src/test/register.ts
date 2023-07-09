// import AuthModel from "../model/Auth";
// import AuthModel from "../model/Auth";
// const AuthModel = require("../model/Auth");
import AuthModel from "../model/Auth";
// import AuthModel from "../src/model/Auth";

export const registerUserService = async (user) => {
  const data = await AuthModel.create({
    firstName: "test",
    lastName: "test",
    email: "test@gmail.com",
    password: "123456789",
  });
  return {
    success: true,
    message: "User registered successfully",
    data: data,
  };
};

// export default registerUserService;
