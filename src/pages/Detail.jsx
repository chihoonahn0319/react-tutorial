import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // useDispatch와 useSelector를 react-redux에서 가져옴
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updatePost, deletePost } from "../index"; // updatePost를 index.js에서 불러옴

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // URL 파라미터로부터 게시물 ID를 가져옴
  const { id } = useParams();
  // 해당 ID를 가진 게시물을 찾아옴
  const postId = parseInt(id);
  // 리덕스 스토어의 '게시글' 상태를 조회
  const todos = useSelector((state) => state.게시글);
  const post = todos.find((post) => post.id === postId);

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDeleteClick = () => {
    // 확인 알림 창 띄우기
    const confirmDelete = window.confirm(
      "기억은 머리 속에서 살지만 추억은 가슴 속에서 산다. 정말로 삭제하시겠습니까?"
    );

    if (confirmDelete) {
      // 삭제 진행
      dispatch(deletePost(postId)); // deletePost 액션 생성자 함수를 호출하여 액션 디스패치
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
