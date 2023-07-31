import React, { Fragment, useState } from "react"; // useState를 여기서 불러옴
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { updatePost } from "../redux/slice/postSlice";

export default function Edit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const todos = useSelector((state) => state.게시글);
  const post = todos.find((post) => post.id === id);

  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  if (post.length === 0) {
    return (
      <>
        <div>없는 페이지입니다.</div>
        <Link to="/">홈으로 이동</Link>
      </>
    );
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedPost = { ...post, title, content };
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
