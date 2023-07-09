import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);
SubCategorySchema.index({ title: "text" }); // Set title field as a text index
const SubCategoryModel = mongoose.model("SubCategory", SubCategorySchema);
export default SubCategoryModel;

// Post.find({ $text: { $search: 'search query' } }, (err, posts) => {
//     // Handle error and posts array
//   });
