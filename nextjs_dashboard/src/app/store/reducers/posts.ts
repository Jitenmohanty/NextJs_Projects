import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedPosts:[],
    likedPosts:[]
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePost(state, action) {
        const postId:number = action.payload;
        if (!state.likedPosts.includes(postId)) {
          state.likedPosts.push(postId);
        }
      },
      unlikePost(state, action) {
        const postId = action.payload;
        state.likedPosts = state.likedPosts.filter(id => id !== postId);
      },
      savePost(state, action) {
        const postId = action.payload;
        if (!state.savedPosts.includes(postId)) {
          state.savedPosts.push(postId);
        }
      },
      unsavePost(state, action) {
        const postId = action.payload;
        state.savedPosts = state.savedPosts.filter(id => id !== postId);
      }
  },
});

export const { likePost, unlikePost, savePost, unsavePost } = postSlice.actions;

export default postSlice.reducer;
