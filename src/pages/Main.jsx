import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../redux/slice/postSlice"; // index.js에서 deletePost 가져오기
import { auth } from "../firebase"; // Firebase 모듈에서 auth 객체를 가져온다
export default function Main() {
  // 리덕스 스토어의 '게시글' 상태를 조회
  const todos = useSelector((state) => state.게시글);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // 로그인한 사용자 정보를 상태로 관리

  // 로그인 상태 감지
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // 로그인한 사용자 정보 설정
      } else {
        setUser(null); // 로그아웃 시 사용자 정보 초기화
      }
    });

    // 컴포넌트 언마운트 시에 이벤트 리스너 구독 해제
    return () => unsubscribe();
  }, []);

  const handleEditClick = (post) => {
    // 로그인 여부 확인
    if (user) {
      // 게시물의 author와 로그인한 이메일이 일치하는지 확인
      if (post.author === user.email) {
        navigate(`/edit/${post.id}`); // 로그인한 사용자와 게시물의 작성자가 일치하면 수정 페이지로 이동
      } else {
        // 일치하지 않는 경우 경고창 띄우기
        alert("어허~남의 것을 탐하지말지어다.");
      }
    } else {
      // 로그인이 안된 경우 경고창 띄우기
      alert("로그인 후에 게시물을 수정할 수 있습니다.");
    }
  };

  const handleCreateClick = () => {
    // 로그인 여부 확인
    if (user) {
      navigate("/create"); // 로그인 상태인 경우 추가 페이지로 이동
    } else {
      // 로그인이 안된 경우 경고창 띄우기
      alert("로그인 후에 게시물을 추가할 수 있습니다.");
    }
  };

  const handleDeleteClick = (postId) => {
    // 로그인 여부 확인
    if (user) {
      // 게시물의 author와 로그인한 이메일이 일치하는지 확인
      const post = todos.find((post) => post.id === postId);
      if (post && post.author === user.email) {
        // 확인 알림 창 띄우기
        const confirmDelete = window.confirm(
          "기억은 머리 속에서 살지만 추억은 가슴 속에서 산다. 정말로 삭제하시겠습니까?"
        );

        if (confirmDelete) {
          // 삭제 진행
          dispatch(deletePost(postId)); // deletePost 액션 생성자 함수를 호출하여 액션 디스패치
          navigate("/");
        }
      } else {
        // 일치하지 않는 경우 경고창 띄우기
        alert("어허~남의 것을 탐하지말지어다.");
      }
    } else {
      // 로그인이 안된 경우 경고창 띄우기
      alert("로그인 후에 게시물을 삭제할 수 있습니다.");
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
