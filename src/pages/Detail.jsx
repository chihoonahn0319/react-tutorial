import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deletePost } from "../redux/slice/postSlice";

import { auth } from "../firebase"; // Firebase 모듈에서 auth 객체

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // URL 파라미터로부터 게시물 ID를 가져옴
  const { id } = useParams();
  // 리덕스 스토어의 '게시글' 상태를 조회
  const todos = useSelector((state) => state.게시글);
  const post = todos.find((post) => post.id === id);
  // 로그인 상태 감지
  const [user, setUser] = useState(null);
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

  // 만약 게시물이 없을 경우, 404 페이지로 이동
  if (!post) {
    return (
      <>
        <div>없는 페이지입니다.</div>
        <Link to="/">홈으로 이동</Link>
      </>
    );
  }

  const handleEditClick = () => {
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

  const handleDeleteClick = () => {
    // 로그인 여부 확인
    if (user) {
      // 게시물의 author와 로그인한 이메일이 일치하는지 확인
      if (post.author === user.email) {
        // 확인 알림 창 띄우기
        const confirmDelete = window.confirm(
          "기억은 머리 속에서 살지만 추억은 가슴 속에서 산다. 정말로 삭제하시겠습니까?"
        );

        if (confirmDelete) {
          // 삭제 진행
          dispatch(deletePost(post.id));
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
      <DetailContainer>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
        <ButtonContainer>
          <EditButton onClick={handleEditClick}>수정</EditButton>
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
