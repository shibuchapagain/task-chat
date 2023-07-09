import { createSlice } from '@reduxjs/toolkit';

const UserSlicer = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
  },
  reducers: {
    userStore: (state, action) => {
      state.userDetails = action.payload;
    },
    logout: state => {
      state.userDetails = null;
    },
  },
});

export const { userStore, logout } = UserSlicer.actions;
export default UserSlicer.reducer;
