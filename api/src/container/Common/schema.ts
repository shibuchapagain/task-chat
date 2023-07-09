import * as joi from "joi";
import { ROUTES } from "./types";

const objects = {
  title: joi.string().required(),
  seller: joi.string().required(),
  product: joi.string().required(),
  price: joi.number().min(1).required(),
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
  book;
  createSubCategory;
};

const schema: Object = {
  book: joi.object({
    params: ["id"],
    body: generateSchema(["seller", "product", "price"]),
  }),
  createSubCategory: joi.object({
    body: generateSchema(["title", "category"]),
  }),
};

export default schema;
