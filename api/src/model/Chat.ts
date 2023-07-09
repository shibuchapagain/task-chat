import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    chatBy: {
      type: String,
    },
    message: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
