import React, { Fragment } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; //useSelector, useDispatch import 하기 치훈아 이제좀 기억하자..
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { updatePost } from "../index"; // updatePost를 index.js에서 불러옴

export default function Edit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // URL 파라미터로부터 게시물 ID를 가져온당께
  const { id } = useParams();
  // 해당 ID를 가진 게시물을 찾아보장
  const postId = parseInt(id);

  // 리덕스 스토어의 '게시글' 상태를 조회
  const todos = useSelector((state) => state.게시글);
  const post = todos.find((post) => post.id === postId);

  //초기값 설정 파블로스 뭉뭉이마냥 본능적으로 "" 넣었다가 한참 고민해서 해결~!
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  // 수정 버튼을 클릭하면 실행되는 함수
  const handleEditSubmit = (e) => {
    e.preventDefault();

    // 수정된 게시물 객체를 생성
    const updatedPost = { ...post, title, content };

    // 기존의 게시물 목록을 업데이트된 게시물로 교체
    dispatch(updatePost(updatedPost));

    navigate("/");
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <Form onSubmit={handleEditSubmit}>
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

          <SubmitButton type="submit">수정하기</SubmitButton>
        </Form>
      </Container>
    </Fragment>
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
  background-color: orange;
  cursor: pointer;
`;
