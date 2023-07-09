import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    currentStep: {
      type: Number,
      required: true,
      default: 1,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      // required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      // required: true,
      min: [1, "Price must at least 1"],
    },
    quantity: {
      type: Number,
      // required: true,
      default: 1,
    },
    status: {
      type: String,
      enum: [
        "Booking Request",
        "Booking Accept",
        "Booking Cancel",
        "Booking Decline",
        "Completed",
      ],
      default: "Booking Request",
    },
    cancelledBy: {
      type: String,
      enum: ["Buyer"],
    },
    declinedBy: {
      type: String,
      enum: ["seller"],
    },
    isPaid: {
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

const BookingModel = mongoose.model("Booking", BookingSchema);
export default BookingModel;
