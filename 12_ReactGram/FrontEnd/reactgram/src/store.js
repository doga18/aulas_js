import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add your slice here
    user: userReducer, // Add your slice here
  },
})