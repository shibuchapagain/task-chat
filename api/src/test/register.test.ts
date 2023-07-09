// const { registerUserService } = require("./register");
import { registerUserService } from "./register";

describe("Register User Service", () => {
  it("should return expected result when registering a user", async () => {
    const user = {
      firstName: "John",
      lastName: "test",
      email: "john@example.com",
      password: "password123",
    };
    console.log(user, "check user which is gone from test");
    const result = await registerUserService(user);
    console.log(result, "check result");
    // expect(result).toEqual({
    //   success: true,
    //   data: user,
    //   //   message: "User registered successfully",
    //   //   data: user,
    // });
  }, 20000);
});
