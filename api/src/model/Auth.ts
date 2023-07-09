import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const AuthSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, "Password must have 8 character"],
    },
    role: {
      type: String,
      enum: ["Seller", "Buyer", "Agent", "Admin"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    phone: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number] },
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    socketId: {
      type: String,
    },
    avatar: {
      type: String,
    },
    onboardingStep: {
      type: Number,
      min: 1,
      max: 4,
      default: 1,
    },
    isVerified: {
      type: Boolean,
      default: false,
      // default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
    },
    bio: {
      type: String,
      maxLength: [200, "Can't write more than 200 words on bio."],
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  }
);

AuthSchema.pre("save", function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }
  // generate a salt
  const salt = bcrypt.genSaltSync(12);

  // hash the password using our new salt
  const hash = bcrypt.hashSync(this.password, salt);

  // override the cleartext password with the hashed one
  this.password = hash;
  next();
});

// mongoose.deleteModel("Auth");

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;
