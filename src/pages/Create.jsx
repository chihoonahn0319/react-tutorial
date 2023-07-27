import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import styled from "styled-components";
import { useDispatch } from "react-redux"; // useDispatch를 react-redux에서 가져옴
import { addPost } from "../index"; // addPost를 index.js에서 불러옴

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // '추가' 버튼 클릭 시 새로운 게시물을 생성하고 목록 페이지로 이동한당(이거도 유저편의 ..난 해주기 불편..)
  const handleAddClick = () => {
    const newPost = {
      id: Date.now(), // 새로운 게시물의 ID를 현재 시간으로 생성(검색해보니까 그렇게하라는데 굳이..?)(예지님 피드백을 들어보니 굳이가아니였네 고맙다 구글아)
      title: title,
      content: content,
      author: "",
    };

    // addPost 액션을 디스패치하여 새로운 게시물을 추가
    dispatch(addPost(newPost));

    navigate("/"); // 목록 페이지로 이동
  };

  return (
    <>
      <Header />
      <Container>
        {/* 게시물 생성을 위한 폼 */}
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

// 스타일 컴포넌트 정의
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
