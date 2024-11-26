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
  console.log('Resposta do Register!');
  console.log(data);

  // check for errors
  if(data.errors){
    console.log("Cai no Slices, error!");
    console.log(data.errors);
    return thunkAPI.rejectWithValue(data.errors[0])
  }
  return data;
})

// Login an user.
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const data = await authService.login(user)
  console.log('Resposta do Login!');  

  if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
  }
  return data;
});

// Logout an user.
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});
  

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
    .addCase(login.pending, (state, action) => {
      state.loading = true;
      state.errors = null;
      state.success = false;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.success = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
      state.error = null;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.loading = false;
      state.success = true;
      state.error = null;
    })
  }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;