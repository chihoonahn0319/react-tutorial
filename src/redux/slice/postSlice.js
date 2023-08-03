import { createSlice } from "@reduxjs/toolkit";

// 데이터를 가져올 함수 작성
const fetchPostsFromDb = async () => {
  const response = await fetch("/db.json");
  const data = await response.json();
  return data.posts;
};

const products = createSlice({
  name: "게시글",
  initialState: [],
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

export const { addPost, updatePost, deletePost, setPosts } = products.actions;
export default products.reducer;

// 데이터 가져오는 액션 크리에이터 사용 예시
export const fetchPosts = () => async (dispatch) => {
  const posts = await fetchPostsFromDb();
  dispatch(setPosts(posts));
};
