// index.js

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App"; // App 컴포넌트 불러오기

// createSlice를 사용하여 리듀서 생성
const products = createSlice({
  name: "게시글",
  initialState: [
    {
      id: 1,
      title: "안치훈은 진짜 개바보입니다",
      content: "나는 후니.",
      author: "안치훈",
    },
    {
      id: 2,
      title: "김말똥 멍청이입니다",
      content: "나는 말똥.",
      author: "김말똥",
    },
    {
      id: 3,
      title: "김개똥은 바보입니다",
      content: "나는 개똥.",
      author: "김개똥",
    },
  ],
  reducers: {
    addPost: (state, action) => {
      // 새로운 게시물을 state에 추가하는 리듀서
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      // 특정 게시물을 state에서 삭제하는 리듀서
      return state.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      // 특정 게시물을 수정하는 리듀서
      return state.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
  },
});

// 리듀서 함수 및 액션 타입 가져오기
const { reducer: postsReducer } = products;

// configureStore 사용하기
const store = configureStore({
  reducer: {
    게시글: postsReducer, // 리덕스 스토어에 게시글 리듀서 등록
  },
});

// 리액트 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Provider로 전체 앱 감싸고 store에 위에 configureStore 넣어주기 */}
    <Provider store={store}>
      <BrowserRouter>
        <App /> {/* 라우팅이 포함된 컴포넌트 렌더링 */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

export const { addPost, updatePost, deletePost } = products.actions;
