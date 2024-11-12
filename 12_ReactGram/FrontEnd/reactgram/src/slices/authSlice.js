import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Register an user and sign in.

export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
  const data = await authService.register(user)

  // check for errors
  if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
  }
  return data;


})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      //state.user = null;
      state.error = false;
      state.success = false;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.error = null;
        state.loading = false;
    })
    .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
    })
  }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;