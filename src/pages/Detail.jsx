import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Detail({ todos, setTodos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // URL 파라미터로부터 게시물 ID를 가져와서 해당 게시물을 찾아보장
  const post = todos.find((post) => post.id === parseInt(id));

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDeleteClick = (postId) => {
    // 확인 알림 창 띄우기
    const confirmDelete = window.confirm(
      "기억은 머리 속에서 살지만 추억은 가슴 속에서 산다. 정말로 삭제하시겠습니까?"
    );

    if (confirmDelete) {
      // 선택한 게시물을 목록에서 제거하기 위해 새로운 게시물 목록을 생성
      const updatedtodos = todos.filter((p) => p.id !== post.id);
      // 게시물 목록을 업데이트하고 목록 페이지로 이동 (유저 편의 난솔직히 해주기싫음 유저가 불편했으면 좋겠따..)
      setTodos(updatedtodos);
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <DetailContainer>
        {/* 게시물 제목 */}
        <Title>{post.title}</Title>
        {/* 게시물 내용 */}
        <Content>{post.content}</Content>
        <ButtonContainer>
          {/* 수정 버튼 */}
          <EditButton onClick={() => navigate(`/edit/${post.id}`)}>
            수정
          </EditButton>
          {/* 삭제 버튼 */}
          <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
        </ButtonContainer>
      </DetailContainer>
    </>
  );
}

const DetailContainer = styled(Container)`
  /* 게시물 제목과 내용을 감싸는 스타일링 된 컨테이너 */
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
