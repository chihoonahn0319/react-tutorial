import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deletePost } from "../redux/slice/postSlice";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // URL 파라미터로부터 게시물 ID를 가져옴
  const { id } = useParams();
  // 리덕스 스토어의 '게시글' 상태를 조회
  const todos = useSelector((state) => state.게시글);
  const post = todos.find((post) => post.id === id);

  // 만약 게시물이 없을 경우, 404 페이지로 이동
  if (!post) {
    return (
      <>
        <div>없는 페이지입니다.</div>
        <Link to="/">홈으로 이동</Link>
      </>
    );
  }

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "기억은 머리 속에서 살지만 추억은 가슴 속에서 산다. 정말로 삭제하시겠습니까?"
    );

    if (confirmDelete) {
      dispatch(deletePost(post.id));
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <DetailContainer>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
        <ButtonContainer>
          <EditButton onClick={() => navigate(`/edit/${post.id}`)}>
            수정
          </EditButton>
          <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
        </ButtonContainer>
      </DetailContainer>
    </>
  );
}

const DetailContainer = styled(Container)`
  h1 {
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 12px;
  }
  div {
    height: 400px;
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 12px;
  }
  margin-top: 12px;
`;

const Title = styled.h1``;

const Content = styled.div``;

const ButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
`;

const EditButton = styled(Button)`
  background-color: orange;
  margin-right: 6px;
`;

const DeleteButton = styled(Button)`
  background-color: red;
`;
