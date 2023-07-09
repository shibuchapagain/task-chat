// import BookModel from "./../../model/Book";
import ProductModel from "../../model/Product";
// import CategoryModel from "../../model/Category";
import SubCategoryModel from "../../model/SubCategory";
import BookImageModel from "./../../model/BooksImage";
import ProductImageModel from "../../model/ProductImage";
import BookingModel from "../../model/Booking";
import NotificationModel from "../../model/Notification";
import AuthModel from "../../model/Auth";
import ConversationModel from "../../model/Conversation";
import socketIO from "../../socket";
import ChatModel from "../../model/Chat";
import mongoose, { Model } from "mongoose";
import CommentModel from "../../model/Comment";
// import socket from "../../socket";

export const createMessage = async (payload): Promise<unknown> => {
  // const payload= {
  // seller: "seller id",
  // buyer: "buyer id",
  // chatType:"booking",
  // product: "product id",
  // }
  let id;
  if (payload?.chatType === "booking") {
    const where = payload;
    Object.keys(where).forEach((key) =>
      where[key] === undefined ? delete where[key] : null
    );
    const conversation = await ConversationModel.findOne(where);
    if (conversation) {
      id = conversation._id;
    } else {
      const newConversation = new ConversationModel(where);
      const createdConversation = await newConversation.save();
      id = createdConversation._id;
      if (where?.seller) {
        const seller = await AuthModel.findById(where?.seller);
        if (seller?.socketId) {
          socketIO.to(seller?.socketId).emit("refreshChat");
        }
      }
      if (where?.buyer) {
        const buyer = await AuthModel.findById(where?.buyer);
        if (buyer?.socketId) {
          socketIO.to(buyer?.socketId).emit("refreshChat");
        }
      }
    }
    return new mongoose.Types.ObjectId(id);
  } else {
    throw {
      msg: "something went wrong",
    };
  }
};

export const createChat = async (payload): Promise<unknown> => {
  const conversation = payload?.conversation;
  const data = await ChatModel.create({
    conversation: conversation,
    message: payload?.message,
    chatBy: payload?.chatBy,
  });
  const chatId = JSON.stringify(Array(data)?.map((item: any) => item?._id));
  await ConversationModel.findByIdAndUpdate(
    conversation,
    {
      $push: {
        chats: { $each: JSON.parse(chatId) },
      },
    },
    { new: true, runValidators: true }
  );
  return data;
};

export const getConversations = async (
  id: string,
  role: string
): Promise<unknown> => {
  if (!(id && role)) {
    return;
  }
  const userRole = role.toString().toLowerCase();
  const data = await ConversationModel.find({
    [`${userRole}`]: id,
  })
    .populate({ path: "seller" })
    .populate({ path: "buyer" })
    .populate({ path: "product" })
    // .populate({ path: "chats" });
    .populate({
      path: "chats",
      model: ChatModel,
      options: {
        limit: 1,
        sort: { _id: -1 },
      },
    });
  return data;
};

export const getConversationChats = async (id: string): Promise<unknown> => {
  const data = await ConversationModel.findById(id).populate({
    path: "chats",
    model: ChatModel,
    options: {
      limit: 200,
      sort: { _id: -1 },
    },
  });
  return data;
};

export const createComment = async (
  authId: string,
  body: any
): Promise<void> => {
  const commenterDetails = await AuthModel.findById(authId);
  const productId = body?.product;
  const productDetails = await ProductModel.findById(productId);
  const productOwnerId: any = productDetails?.user;
  const data: any = await CommentModel.create({ ...body, user: authId });
  if (body?.replyTo && body?.parentId) {
    const comment = body?.parentId;
    const parentId = JSON.stringify(Array(data)?.map((item: any) => item?._id));
    await CommentModel.findByIdAndUpdate(
      comment,
      {
        $push: {
          replies: { $each: JSON.parse(parentId) },
        },
      }
      // { new: true, runValidators: true }
    );
  }
  if (data?.product && data?.comment && !data?.parentId) {
    await NotificationModel.create({
      user: String(productOwnerId),
      title: `${commenterDetails?.firstName} ${commenterDetails?.lastName} comment on this ${productDetails?.title} product`,
      webRoute: `/product-view/${String(productId)}`,
    });
  }
  if (data?.product && data?.parentId && body?.replyTo) {
    await NotificationModel.create({
      user: body?.replyTo,
      title: `${commenterDetails?.firstName} ${commenterDetails?.lastName} mentioned you on this ${productDetails?.title} product`,
      webRoute: `/product-view/${String(productId)}`,
    });
  }
  return data;
};

export const getAllComments = async (
  productId,
  { limit = 10, offset = 0, page = 0 }
) => {
  console.log(productId, "check product id");
  const limitData = +limit;
  const skip = +offset || +page * limitData;
  const whereObj = { product: productId };
  const data = await CommentModel.find({
    product: productId,
    parentId: "",
    // parentId: { $exists: false },
  })
    .populate({
      path: "user",
      select: ["firstName", "lastName", "avatar"],
    })
    .populate({
      path: "replies",
      model: CommentModel,
      // options: {
      //   limit: 1,
      //   sort: { _id: -1 },
      // },
      populate: {
        path: "user",
        select: ["firstName", "lastName", "avatar"],
      },
    })
    .sort({ _id: -1 });
  return data;
};

export const readAllNotification = async (authId: string) => {
  console.log(authId, "check user id");
  const data = await NotificationModel.updateMany(
    { user: authId },
    { isRead: true }
  );
  return data;
};

export const readNotification = async (id: string) => {
  await NotificationModel.findByIdAndUpdate(id, { isRead: true });
  const data = await NotificationModel.findById(id);
  return data;
};
