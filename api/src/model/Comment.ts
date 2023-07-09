import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      // required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      // required: true,
    },
    comment: {
      type: String,
      // required: true,
    },
    parentId: {
      type: String,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
