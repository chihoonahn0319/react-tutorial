import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slice/postSlice";

const store = configureStore({
  reducer: {
    게시글: postsReducer,
  },
});

export default store;
