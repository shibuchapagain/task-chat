import store from './../store';
import { promisifyEmit } from './helpers';
import { setConversations, updateChats } from './../reducers/Chat';
// import { useDispatch } from 'react-redux';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';
import { useRoot } from './../RootProvider';
import { setNotifications } from './../reducers/Notification';

export async function subscribers(socket) {
  socket.on('refreshChat', () => {
    getConversations(socket);
  });

  socket.on('addChat', data => {
    store.dispatch(updateChats(data));
  });

  socket.on('conversations', data => {
    data.map(item => {
      joinRoom(socket, `chatRoom-${item.id}`);
    });
    store.dispatch(setConversations(data));
  });

  socket.on('chats', data => {
    store.dispatch(updateChats(data));
  });

  socket.on('getUserNotifications', data => {
    console.log('HIT ON SOCKET');
    store.dispatch(setNotifications(data));
  });
}

export async function addChat(socket, data) {
  await promisifyEmit(socket, 'addChat', data[0]);
}

export async function joinRoom(socket, room: any) {
  socket?.emit('joinRoom', room);
}

export function getConversationChats(socket, conversationId: string) {
  socket?.emit('getConversationChats', conversationId);
}

export async function getConversations(socket) {
  socket?.emit('getConversations');
}

export function getUserNotifications(socket) {
  console.log('Hit on get user');
  socket?.emit('getUserNotifications');
}

// export function getConversations(socket) {
//   return new Promise((resolve, reject) => {
//     socket.emit('getConversations', data => {
//       resolve(data);
//     });
//   });
// }
