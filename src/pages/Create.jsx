import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query"; // useMutation과 useQueryClient 임포트
import { auth } from "../firebase";
import axios from "axios"; // axios 임포트
import { nanoid } from "nanoid";

import { addPost } from "../redux/slice/postSlice";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);

  //로그인 했는지 검사 이거 줄여야되는데 어렵당..
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // useQueryClient 훅을 컴포넌트 함수 외부에서 사용
  const queryClient = useQueryClient();

  // useMutation을 사용하여 데이터 추가 처리 넣어주기 post
  const addPostMutation = useMutation(async (newPost) => {
    const response = await axios.post("http://localhost:3001/posts", newPost);
    return response.data;
  });

  const handleAddClick = async () => {
    const newPost = {
      id: nanoid(),
      title: title,
      content: content,
      author: user ? user.email : "",
    };

    try {
      const data = await addPostMutation.mutateAsync(newPost); // 데이터 추가 처리
      dispatch(addPost(data));

      // 목록 페이지 데이터 캐시 무효화 및 다시 가져오기
      //React Query 라이브러리의 기능 중 하나로, 캐시된 데이터를 무효화하여
      //다시 불러올 수 있게 해주는 메서드입니다.
      //이 메서드를 사용하면 데이터를 업데이트하거나 삭제한 후에
      //해당 데이터를 다시 가져올 수 있다
      //사실 잘 이해안감 질문꼭하기 ★★★★★★★★★★★★★★★★★★★★★
      queryClient.invalidateQueries("posts");

      navigate("/");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddClick();
          }}
        >
          <Input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <SubmitButton type="submit">추가하기</SubmitButton>
        </Form>
      </Container>
    </>
  );
}

const Form = styled.form`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  padding: 8px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  resize: none;
  height: 100%;
  width: 100%;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  padding: 12px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  color: white;
  border-radius: 12px;
  background-color: skyblue;
  cursor: pointer;
`;
