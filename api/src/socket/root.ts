import Config from "./../config/config.js";
import { JWT_OBJECT } from "../types";
import jwt from "jsonwebtoken";
import AuthModel from "./../model/Auth";
import socketIO from "./socketIO";
import Chats from "./chat";
import { createComment } from "../container/Common/service.js";

socketIO.on("connection_error", (err) => {
  console.log("error", err);
});

socketIO.on("connection", async (socket) => {
  const socketId: string = socket.id;
  const token: any = socket.handshake.auth.token;
  if (!token) {
    const err: any = new Error("Forbidden");
    err.statusCode = 403;
    socket.emit("error", err);
    return;
  }

  interface tokenObject {
    id: string;
    role: string;
    expiresAt: string;
  }

  try {
    const tokenUser: tokenObject = <JWT_OBJECT>(
      jwt.verify(token, process.env.JWT_SECRET)
    );
    await AuthModel.findByIdAndUpdate(tokenUser?.id, { socketId: socketId });
    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    socket.on("leaveRoom", (room) => {
      socket.leave(room);
    });

    socket.on("disconnect", async () => {
      await AuthModel.findByIdAndUpdate(tokenUser?.id, { socketId: "" });
    });
    await Chats(socket, tokenUser);
  } catch (error) {
    const err: any = new Error("Unauthorized");
    err.statusCode = 401;
    socket.emit("error", err);
  }
});
