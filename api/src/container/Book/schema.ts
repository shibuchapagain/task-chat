import * as joi from "joi";
import { ROUTES } from "./types";

const objects = {
  title: joi.string(),
  price: joi.number().min(1),
  author: joi.string(),
  // category: joi.string(),

  password: joi
    .string()
    .min(8)
    .message("Password must be at least 8 character")
    .required(),
  code: joi.number().integer().required().min(1000).max(9999),
};
const keysTypes = [
  ...Object.keys(objects),
  ...Object.keys(objects).map((key) => `${key}?`),
];

const generateSchema = (keys: typeof keysTypes) => {
  const schema = {};
  keys.forEach((key) => {
    if (objects[key]) {
      schema[key] = objects[key].required();
    }
    if (key.charAt(key.length - 1) === "?" && objects[key.slice(0, -1)]) {
      schema[key.slice(0, -1)] = objects[key.slice(0, -1)];
    }
  });
  return schema;
};

type Object = {
  register;
  login;
  verifyAccount;
  updateProfile;
};

const schema: Object = {
  register: joi.object({
    body: generateSchema(["email", "password", "firstName", "lastName"]),
  }),
  login: joi.object({
    body: generateSchema(["email", "password"]),
  }),
  verifyAccount: joi.object({
    body: generateSchema(["email", "code"]),
  }),
  updateProfile: joi.object({
    body: generateSchema([
      "firstName",
      "lastName",
      "address",
      "country",
      "bio",
    ]),
  }),
};

export default schema;
