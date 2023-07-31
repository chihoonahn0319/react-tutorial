import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
  {
    id: nanoid(),
    title: "안치훈은 진짜 바보입니다",
    content: "나는 후니.",
    author: "안치훈",
  },
  {
    id: nanoid(),
    title: "김말똥 멍청이입니다",
    content: "나는 말똥.",
    author: "김말똥",
  },
  {
    id: nanoid(),
    title: "김개똥은 바보입니다",
    content: "나는 개똥.",
    author: "김개똥",
  },
];

const products = createSlice({
  name: "게시글",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      return state.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
  },
});

export const { addPost, updatePost, deletePost } = products.actions;
export default products.reducer;
