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
// Update a photo
export const updatePhoto = createAsyncThunk(
  "photo/updatePhoto",
  async(data, thunkAPI) => {
    //console.log('dados vindos', data)
    const token = thunkAPI.getState().auth.user.token;    
    const id = thunkAPI.getState().auth.user._id;
    const photo = await photoService.updatePhoto({
      title: data.title,
      description: data.description
    },
    data._id,
    token
  )
    if(photo.errors){
      return thunkAPI.rejectWithValue(photo.errors[0])
    }
    return photo;
  }
)
// Make a like to photo, how that action is to be, very simple, we don't use case Loading.
export const likeAPhoto = createAsyncThunk(
  "photo/like",
  async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;    
    const data = await photoService.likeAPhoto(id, token)
    if(data.errors){
      return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
  }
)
//
export const commentAPhoto = createAsyncThunk(
  "photo/comment",
  async(data, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    // A função comment a Photo, espera o comentário, o ID e o token.
    // Para mandar, des-estrutramos e mandamos separados.
    const dataComment = await photoService.commentAPhoto({
      comment: data.comment
      },
      data._id,
      token
    )
    if(dataComment.errors){
      return thunkAPI.rejectWithValue(dataComment.errors[0])
    }
    return dataComment;
  })
// Search photo by title
export const searchPhotos = createAsyncThunk(
  "photo/search",
  async(data, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const dataSearch = await photoService.searchPhotos(data, token);
    if(dataSearch.errors){
      return thunkAPI.rejectWithValue(dataSearch.errors[0])
    }
    return dataSearch;
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
      // newPost
      .addCase(newPost.pending, (state) => {        
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
      // getPosts
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
      // getUserPhotos
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
      // deletePhoto
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
      // getDetailPhoto
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
      // updatePhoto
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = null;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.photos.map((photo) => {
          return (photo.title === action.payload.title);
        });
        state.message = "Foto Atualizada";
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      // Like a photo.
      .addCase(likeAPhoto.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;        
        if(state.photo.likes){
          state.photo.likes.push(action.payload.userId);
          console.log(state.photo.likes);
        }
        state.photos.map((photo) => {
          if(photo._id === action.payload.photo.photoId){
            return photo.likes.push(action.payload.userId);
          }
          return photo;
        })
        state.message = "Foto curtida."
      })
      .addCase(likeAPhoto.rejected, (state, action) => {
        console.log(action.payload);
        state.success = false;
        state.error = action.payload;
        state.message = null;
      })
      // Comment a photo
      .addCase(commentAPhoto.fulfilled, (state, action) => {
        console.log("Novo comentário recebido:", action.payload);
        state.success = true;
        state.error = false;
        // verificando se a resposta da api tem os campos necessários.
        const newComment = action.payload;
        if(newComment && newComment.userId && newComment.username && newComment.userImage && newComment.comment){
          state.photo.comments.push(newComment);
        } else {
          console.log("Resposta inválida recebida da api.");
          state.error = action.payload;
          return;
        }
        state.message = "Comentário adicionado com sucesso.";
      })
      .addCase(commentAPhoto.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
        state.message = null;
      })
      // Search photo by title, function searchPhotos
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.message = "Pesquisando...";
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.message = null;
        state.loading = false;
        state.message = null;
        state.error = false;
        state.success = true;
        state.photo = action.payload;
      })
      .addCase(searchPhotos.rejected, (state, action) => {
        state.message = null;
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.photo = {};
        state.message = "Falha ao pesquisar!";
      })
  }
})

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
