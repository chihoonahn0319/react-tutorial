import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch } from "react-redux";
import { useQuery, useQueryClient } from "react-query"; // react-query의 useQuery와 useMutation 임포트
import { deletePost } from "../redux/slice/postSlice"; // 삭제 액션 임포트
import { auth } from "../firebase";
import axios from "axios"; // axios 임포트

export default function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient(); // queryClient 생성

  // useQuery를 사용하여 데이터 가져오기 가져오기 get 사용
  const { data: todos, isLoading } = useQuery("posts", async () => {
    const response = await axios.get("http://localhost:3001/posts"); // 서버에서 게시물 데이터 가져오기
    return response.data; // 가져온 데이터 반환
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // 게시물 수정 버튼 클릭 시 처리 함수
  const handleEditClick = (post) => {
    if (user) {
      if (post.author === user.email) {
        navigate(`/edit/${post.id}`); // 작성자 본인인 경우 수정 페이지로 이동
      } else {
        alert("어허~남의 것을 탐하지말지어다.");
      }
    } else {
      alert("로그인 후에 게시물을 수정할 수 있습니다.");
    }
  };

  // 게시물 추가 버튼 클릭 시 처리 함수
  const handleCreateClick = () => {
    if (user) {
      navigate("/create"); // 로그인한 경우 추가 페이지로 이동
    } else {
      alert("로그인 후에 게시물을 추가할 수 있습니다.");
    }
  };

  // 게시물 삭제 버튼 클릭 시 처리 함수
  const handleDeleteClick = async (postId) => {
    if (!user) {
      alert("로그인 후에 게시물을 삭제할 수 있습니다.");
      return;
    }

    const post = todos.find((post) => post.id === postId);
    if (!post || post.author !== user.email) {
      alert("어허~남의 것을 탐하지말지어다.");
      return;
    }

    const confirmDelete = window.confirm(
      "기억은 머리 속에서 살지만 추억은 가슴 속에서 산다. 정말로 삭제하시겠습니까?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/posts/${postId}`);
        dispatch(deletePost(postId)); // Redux의 상태 삭제

        // React Query 쿼리 갱신
        queryClient.invalidateQueries("posts");

        // 삭제 후 홈으로 이동
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("게시물 삭제에 실패하였습니다.");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>; // 데이터 로딩 중일 때 표시

  return (
    <>
      <Header />
      <Container>
        <CreateButton onClick={handleCreateClick}>추가</CreateButton>
        {todos.map((post) => (
          <PostContainer key={post.id}>
            <PostContent
              onClick={() => {
                navigate(`/detail/${post.id}`); // 게시물 상세 페이지로 이동
              }}
            >
              <h2>{post.title}</h2> {/* 게시물 제목 */}
              <p>{post.content}</p> {/* 게시물 내용 */}
            </PostContent>
            <AuthorName>{post.author}</AuthorName>
            <ActionButtons>
              <div>
                <EditButton onClick={() => handleEditClick(post)}>
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
  margin: 0 auto;
  display: block;
`;

const EditButton = styled(Button)`
  background-color: pink;
  margin-right: 6px;
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
