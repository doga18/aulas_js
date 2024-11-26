// funçoes que lidam com a api.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService'

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null
}

// funções
// get para pegar os dados do usuário
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const id = thunkAPI.getState().auth.user._id;
    const data = await userService.profile(user, token, id);
    return data;
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      resetMessage: (state) => {
        state.message = null
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(profile.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(profile.fulfilled, (state, action) => {
          state.loading = false;
          state.error = false;
          state.user = action.payload;
          state.message = "success";
        })
        .addCase(profile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
          state.message = null;
        })
    }
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;