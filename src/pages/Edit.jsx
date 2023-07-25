import React, { Fragment } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Edit({ todos, setTodos }) {
  const navigate = useNavigate();

  // URL 파라미터로부터 게시물 ID를 가져온당께
  const { id } = useParams();

  const postId = parseInt(id);
  // 해당 ID를 가진 게시물을 찾아보장
  const post = todos.find((post) => post.id === postId);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  // 수정 버튼을 클릭하면 실행되는 함수
  const handleEditSubmit = (e) => {
    e.preventDefault();

    // 수정된 게시물 객체를 생성
    const updatedPost = { ...post, title, content };

    // 기존의 게시물 목록을 업데이트된 게시물로 교체
    const updatedtodos = todos.map((p) => (p.id === post.id ? updatedPost : p));

    // 게시물 목록을 업데이트한 후, 게시물 목록 페이지로 이동
    setTodos(updatedtodos);

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
