import { createSlice } from '@reduxjs/toolkit';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';
import _ from 'lodash';

const notificationSlice = createSlice({
  name: 'chat',
  initialState: {
    notificationData: [],
    updateNotificationData: [],
    loading: false,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notificationData = action.payload;
    },

    updateNotifications: (state, action) => {
      const updateNotification = action.payload;
      state.notificationData = updateNotification;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setNotifications, updateNotifications, setLoading } =
  notificationSlice.actions;
export default notificationSlice.reducer;
