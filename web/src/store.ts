import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/User';
import ProductsReducer from './reducers/Products';
import ChatSlice from './reducers/Chat';
import NotificationSlice from './reducers/Notification';

const rootStore = configureStore({
  reducer: {
    user: UserReducer,
    product: ProductsReducer,
    chat: ChatSlice,
    notification: NotificationSlice,
  },
});

export default rootStore;
