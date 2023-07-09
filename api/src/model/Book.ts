import mongoose from "mongoose";
import BookImageModel from "./BooksImage";
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Fiction", "Non-Fiction", "Educational", "Biography", "Others"],
      default: "Fiction",
    },
    price: {
      type: Number,
      required: true,
      min: [1, "Price must at least 1"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Booking", "Sold"],
      default: "Active",
    },
    author: {
      type: String,
    },
    ISBN: {
      type: String,
    },
    publisher: {
      type: String,
    },
    edition: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ["New", "Used", "Like-New", "Acceptable"],
      default: "Used",
    },
    description: {
      type: String,
    },
    bookImages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookImage",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

BookSchema.pre("deleteOne", async function (next) {
  try {
    const bookId = this.getQuery()["_id"];
    await BookImageModel.deleteMany({ book: { $in: [bookId] } });
    next();
  } catch (err: any) {
    next(err);
  }
});

const BookModel = mongoose.model("Book", BookSchema);
export default BookModel;
