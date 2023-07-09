import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const BookModel = require("./Book");

const BookImageSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const BookImageModel = mongoose.model("BookImage", BookImageSchema);
export default BookImageModel;
