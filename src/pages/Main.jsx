import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../common/Header";
import Container from "../common/Container";

export default function Main({ todos, setTodos }) {
  const navigate = useNavigate();

  const handleEditClick = (postId) => {
    navigate(`/edit/${postId}`); // 수정 버튼 클릭 시 해당 게시물의 수정 페이지로 이동
  };

  const handleCreateClick = () => {
    navigate(`/create`); // 추가 버튼 클릭 시 새로운 게시물 생성 페이지로 이동
  };

  const handleDeleteClick = (postId) => {
    const updatedtodos = todos.filter((post) => post.id !== postId);
    setTodos(updatedtodos); // 삭제 버튼 클릭 시 해당 게시물을 목록에서 제거하고 게시물 목록 페이지로 이동
    navigate("/");
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
