import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import photoReducer from './slices/photoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add your slice here
    user: userReducer, // Add your slice here
    photo: photoReducer, // Add your slice here
  },
})