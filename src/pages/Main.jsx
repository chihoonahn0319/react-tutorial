import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../index"; // index.js에서 deletePost 가져오기

export default function Main() {
  // 리덕스 스토어의 '게시글' 상태를 조회
  const todos = useSelector((state) => state.게시글);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEditClick = (postId) => {
    navigate(`/edit/${postId}`); // 수정 버튼 클릭 시 해당 게시물의 수정 페이지로 이동
  };

  const handleCreateClick = () => {
    navigate(`/create`); // 추가 버튼 클릭 시 새로운 게시물 생성 페이지로 이동
  };

  const handleDeleteClick = (postId) => {
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
      <Container>
        <CreateButton onClick={handleCreateClick}>추가</CreateButton>{" "}
        {/* '추가' 버튼 */}
        {todos.map((post) => (
          <PostContainer key={post.id}>
            <PostContent
              onClick={() => {
                navigate(`/detail/${post.id}`); // 게시물 클릭 시 해당 게시물의 상세 페이지로 이동
              }}
            >
              <h2>{post.title}</h2> {/* 게시물 제목 */}
              <p>{post.content}</p> {/* 게시물 내용 */}
            </PostContent>
            <AuthorName>{post.author}</AuthorName>
            <ActionButtons>
              <div>
                <EditButton onClick={() => handleEditClick(post.id)}>
                  수정
                </EditButton>{" "}
                {/* '수정' 버튼 */}
                <DeleteButton onClick={() => handleDeleteClick(post.id)}>
                  삭제
                </DeleteButton>{" "}
                {/* '삭제' 버튼 */}
              </div>
            </ActionButtons>
          </PostContainer>
        ))}
      </Container>
    </>
  );
}

const Button = styled.button`
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
`;

const CreateButton = styled(Button)`
  background-color: pink;
  margin: 0 auto; // 가운데 정렬을 위한 스타일
  display: block; // inline 요소를 block 요소로 변경하여 가로폭을 조절
`;

const EditButton = styled(Button)`
  background-color: pink;
  margin-right: 6px; // '수정' 버튼과 '삭제' 버튼 사이의 간격을 조절하기 위한 스타일
`;

const DeleteButton = styled(Button)`
  background-color: pink;
`;

const PostContainer = styled.div`
  background-color: #eeeeee;
  height: 100px;
  border-radius: 24px;
  margin-bottom: 12px;
  display: flex;
  padding: 12px 16px 12px 16px;
`;

const PostContent = styled.div`
  flex: 4;
  border-right: 1px solid lightgrey;
  cursor: pointer;

  h2 {
    margin: 0;
  }

  p {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ActionButtons = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-around;
  gap: 12px;
`;
const AuthorName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-weight: bold;
`;
