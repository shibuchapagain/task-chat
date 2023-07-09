import BookModel from "./../../model/Book";
import BookImageModel from "./../../model/BooksImage";

// const Book = BookModel;

export const createBook = async (
  authId: string,
  payload: any
): Promise<unknown> => {
  const data = await BookModel.create({ ...payload, user: authId });
  return data;
};

export const updateBook = async (
  authId: string,
  bookId: string,
  payload: any
): Promise<unknown> => {
  const bookDetails = await BookModel.findById(bookId);
  const ownerId = bookDetails?.user.toString();
  if (ownerId !== authId) {
    throw {
      code: 400,
      message: "You don't have permission",
    };
  }
  const data = await BookModel.findOneAndUpdate({ _id: bookId }, payload, {
    new: true,
    runValidators: true,
  });
  return data;
};

export const deleteBook = async (
  authId: string,
  bookId: string
): Promise<unknown> => {
  const bookDetails = await BookModel.findById(bookId);
  const ownerId = bookDetails?.user.toString();
  if (ownerId !== authId) {
    throw {
      code: 400,
      message: "You don't have permission",
    };
  }
  const data = await BookModel.deleteOne({ _id: bookId });
  return data;
};

export const getMyBooks = async (authId: string): Promise<unknown> => {
  const books = await BookModel.find({ user: authId }).populate({
    path: "bookImages",
    select: "url",
  });
  return books;
};

// export const getBook = async (bookId: string): Promise<any> => {
//   // try {
//   //   const book = await BookModel.findById(bookId)
//   //     .populate({
//   //       path: "bookImage",
//   //       // select: "url",
//   //     })
//   //     .exec();
//   //   return book;
//   // } catch (error) {
//   //   console.log(error);
//   //   return error;
//   // }
//   Book.findById(bookId)
//     .populate("bookImages")
//     .exec(function (err, book) {
//       if (err) {
//         // handle error
//       } else {
//         // access the bookImages array of the book document
//         console.log(book.bookImages);
//       }
//     });
// };

export const getBook = async (bookId: string): Promise<any> => {
  try {
    const book = await BookModel.findById(bookId)
      .populate({
        path: "bookImages",
        select: "url",
      })
      .exec();
    return book;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searchBook = async (query: any): Promise<unknown> => {
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
  const data = await BookModel.find(whereObj);
  return data;
};

export const createBookImage = async (
  authId: string,
  bookId: string,
  files: any
) => {
  try {
    const urls = files?.map((item: any) => item?.filename);
    const object = urls?.map((item: any) => ({
      user: authId,
      book: bookId,
      url: item,
    }));
    const response: any = await BookImageModel.insertMany(object);
    const bookImageId = JSON.stringify(response?.map((item: any) => item?._id));
    const bookData: any = await BookModel.findByIdAndUpdate(
      bookId,
      {
        $push: {
          bookImages: { $each: JSON.parse(bookImageId) },
        },
      },
      { new: true, runValidators: true }
    );
    return bookData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create book image");
  }
};

export const deleteBookImage = async (authId: string, imageId: string) => {
  try {
    const BookImageDetails: any = await BookImageModel.findById(imageId);
    if (authId !== String(BookImageDetails?.user)) {
      throw {
        code: 400,
        message: "You don't have permission",
      };
    }
    await BookImageModel.findByIdAndDelete(imageId);
    const bookData: any = await BookModel.findByIdAndUpdate(
      BookImageDetails?.book,
      {
        $pull: {
          bookImages: imageId,
        },
      },
      { new: true, runValidators: true }
    );
    return bookData;
  } catch (error) {
    throw new Error("Failed to delete book image");
  }
};
