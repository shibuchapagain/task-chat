import { JWT_OBJECT } from "./../../types/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "./../../model/Auth";
import OTPModel from "./../../model/OTP";
import Config from "./../../config/config.js";
import { generateRandomNumber } from "../../services/helpers";
import moment from "moment";
import sendEmail from "../../services/sendEmail";
import { tokenObject } from "../../middleware/auth";
import uploader from "../../services/imageUpload";
import fs from "fs";
import path from "path";
import { DeleteFile } from "../../services/deleteFile";

// {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

export const register = async (body: any): Promise<unknown> => {
  const checkUserExist = await AuthModel.findOne({ email: body?.email });
  const checkValid = checkUserExist?.isVerified;
  if (checkValid === false) {
    await AuthModel.deleteOne({ email: checkUserExist?.email });
  }
  if (checkUserExist && checkValid) {
    throw {
      code: 400,
      message: "This email address is already exist in our system",
    };
  }
  const user = new AuthModel(body);
  await user.save();
  const OTPDetails = await OTPModel.create({
    user: user?.id,
    code: 1234,
    //  generateRandomNumber(),
    type: "Verify-Account",
    expiredAt: moment().add(2, "minutes"),
  });
  const mailOptions = {
    from: '"Thrift application" admin:  <shibuchapagain12@gmail.com>',
    to: user?.email,
    subject: "Verification Code",
    text: `Your Account verification code is ${OTPDetails?.code}. Please don't share this code with others.`,
    html: `<b>Your verification code is ${OTPDetails?.code} </b>`,
  };
  // sendEmail(mailOptions);
  return user;
};

export const login = async (body: any): Promise<unknown> => {
  const filter = { email: body?.email };
  let userDetails = await AuthModel.findOne(filter);
  if (!userDetails) {
    throw {
      code: 401,
      message: "Invalid credentials",
    };
  }

  const matchPasswords = bcrypt.compareSync(
    body?.password.trim(),
    userDetails?.password
  );
  if (!matchPasswords) {
    throw {
      code: 401,
      message: "Invalid credentials",
    };
  }
  if (userDetails?.isBlocked) {
    throw {
      code: 401,
      message: "You have been blocked, contact support",
    };
  }
  if (!userDetails?.isVerified) {
    throw {
      code: 401,
      message:
        "Your account hasn't been verified, check your email for verified your account",
    };
  }
  const token = jwt.sign(
    <JWT_OBJECT>{
      id: userDetails?.id,
      role: userDetails?.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return { userDetails, token };
};

export const verifyAccount = async (body: any): Promise<unknown> => {
  const userDetails = await AuthModel.findOne({
    email: body?.email,
  });

  if (!userDetails) {
    throw {
      code: 400,
      msg: "No user of that email address",
    };
  }

  if (userDetails?.isVerified) {
    throw {
      code: 200,
      message: "This account is already verified.",
    };
  }
  const checkValidCode = Number(body?.code) === 1234 ? true : false;
  if (checkValidCode) {
    const response = await AuthModel.updateOne(
      { _id: userDetails?.id },
      { isVerified: true, onboardingStep: 2 }
    );
    if (response?.modifiedCount === 1) {
      return response;
    } else {
      return;
    }
  } else {
    throw {
      code: 400,
      message: "Incorrect code",
    };
  }
};

export const verifyToken = async (tokenUser: JWT_OBJECT): Promise<unknown> => {
  const data = await AuthModel.findById(tokenUser?.id);
  // const token = jwt.sign(
  //   {
  //     id: data?.id,
  //     role: data?.role,
  //     expiresAt: moment().add(24, "hours").format("YYYY-MM-DD hh:mm a"),
  //   },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: 24 * 10 * 50,
  //   }
  // );
  return data;
};

export const getMyProfile = async (id: number): Promise<unknown> => {
  const data = await AuthModel.findById(id);
  return data;
};

export const updateProfile = async (
  tokenUser: tokenObject,
  body: any
): Promise<void> => {
  const authId = tokenUser?.id;
  const options = {
    new: true,
    runValidators: true,
  };
  const user: any = await AuthModel.findByIdAndUpdate(authId, body, options);
  return user;
};

export const updateAvatar = async (authId: string, files: any) => {
  const checkExistImage = await AuthModel.findById(authId);
  const avatarURL = checkExistImage?.avatar;
  if (avatarURL) {
    const originPath = path.join(
      process.cwd() + "/public",
      "uploads",
      "user",
      avatarURL
    );
    DeleteFile(originPath);
  }
  const response = await AuthModel.findByIdAndUpdate(
    authId,
    { avatar: files?.filename },
    { new: true, runValidators: true }
  );
  return response;
};
