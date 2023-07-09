import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OTPSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Verify-Account",
        "Verify-Phone",
        "Password-Reset",
        "Verify-Login",
      ],
      required: true,
    },
    expiredAt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OTPModel = mongoose.model("OTP", OTPSchema);
export default OTPModel;
