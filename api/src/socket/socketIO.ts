import { Server } from "socket.io";
import { httpServer } from "../server";

const socketIO = new Server(httpServer);
export default socketIO;
