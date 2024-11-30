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

export const updateProfile = createAsyncThunk(
  "user/update",
  async(user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;    
    const data = await userService.updateDataUser(user, token);
    console.log(user);
    console.log('Tentando atualizar os dados');
    console.log(data);

    // check if exists errors
    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
  }
)

export const getDetailsProfile = createAsyncThunk(
  "user/details",
  async(user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    // Isso seria para ler direto do item setado localmente,
    //const infolocal = localStorage.getItem('user');
    //const id = JSON.parse(infolocal)._id;
    const id = thunkAPI.getState().auth.user._id;
    
    const data = await userService.getUserDetais(user, token, id);
    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }
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
          state.success = true;
        })
        .addCase(profile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
          state.message = null;
        })
        .addCase(updateProfile.pending, (state, action) => {
          state.loading = true;
          state.error = false;
          state.success = false;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          console.log(action.payload);
          state.loading = false;
          state.error = false;
          state.user = action.payload;
          state.success = true;
          state.message = "Usuário Atualizado com sucesso!";
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;          
        })
        .addCase(getDetailsProfile.pending, (state) => {
          state.loading = true;
          state.error = false;
          state.success = false;
          state.message = 'Carregando';
        })
        .addCase(getDetailsProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
          state.message = "Nao foi possivel carregar os dados do usuário!"
        })
        .addCase(getDetailsProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.error = false;
          state.success = true;
          state.user = action.payload;
          state.message = null;
        })
    }
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;