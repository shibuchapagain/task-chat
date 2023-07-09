import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    webRoute: {
      type: String,
      required: true,
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

const NotificationModel = mongoose.model("Notification", NotificationSchema);
export default NotificationModel;
