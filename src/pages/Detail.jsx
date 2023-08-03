import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { auth } from "../firebase";

export default function Detail() {
  // useNavigate 훅을 이용하여 라우팅 함수 가져오기
  const navigate = useNavigate();
  // useQueryClient 훅을 이용하여 queryClient 가져오기
  const queryClient = useQueryClient();

  // useParams 훅을 이용하여 URL 파라미터 값 가져오기
  const { id } = useParams();
  const [user, setUser] = useState(null);

  // 로그인된 사용자 추적을 위한 useEffect
  useEffect(() => {
    // Firebase의 인증 상태 변경 구독 설정
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // 로그인된 사용자 정보 설정
      } else {
        setUser(null); // 로그인되지 않은 경우 사용자 정보 제거
      }
    });

    // 컴포넌트 언마운트 시 인증 상태 변경 구독 해제
    return () => unsubscribe();
  }, []);

  // useQuery를 이용하여 게시물 데이터 가져오기
  const { data: post, isLoading } = useQuery(["post", id], async () => {
    const response = await axios.get(`http://localhost:3001/posts/${id}`);
    return response.data;
  });

  // useMutation을 이용하여 게시물 삭제 처리 함수 생성
  const deletePostMutation = useMutation(async () => {
    const response = await axios.delete(`http://localhost:3001/posts/${id}`);
    return response.data;
  });

  // 게시물 삭제 처리 함수
  const handleDeleteClick = async () => {
    if (!user) {
      alert("로그인 후에 게시물을 삭제할 수 있습니다.");
      return;
    }

    if (post.author !== user.email) {
      alert("어허~남의 것을 탐하지말지어다.");
      return;
    }

    const confirmDelete = window.confirm(
      "기억은 머리 속에서 살지만 추억은 가슴 속에서 산다. 정말로 삭제하시겠습니까?"
    );

    if (confirmDelete) {
      try {
        await deletePostMutation.mutateAsync();
        queryClient.invalidateQueries(["posts"]);
        navigate("/"); // 홈으로 이동
      } catch (error) {
        console.error("게시물 삭제 중 오류 발생:", error);
      }
    }
  };

  // 데이터 로딩 중이면 로딩 메시지 표시
  if (isLoading) return <p>Loading...</p>;

  // 게시물 상세 페이지 렌더링
  return (
    <>
      <Header />
      <DetailContainer>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
        <ButtonContainer>
          {/* 로그인한 사용자가 게시물 작성자인 경우 수정 버튼 표시 */}
          {user && post.author === user.email && (
            <EditButton as={Link} to={`/edit/${id}`}>
              수정
            </EditButton>
          )}
          {/* 삭제 버튼 */}
          <DeleteButton onClick={handleDeleteClick} disabled={isLoading}>
            삭제
          </DeleteButton>
        </ButtonContainer>
      </DetailContainer>
    </>
  );
}

// 스타일드 컴포넌트를 이용하여 스타일 정의
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
