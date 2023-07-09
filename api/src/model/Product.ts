import mongoose from "mongoose";
import ProductImageModel from "./BooksImage";
import moment from "moment";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    productImages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductImage",
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
      min: [3, "Title at least 3 character"],
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
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      enum: ["Not Available", "Available"],
      default: "Not Available",
    },
    negotiable: {
      type: String,
      enum: ["Not Negotiable", "Negotiable"],
      default: "Not Negotiable",
    },
    status: {
      type: String,
      enum: ["Active", "Booking", "Sold", "Deactivate"],
      default: "Active",
    },
    condition: {
      type: String,
      enum: ["Brand New", "Used", "Like New"],
      default: "Like New",
    },
    description: {
      type: String, // type: Object
      required: true,
    },
    specification: {
      type: mongoose.Schema.Types.Mixed,
    },
    adsPosted: {
      type: String,
      default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    adsExpire: {
      type: String,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

ProductSchema.pre("deleteOne", async function (next) {
  try {
    const productId = this.getQuery()["_id"];
    await ProductImageModel.deleteMany({ product: { $in: [productId] } });
    next();
  } catch (err: any) {
    next(err);
  }
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;

// const product = new Product({
//     name: 'Product 1',
//     specification: {
//       color: 'red',
//       weight: 10,
//       dimensions: {
//         height: 10,
//         width: 20,
//         depth: 5,
//       },
//     },
//   });

//   product.save((err) => {
//     // Handle error or save result
//   });

// TO FIND:
// Product.find({ 'specification.color': 'red' }, (err, products) => {
//     // Handle error and products array
//   });
