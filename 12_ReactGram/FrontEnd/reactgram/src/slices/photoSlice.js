// functions with handle with the api.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import photoService from '../services/photoService'

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null
}

// Declarations about photo service.
// First function, create a new post with a photo object.
export const newPost = createAsyncThunk(
  "photo/new",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;    
    console.log('is dados informados são:', JSON.stringify(photo));
    const data = await photoService.createPost(photo, token, true)
    console.log(data);
    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
  }
)
// Get all posts to home page.
export const getPosts = createAsyncThunk(
  "photo/getPosts",
  async (photo, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getPosts(photo, token)
    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
  }
)
// Get all photos a especific user.
export const getUserPhotos = createAsyncThunk(
  "photos/getUserPhotos",
  async(photos, thunkAPI) =>{
    const token = thunkAPI.getState().auth.user.token;
    const id = thunkAPI.getState().auth.user._id;
    const data = await photoService.getUserPhotos(photos, id, token)
    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
  }
)
// Get detail about a photo.
export const getDetailPhoto = createAsyncThunk(
  "photo/detailPhoto",
  async(photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;    
    const data = await photoService.getDetailPhoto(photo, token)
    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
  }
)
// Delete a photo who the user is a owner.
export const deletePhoto = createAsyncThunk(
  "photo/deletePhoto",
  async(photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;    
    const data = await photoService.deletePhoto(photo, token)
    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
  }
)

// Construct slices about photo service
export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newPost.pending, (state) => {
        // Deletar os consoles log 
        console.log('Tentando enviar a foto!');
        console.log(state);
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = "Processando aguarde."
      })
      .addCase(newPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.photo = action.payload;
        // Add a new photo in array photos, in the first order in the array
        state.photos.unshift(state.photo);
        state.message = "Post criado com sucesso!";
      })
      .addCase(newPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;        
        state.message = null;

      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = "Processando aguarde."
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.photo = action.payload;
        //state.photos.unshift = state.photo;
        state.message = "Posts carregados com sucesso!";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = "Fail to get posts!";
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = "Processando aguarde."
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.photos = action.payload;
        state.message = "Fotos carregadas com sucesso!";
      })
      .addCase(getUserPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "Fail to get photos!";
        state.success = false;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = "Deletando, aguarde!"
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = "Foto deletada com sucesso!";
        // Remove the deleted photo from array photos
        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        })
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.photo = {};
      })
      .addCase(getDetailPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getDetailPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.photo = action.payload;        
      })
      .addCase(getDetailPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.photo = {};
      })
  }
})

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
