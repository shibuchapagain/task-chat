import * as joi from "joi";
import { ROUTES } from "./types";

const objects = {
  title: joi.string().required(),
  category: joi.string().required(),
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
  createCategory;
  createSubCategory;
};

const schema: Object = {
  createCategory: joi.object({
    body: generateSchema(["title"]),
  }),
  createSubCategory: joi.object({
    body: generateSchema(["title", "category"]),
  }),
};

export default schema;
