import {
  subscribers as allSubscribers,
  addChat,
  getConversations,
  getConversationChats,
  getUserNotifications,
  joinRoom,
} from './functions';

import { io, Socket } from 'socket.io-client';
import axios from 'axios';

let socket: undefined | Socket;

function getTokenFromHeader() {
  try {
    const authorizationHeader: any = axios.defaults.headers.Authorization;
    if (authorizationHeader) {
      const token: any = authorizationHeader.split(' ')[1];
      return token;
    }
  } catch (err) {
    console.log('error retrieving token', err);
  }
}

function connectSocket() {
  const SOCKET_URL = 'http://localhost:5000';
  try {
    const opts = {
      transports: ['websocket'],
      reconnectionDelay: 5000,
      reconnection: true,
      reconnectionAttempts: Infinity,
      auth: {
        token: getTokenFromHeader(),
      },
      cors: {
        origin: SOCKET_URL,
      },
    };

    socket = io(SOCKET_URL, opts);
    socket.on('connect', function () {
      console.log(socket, 'minus');
      console.log('socket connected');
      allSubscribers(socket);
    });
    socket.on('connect_error', function (err) {
      console.log('connect error', err);
    });
  } catch (err) {
    console.log('error', err);
  }
  return socket;
}

function disconnectSocket() {
  socket?.disconnect();
  socket?.close();
  socket = undefined;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  socket,
  connectSocket,
  disconnectSocket,
  getConversationChats: (args: any) => getConversationChats(socket, args),
  getConversations: () => getConversations(socket),
  getUserNotifications: () => getUserNotifications(socket),
  addChat: (...args) => addChat(socket, args),
  joinRoom: (...args) => joinRoom(socket, args),
};
