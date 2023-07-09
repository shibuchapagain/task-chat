import {
  createChat,
  createComment,
  getConversationChats,
  getConversations,
} from "../container/Common/service";
import AuthModel from "../model/Auth";
import ChatModel from "../model/Chat";
import ConversationModel from "../model/Conversation";
import NotificationModel from "../model/Notification";
import socketIO from "./socketIO";
import mongoose from "mongoose";

export default async (socket: any, tokenUser: any) => {
  socket.on("addChat", async (data, res) => {
    console.log("YES IAM EMIT");
    const userDetails = await AuthModel.findById(tokenUser?.id);
    const chatBy = data?.chatBy || userDetails?.role?.toString().toLowerCase();
    let conversationId = data?.conversation;
    const message = data?.message;
    const conversationDetails = await ConversationModel.findById(
      conversationId
    );
    try {
      const payload = {
        conversation: conversationId,
        //  || new mongoose.Types.ObjectId(conversationId),
        message: message,
        chatBy: (tokenUser?.role).toString().toLowerCase() || chatBy,
      };
      const chat: any = await createChat(payload);
      console.log(chat, "check chat on api");
      socketIO.emit("addChat", chat.toJSON());
      socketIO
        .to(`chatRoom-${data?.conversationId}`)
        .emit("addChat", chat.toJSON());
      return res({
        data: chat,
      });
    } catch (err) {
      console.log("ERROR ON SOCKET MESSAGE", err);
      return res({ err });
    }
  });

  socket.on("getConversations", async () => {
    console.log("IS GET CONVERSATION EMIT??");
    const conversations = await sendChatsToUser(socket, tokenUser);
    socketIO.to(socket.id).emit("conversations", conversations);
  });

  socket.on("getConversationChats", async (conversationId: string) => {
    console.log("IS GET CONVERSATION CHAT EMIT??");
    const chats = await getConversationChats(conversationId);
    socketIO.to(socket.id).emit("chats", chats);
  });

  socket.on("getUserNotifications", async () => {
    const userId = tokenUser?.id;
    const filter = { user: userId };
    const notification = await NotificationModel.find(filter).sort({
      _id: -1,
    });
    const unreadNotification = await NotificationModel.count({
      user: userId,
      isRead: false,
    });
    const notificationData = { notification, unreadNotification };
    socketIO.to(socket.id).emit("getUserNotifications", notificationData);
  });

  await sendChatsToUser(socket, tokenUser);
};

export const sendChatsToUser = async (socket, tokenUser) => {
  if (!tokenUser.role) {
    return;
  }
  try {
    const conversations = await getConversations(tokenUser.id, tokenUser.role);
    const formatted = formatConversations(conversations);
    return formatted;
  } catch (err) {
    console.log("sendChatsToUser err", err);
  }
};

export const formatConversations = (conversations) => {
  return conversations?.map((conversation) => {
    const formattedData = {
      id: conversation?._id,
      chats: conversation?.chats,
      seller: getConversationsFromRole("seller", conversation),
      buyer: getConversationsFromRole("buyer", conversation),
    };
    return formattedData;
  });
};

function getConversationsFromRole(roleId, conversation) {
  if (!(conversation?.seller && conversation?.buyer)) {
    return;
  }
  const messageSendUser = roleId === "buyer" ? "buyer" : "seller";
  const fullName = `${conversation?.[messageSendUser]?.firstName} ${conversation?.[messageSendUser]?.lastName}`;
  return {
    fullName: fullName,
    seller: conversation?.seller?._id,
    buyer: conversation?.buyer?._id,
    avatar: conversation?.[messageSendUser]?.avatar,
    refId: roleId,
    role: roleId === "buyer" ? "buyer" : "seller",
  };
}
