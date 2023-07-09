import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductImageSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

const ProductImageModel = mongoose.model("ProductImage", ProductImageSchema);
export default ProductImageModel;
