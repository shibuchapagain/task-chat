import { createSlice } from '@reduxjs/toolkit';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';
import _ from 'lodash';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatData: [],
    chatConversationData: [],
    updateChat: [],
    loading: false,
  },
  reducers: {
    setConversations: (state, action) => {
      state.chatData = action.payload;
    },

    updateChats: (state, action) => {
      const updatedConversations = action.payload;
      const updatedChatData: any = state.chatData.map((conversation: any) => {
        if (conversation?._id === updatedConversations._id) {
          const sortedChats: any = _.sortBy(
            updatedConversations.chats,
            'date',
          ).reverse();
          return {
            ...conversation,
            chats: sortedChats,
          };
        }
        return conversation;
      });
      state.chatData = updatedChatData;
      state.updateChat = updatedChatData;
      state.chatConversationData = updatedConversations;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setConversations, updateChats, setLoading } = chatSlice.actions;
export default chatSlice.reducer;
