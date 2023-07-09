// import BookModel from "./../../model/Book";
import ProductModel from "../../model/Product";
import CategoryModel from "../../model/Category";
import SubCategoryModel from "../../model/SubCategory";
import BookImageModel from "./../../model/BooksImage";
import ProductImageModel from "../../model/ProductImage";

export const createCategory = async (payload: any): Promise<unknown> => {
  const data = await CategoryModel.create(payload);
  return data;
};

export const getAllCategory = async (): Promise<unknown> => {
  const data = await CategoryModel.find();
  return data;
};

export const createSubCategory = async (payload: any): Promise<unknown> => {
  const data = await SubCategoryModel.create(payload);
  return data;
};

export const getSubCategoryByCategoryId = async (
  categoryId: string
): Promise<unknown> => {
  const data = await SubCategoryModel.find({ category: categoryId });
  return data;
};

export const createProduct = async (
  authId: string,
  payload: any
): Promise<unknown> => {
  const data = await ProductModel.create({ ...payload, user: authId });
  return data;
};

export const getProductBySubCategoryId = async (
  subCategoryId: string
): Promise<unknown> => {
  const data = await ProductModel.find({ subCategory: subCategoryId });
  return data;
};

// export const searchBook = async (query: any): Promise<unknown> => {
//   let whereObj = {};
//   if (query?.title) {
//     whereObj = {
//       ...whereObj,
//       title: { $regex: new RegExp(query?.title, "i") },
//     };
//   }
//   if (query?.category) {
//     whereObj = {
//       ...whereObj,
//       category: { $regex: new RegExp(query?.category, "i") },
//     };
//   }
//   if (query?.price) {
//     whereObj = { ...whereObj, price: { $lt: query?.price } };
//   }
//   const data = await BookModel.find(whereObj);
//   return data;
// };

export const updateProductImage = async (
  authId: string,
  productId: string,
  files: any
) => {
  try {
    const urls = files?.map((item: any) => item?.filename);
    const object = urls?.map((item: any) => ({
      user: authId,
      product: productId,
      url: item,
    }));
    const response: any = await ProductImageModel.insertMany(object);
    const productImageId = JSON.stringify(
      response?.map((item: any) => item?._id)
    );
    const productData: any = await ProductModel.findByIdAndUpdate(
      productId,
      {
        $push: {
          productImages: { $each: JSON.parse(productImageId) },
        },
      },
      { new: true, runValidators: true }
    );
    return productData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product image");
  }
};

// export const deleteBookImage = async (authId: string, imageId: string) => {
//   try {
//     const BookImageDetails: any = await BookImageModel.findById(imageId);
//     if (authId !== String(BookImageDetails?.user)) {
//       throw {
//         code: 400,
//         message: "You don't have permission",
//       };
//     }
//     await BookImageModel.findByIdAndDelete(imageId);
//     const bookData: any = await BookModel.findByIdAndUpdate(
//       BookImageDetails?.book,
//       {
//         $pull: {
//           bookImages: imageId,
//         },
//       },
//       { new: true, runValidators: true }
//     );
//     return bookData;
//   } catch (error) {
//     throw new Error("Failed to delete book image");
//   }
// };

// searchProduct
export const searchProduct = async (query: any): Promise<unknown> => {
  let whereObj = {};
  if (query?.title) {
    whereObj = {
      ...whereObj,
      title: { $regex: new RegExp(query?.title, "i") },
    };
  }
  if (query?.category) {
    whereObj = {
      ...whereObj,
      category: { $regex: new RegExp(query?.category, "i") },
    };
  }
  if (query?.price) {
    whereObj = { ...whereObj, price: { $lt: query?.price } };
  }
  const page = query?.page || 1; // Current page number
  const pageSize = query?.pageSize || 10; // Number of items per page
  const data = await ProductModel.find(whereObj)
    .skip((page - 1) * pageSize) // Skip the appropriate number of items
    .limit(pageSize) // Limit the number of items per page
    .populate({
      path: "user",
      select: ["firstName", "lastName"], // select specific from user table
    })
    .populate({ path: "productImages", select: "url" });
  return data;
};

export const similarProduct = async (productId: string): Promise<unknown> => {
  const productDetails = await ProductModel.findById(productId);
  const productTitle: string = productDetails?.title || "";
  const subCategoryId = productDetails?.subCategory;
  let whereObj: any = {};
  whereObj = {
    ...whereObj,
    subCategory: subCategoryId,
    _id: { $ne: productId },
    title: { $regex: new RegExp(productTitle, "i") },
  };

  const page = 1; // Current page number
  const pageSize = 3; // Number of items per page

  const data = await ProductModel.find(whereObj)
    .skip((page - 1) * pageSize) // Skip the appropriate number of items
    .limit(pageSize)
    .populate({
      path: "productImages",
      select: "url",
    });

  if (data.length < 1) {
    delete whereObj.title;
    const response = await ProductModel.find(whereObj)
      .skip((page - 1) * pageSize) // Skip the appropriate number of items
      .limit(pageSize)
      .populate({
        path: "productImages",
        select: "url",
      });
    return response;
  } else {
    return data;
  }
};

export const getProduct = async (productId: string): Promise<unknown> => {
  const data = await ProductModel.findById(productId)
    .populate({
      path: "user",
      select: ["firstName", "lastName"], // select specific from user table
    })
    .populate({ path: "productImages", select: "url" });
  return data;
};
