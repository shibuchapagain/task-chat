import mongoose from "mongoose";
const Schema = mongoose.Schema;

// const ConversationSchema = new Schema(
//   {
//     seller: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Auth",
//       required: true,
//     },
//     buyer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Auth",
//       required: true,
//     },
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     chat: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Chat",
//         required: true,
//       },
//     ],
//     booking: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Booking",
//       required: false,
//     },
//     chatType: {
//       type: String,
//       enum: ["booking"],
//       default: "booking",
//     },
//   },
//   {
//     timestamps: true,
//     autoCreate: true,
//     autoIndex: true,
//   }
// );

const ConversationSchema = new Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
      },
    ],
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: false,
    },
    chatType: {
      type: String,
      enum: ["booking"],
      default: "booking",
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const ConversationModel = mongoose.model("Conversation", ConversationSchema);
export default ConversationModel;
