"use client";

import { createSlice } from "@reduxjs/toolkit";

function getLikePost() {
  if (localStorage.getItem("likedPosts")) {
    return JSON.parse(localStorage.getItem("likedPosts"));
  } else {
    return [];
  }
}
function getSavePost() {
  if (localStorage.getItem("savedPosts")) {
    return JSON.parse(localStorage.getItem("savedPosts"));
  } else {
    return [];
  }
}

const initialState = {
  savedPosts: getSavePost(),
  likedPosts: getLikePost(),
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost(state, action) {
      const postId = action.payload;
      if (!state.likedPosts.includes(postId)) {
        state.likedPosts.push(postId);
        localStorage.setItem("likedPosts", JSON.stringify(state.likedPosts));
      }
    },
    unlikePost(state, action) {
      const postId = action.payload;
      state.likedPosts = state.likedPosts.filter(
        (item) => item.post.id !== postId
      );
      localStorage.setItem("likedPosts", JSON.stringify(state.likedPosts));
    },
    savePost(state, action) {
      const postId = action.payload;
      if (!state.savedPosts.includes(postId)) {
        state.savedPosts.push(postId);
        localStorage.setItem("savedPosts", JSON.stringify(state.savedPosts));
      }
    },
    unsavePost(state, action) {
      const postId = action.payload;
      state.savedPosts = state.savedPosts.filter(
        (item) => item.post.id !== postId
      );
      localStorage.setItem("savedPosts", JSON.stringify(state.savedPosts));
    },
  },
});

export const { likePost, unlikePost, savePost, unsavePost } = postSlice.actions;

export default postSlice.reducer;
